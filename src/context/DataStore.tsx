import { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react';
import { rooms as mockRooms } from '@/mocks/rooms';
import { blogs as mockBlogs } from '@/mocks/blogs';
import type { BlogPost } from '@/mocks/blogs';
import { reels as mockReels } from '@/mocks/reels';
import { reviews as mockReviews } from '@/mocks/reviews';

type Room = typeof mockRooms[0];
type Reel = typeof mockReels[0];
type Review = typeof mockReviews[0];

// v2 keys: clears any bad/corrupted v1 data on Vercel
const LS_ROOMS = 'lampark81_rooms_v2';
const LS_BLOGS = 'lampark81_blogs_v2';
const LS_REELS = 'lampark81_reels_v2';
const LS_REVIEWS = 'lampark81_reviews_v2';
const LS_ROOMS_CLEARED = 'lampark81_rooms_cleared';

// Smart load: if stored value is empty array AND user didn't explicitly clear → use fallback
function loadRooms(): Room[] {
  try {
    const raw = localStorage.getItem(LS_ROOMS);
    if (raw) {
      const parsed = JSON.parse(raw) as Room[];
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      // Empty array: only respect it if user explicitly cleared
      if (Array.isArray(parsed) && parsed.length === 0) {
        const wasCleared = localStorage.getItem(LS_ROOMS_CLEARED);
        return wasCleared ? [] : [...mockRooms];
      }
    }
  } catch {
    // ignore parse errors
  }
  return [...mockRooms];
}

function loadLS<T>(key: string, fallback: T[]): T[] {
  try {
    const raw = localStorage.getItem(key);
    if (raw) return JSON.parse(raw) as T[];
  } catch {
    // ignore parse errors
  }
  return fallback;
}

function saveLS<T>(key: string, data: T[]): void {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch {
    // quota exceeded — ignore, data stays in React state for current session
  }
}

interface DataStoreCtx {
  rooms: Room[];
  setRooms: (data: Room[]) => void;
  blogs: BlogPost[];
  setBlogs: (data: BlogPost[]) => void;
  reels: Reel[];
  setReels: (data: Reel[]) => void;
  reviews: Review[];
  setReviews: (data: Review[]) => void;
}

const DataStoreContext = createContext<DataStoreCtx | null>(null);

export function DataStoreProvider({ children }: { children: ReactNode }) {
  const [rooms, setRoomsState] = useState<Room[]>(() => loadRooms());
  const [blogs, setBlogsState] = useState<BlogPost[]>(() => loadLS(LS_BLOGS, mockBlogs));
  const [reels, setReelsState] = useState<Reel[]>(() => loadLS(LS_REELS, mockReels));
  const [reviews, setReviewsState] = useState<Review[]>(() => loadLS(LS_REVIEWS, mockReviews));

  const setRooms = useCallback((data: Room[]) => {
    setRoomsState(data);
    // Track if user intentionally cleared all rooms
    if (data.length === 0) {
      localStorage.setItem(LS_ROOMS_CLEARED, '1');
    } else {
      localStorage.removeItem(LS_ROOMS_CLEARED);
    }
    saveLS(LS_ROOMS, data);
  }, []);

  const setBlogs = useCallback((data: BlogPost[]) => {
    setBlogsState(data);
    saveLS(LS_BLOGS, data);
  }, []);

  const setReels = useCallback((data: Reel[]) => {
    setReelsState(data);
    saveLS(LS_REELS, data);
  }, []);

  const setReviews = useCallback((data: Review[]) => {
    setReviewsState(data);
    saveLS(LS_REVIEWS, data);
  }, []);

  // Real-time sync across tabs via storage event
  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === LS_ROOMS) {
        try {
          const parsed = e.newValue ? JSON.parse(e.newValue) : loadRooms();
          setRoomsState(parsed);
        } catch { /* ignore */ }
      }
      if (e.key === LS_BLOGS && e.newValue) {
        try { setBlogsState(JSON.parse(e.newValue)); } catch { /* ignore */ }
      }
      if (e.key === LS_REELS && e.newValue) {
        try { setReelsState(JSON.parse(e.newValue)); } catch { /* ignore */ }
      }
      if (e.key === LS_REVIEWS && e.newValue) {
        try { setReviewsState(JSON.parse(e.newValue)); } catch { /* ignore */ }
      }
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  return (
    <DataStoreContext.Provider value={{ rooms, setRooms, blogs, setBlogs, reels, setReels, reviews, setReviews }}>
      {children}
    </DataStoreContext.Provider>
  );
}

export function useDataStore(): DataStoreCtx {
  const ctx = useContext(DataStoreContext);
  if (!ctx) throw new Error('useDataStore must be used within DataStoreProvider');
  return ctx;
}
