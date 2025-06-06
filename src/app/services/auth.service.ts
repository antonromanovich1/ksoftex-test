import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Subject, tap } from 'rxjs';
import { StorageService } from './storage.service';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public isAuthenticated$ = new BehaviorSubject<boolean>(
    this.getSessionStatus()
  );

  public authError$ = new Subject<string>();

  private readonly STORAGE_KEY = 'user-registry';
  static SESSION_KEY = 'user-session';
  private readonly SESSION_TTL = 4 * 60 * 60 * 1000; // 4 hours in milliseconds

  private storageService = inject(StorageService);

  async signIn(user: User) {
    this.authError$.next('');
    const registry = await this.storageService.getItem<User[]>(
      this.STORAGE_KEY
    );

    if (!registry) {
      this.authError$.next('User not found');
      return false;
    } else {
      const foundUser = registry.find(
        (u) => u.email === user.email && u.password === user.password
      );

      if (!foundUser) {
        this.authError$.next('User not found');
        return false;
      }

      this.isAuthenticated$.next(true);
      this.setSession();
      return true;
    }
  }

  async signUp(user: User) {
    this.authError$.next('');
    const registry = await this.storageService.getItem<User[]>(
      this.STORAGE_KEY
    );

    const { email } = user;

    if (!registry) {
      await this.storageService.setItem(this.STORAGE_KEY, [user]);
      return true;
    } else {
      if (registry.some((u) => u.email === email)) {
        this.authError$.next('Email already exists');
        return false;
      }

      await this.storageService.setItem(this.STORAGE_KEY, [...registry, user]);
      return true;
    }
  }

  logOut() {
    this.isAuthenticated$.next(false);
    localStorage.removeItem(AuthService.SESSION_KEY);
  }

  private setSession() {
    localStorage.setItem(
      AuthService.SESSION_KEY,
      JSON.stringify(Date.now() + this.SESSION_TTL)
    );
  }

  private getSessionStatus() {
    const session = localStorage.getItem(AuthService.SESSION_KEY);
    return Date.now() < Number(session || 0) ? true : false;
  }
}
