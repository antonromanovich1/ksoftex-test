import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

interface StorageItem<T> {
  value: T;
  timestamp?: number; // Optional timestamp for TTL
}

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private _storage: Storage | null = null;
  private readonly FOUR_HOURS_MS = 4 * 60 * 60 * 1000; // 4 hours in milliseconds

  constructor(private storage: Storage) {
    this.init();
  }

  /**
   * Initialize the storage module
   */
  async init() {
    if (this._storage !== null) {
      return;
    }
    const storage = await this.storage.create();
    this._storage = storage;
  }

  /**
   * Store a value with an optional TTL
   * @param key The key to store the value under
   * @param value The value to store
   * @param useTTL Whether to use TTL (defaults to true)
   */
  async setItem<T>(
    key: string,
    value: T,
    useTTL: boolean = true
  ): Promise<void> {
    await this.init();

    const item: StorageItem<T> = {
      value: value,
    };

    // Add timestamp if TTL is enabled
    if (useTTL) {
      item.timestamp = Date.now() + this.FOUR_HOURS_MS;
    }

    await this._storage?.set(key, item);
  }

  /**
   * Get a value from storage
   * @param key The key to retrieve
   * @returns The value if found and not expired, otherwise null
   */
  async getItem<T>(key: string): Promise<T | null> {
    await this.init();

    const item = (await this._storage?.get(key)) as StorageItem<T> | null;

    if (!item) {
      return null;
    }

    // Check if item has timestamp and is expired
    if (item.timestamp && Date.now() > item.timestamp) {
      // Item is expired, remove it
      await this.removeItem(key);
      return null;
    }

    return item.value;
  }

  /**
   * Remove an item from storage
   * @param key The key to remove
   */
  async removeItem(key: string): Promise<void> {
    await this.init();
    await this._storage?.remove(key);
  }

  /**
   * Clear all items from storage
   */
  async clear(): Promise<void> {
    await this.init();
    await this._storage?.clear();
  }

  /**
   * Get all keys in storage
   * @returns Array of keys
   */
  async keys(): Promise<string[]> {
    await this.init();
    return this._storage?.keys() || [];
  }

  /**
   * Check if a key exists and is not expired
   * @param key The key to check
   * @returns True if the key exists and is not expired
   */
  async hasValidItem(key: string): Promise<boolean> {
    return (await this.getItem(key)) !== null;
  }

  /**
   * Update TTL for an existing item
   * @param key The key to update
   * @returns True if successful, false if item doesn't exist
   */
  async refreshTTL(key: string): Promise<boolean> {
    await this.init();

    const item = await this._storage?.get(key);

    if (!item) {
      return false;
    }

    // Only update if item has a timestamp
    if (item.timestamp) {
      item.timestamp = Date.now() + this.FOUR_HOURS_MS;
      await this._storage?.set(key, item);
    }

    return true;
  }
}
