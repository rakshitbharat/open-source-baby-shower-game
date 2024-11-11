// Constants for the prefix storage
const BASE_PREFIX = "uuid_voting_app_";
const UUID_KEY = "app_uuid";

// Generate UUID function
const generateUUID = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

// Get or generate UUID
const getStorageUUID = () => {
  try {
    let uuid = localStorage.getItem(UUID_KEY);
    if (!uuid) {
      uuid = generateUUID();
      localStorage.setItem(UUID_KEY, uuid);
    }
    return uuid;
  } catch (error) {
    console.error("Error accessing storage UUID:", error);
    return generateUUID();
  }
};

// Get the complete prefix (base + UUID)
const getStoragePrefix = () => {
  return `${BASE_PREFIX}${getStorageUUID()}_`;
};

const STORAGE_KEYS = {
  LANGUAGE: "currentLanguage",
  VOTE_STATE: "voteState",
  WELCOME_SHOWN: "welcomeShown",
};

const storage = {
  _getPrefixedKey: (key) => `${getStoragePrefix()}${key}`,

  get: (key) => {
    try {
      const prefixedKey = storage._getPrefixedKey(key);
      const item = localStorage.getItem(prefixedKey);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error("Error reading from localStorage:", error);
      return null;
    }
  },

  set: (key, value) => {
    try {
      const prefixedKey = storage._getPrefixedKey(key);
      localStorage.setItem(prefixedKey, JSON.stringify(value));
    } catch (error) {
      console.error("Error writing to localStorage:", error);
    }
  },

  remove: (key) => {
    try {
      const prefixedKey = storage._getPrefixedKey(key);
      localStorage.removeItem(prefixedKey);
    } catch (error) {
      console.error("Error removing from localStorage:", error);
    }
  },

  clear: () => {
    try {
      const currentPrefix = getStoragePrefix();
      Object.keys(localStorage).forEach((key) => {
        if (key.startsWith(currentPrefix)) {
          localStorage.removeItem(key);
        }
      });
    } catch (error) {
      console.error("Error clearing localStorage:", error);
    }
  },

  // Get the current UUID
  getUUID: () => {
    return getStorageUUID();
  },

  // Reset UUID (will generate new one)
  resetUUID: () => {
    try {
      localStorage.removeItem(UUID_KEY);
      return getStorageUUID();
    } catch (error) {
      console.error("Error resetting UUID:", error);
    }
  },
};

export { storage, STORAGE_KEYS };
