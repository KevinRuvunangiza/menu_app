import AsyncStorage from '@react-native-async-storage/async-storage';

// Function to set an item in AsyncStorage
export const setItem = async (key: string, value: any): Promise<void> => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('Error setting item:', error);
  }
};

// Function to get an item from AsyncStorage
export const getItem = async <T = any>(key: string): Promise<T | null> => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value != null ? JSON.parse(value) as T : null;
  } catch (error) {
    console.error('Error getting item:', error);
    return null;
  }
};

// Function to remove an item from AsyncStorage
export const removeItem = async (key: string): Promise<void> => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error('Error removing item:', error);
  }
};

// Function to merge an item in AsyncStorage
export const mergeItem = async (key: string, value: any): Promise<void> => {
  try {
    await AsyncStorage.mergeItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('Error merging item:', error);
  }
};

// Function to clear all data from AsyncStorage
export const clear = async (): Promise<void> => {
  try {
    await AsyncStorage.clear();
  } catch (error) {
    console.error('Error clearing AsyncStorage:', error);
  }
};

// Function to get all keys from AsyncStorage
export const getAllKeys = async (): Promise<string[]> => {
  try {
    return await AsyncStorage.getAllKeys();
  } catch (error) {
    console.error('Error getting all keys:', error);
    return [];
  }
};

// Function to get all items from AsyncStorage
export const getAllItems = async (): Promise<Record<string, any>> => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    const items = await AsyncStorage.multiGet(keys);
    return items.reduce((accumulator, [key, value]) => {
      if (value != null) {
        accumulator[key] = JSON.parse(value);
      }
      return accumulator;
    }, {} as Record<string, any>);
  } catch (error) {
    console.error('Error getting all items:', error);
    return {};
  }
};
