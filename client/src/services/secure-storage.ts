import * as SecureStore from 'expo-secure-store';

class SecureStorage {
  async save(key: string, value: string) {
    return await SecureStore.setItemAsync(key, value);
  }

  async getValueFor(key: string): Promise<string> {
    const result = await SecureStore.getItemAsync(key);
    if (result) {
      return result;
    } else {
      throw new Error(`No values stored under that key: ${key}`);
    }
  }

  async deleteValueFor(key: string): Promise<void> {
    return await SecureStore.deleteItemAsync(key);
  }
}

export const secureStorage = new SecureStorage();
