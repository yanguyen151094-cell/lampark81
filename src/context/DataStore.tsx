import { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react';
import { rooms as mockRooms } from '@/mocks/rooms';
import { blogs as mockBlogs } from '@/mocks/blogs';
import type { BlogPost } from '@/mocks/blogs';
import { reels as mockReels } from '@/mocks/reels';
import { reviews as mockReviews } from '@/mocks/reviews';

type Room = typeof mockRooms[0];
type Reel = typeof mockReels[0];
type Review = typeof mockReviews[0];

const LS_ROOMS = 'lampark81_rooms_v1';
const LS_BLOGS = 'lampark81_blogs_v1';
const LS_REELS = 'lampark81_reels_v1';
const LS_REVIEWS = 'lampark81_reviews_v1';

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
    // ignore storage errors
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
  const [rooms, setRoomsState] = useState<Room[]>(() => loadLS(LS_ROOMS, mockRooms));
  const [blogs, setBlogsState] = useState<BlogPost[]>(() => loadLS(LS_BLOGS, mockBlogs));
  const [reels, setReelsState] = useState<Reel[]>(() => loadLS(LS_REELS, mockReels));
  const [reviews, setReviewsState] = useState<Review[]>(() => loadLS(LS_REVIEWS, mockReviews));

  const setRooms = useCallback((data: Room[]) => {
    setRoomsState(data);
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
      if (e.key === LS_ROOMS && e.newValue) {
        try { setRoomsState(JSON.parse(e.newValue)); } catch { /* ignore */ }
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
