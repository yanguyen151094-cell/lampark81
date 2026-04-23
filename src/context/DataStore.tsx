import { createContext, useContext, useState, useCallback, useEffect, useRef, ReactNode } from 'react';
import { rooms as mockRooms } from '@/mocks/rooms';
import { blogs as mockBlogs } from '@/mocks/blogs';
import type { BlogPost } from '@/mocks/blogs';
import { reels as mockReels } from '@/mocks/reels';
import { reviews as mockReviews } from '@/mocks/reviews';
import { idbGet, idbSet } from '@/utils/idb';

type Room = typeof mockRooms[0];
type Reel = typeof mockReels[0];
type Review = typeof mockReviews[0];

// IndexedDB key for rooms (unlimited storage for base64 images)
const IDB_ROOMS_KEY = 'rooms_v1';

// localStorage keys for lightweight data
const LS_BLOGS = 'lampark81_blogs_v2';
const LS_REELS = 'lampark81_reels_v2';
const LS_REVIEWS = 'lampark81_reviews_v2';

// Broadcast key for cross-tab sync
const LS_SYNC = 'lampark81_sync';

// Load rooms from IndexedDB (fallback to mock data)
async function loadRoomsAsync(): Promise<Room[]> {
  try {
    const stored = await idbGet<Room[]>(IDB_ROOMS_KEY);
    if (stored && Array.isArray(stored) && stored.length > 0) {
      return stored;
    }
  } catch {
    // ignore
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
  const [rooms, setRoomsState] = useState<Room[]>([...mockRooms]);
  const [roomsLoaded, setRoomsLoaded] = useState(false);
  const [blogs, setBlogsState] = useState<BlogPost[]>(() => loadLS(LS_BLOGS, mockBlogs));
  const [reels, setReelsState] = useState<Reel[]>(() => loadLS(LS_REELS, mockReels));
  const [reviews, setReviewsState] = useState<Review[]>(() => loadLS(LS_REVIEWS, mockReviews));
  const bcRef = useRef<BroadcastChannel | null>(null);

  // Load rooms from IndexedDB on mount
  useEffect(() => {
    loadRoomsAsync().then((data) => {
      setRoomsState(data);
      setRoomsLoaded(true);
    });
  }, []);

  // Setup BroadcastChannel for instant cross-tab sync
  useEffect(() => {
    if (typeof BroadcastChannel !== 'undefined') {
      const bc = new BroadcastChannel('lampark81_sync');
      bcRef.current = bc;
      bc.onmessage = (ev) => {
        if (ev.data?.type === 'rooms_updated') {
          loadRoomsAsync().then((data) => {
            setRoomsState(data);
          });
        }
        if (ev.data?.type === 'blogs_updated' && ev.data?.payload) {
          setBlogsState(ev.data.payload);
        }
        if (ev.data?.type === 'reels_updated' && ev.data?.payload) {
          setReelsState(ev.data.payload);
        }
        if (ev.data?.type === 'reviews_updated' && ev.data?.payload) {
          setReviewsState(ev.data.payload);
        }
      };
      return () => {
        bc.close();
        bcRef.current = null;
      };
    }
  }, []);

  const setRooms = useCallback(async (data: Room[]) => {
    setRoomsState(data);
    // Wait for IndexedDB to save BEFORE broadcasting
    await idbSet(IDB_ROOMS_KEY, data);
    // Broadcast to other tabs via BroadcastChannel (instant)
    bcRef.current?.postMessage({ type: 'rooms_updated' });
    // Fallback: localStorage for older browsers
    try {
      localStorage.setItem(LS_SYNC, Date.now().toString());
    } catch { /* ignore */ }
  }, []);

  const setBlogs = useCallback((data: BlogPost[]) => {
    setBlogsState(data);
    saveLS(LS_BLOGS, data);
    bcRef.current?.postMessage({ type: 'blogs_updated', payload: data });
  }, []);

  const setReels = useCallback((data: Reel[]) => {
    setReelsState(data);
    saveLS(LS_REELS, data);
    bcRef.current?.postMessage({ type: 'reels_updated', payload: data });
  }, []);

  const setReviews = useCallback((data: Review[]) => {
    setReviewsState(data);
    saveLS(LS_REVIEWS, data);
    bcRef.current?.postMessage({ type: 'reviews_updated', payload: data });
  }, []);

  // Real-time sync across tabs via storage event (fallback for older browsers)
  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === LS_SYNC) {
        // Another tab updated rooms — reload from IndexedDB with small delay
        setTimeout(() => {
          loadRoomsAsync().then((data) => {
            setRoomsState(data);
          });
        }, 50);
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
