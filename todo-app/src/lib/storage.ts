import { openDB } from 'idb';

const DB_NAME = 'TaskifyDB';
const DB_VERSION = 1;

const initDB = async () => {
  return openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains('tasks')) {
        db.createObjectStore('tasks', { keyPath: 'id' });
      }
      if (!db.objectStoreNames.contains('categories')) {
        db.createObjectStore('categories', { keyPath: 'id' });
      }
      if (!db.objectStoreNames.contains('settings')) {
        db.createObjectStore('settings', { keyPath: 'key' });
      }
    },
  });
};

export const saveToStorage = async (store: string, data: any) => {
  try {
    const db = await initDB();
    if (Array.isArray(data)) {
      const tx = db.transaction(store, 'readwrite');
      await tx.store.clear();
      for (const item of data) {
        await tx.store.add(item);
      }
      await tx.done;
    } else {
      await db.put(store, data);
    }
    // Also save to localStorage as backup
    localStorage.setItem(`${store}-backup`, JSON.stringify(data));
  } catch (error) {
    console.error('Storage error:', error);
    localStorage.setItem(`${store}-backup`, JSON.stringify(data));
  }
};

export const loadFromStorage = async (store: string) => {
  try {
    const db = await initDB();
    const allData = await db.getAll(store);
    return allData.length > 0 ? allData : null;
  } catch (error) {
    console.error('Load error:', error);
    const backup = localStorage.getItem(`${store}-backup`);
    return backup ? JSON.parse(backup) : null;
  }
};

export const clearStorage = async (store?: string) => {
  try {
    const db = await initDB();
    if (store) {
      await db.clear(store);
    } else {
      await db.clear('tasks');
      await db.clear('categories');
      await db.clear('settings');
    }
  } catch (error) {
    console.error('Clear error:', error);
  }
};
