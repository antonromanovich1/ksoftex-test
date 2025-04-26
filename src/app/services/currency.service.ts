import { HttpClient } from '@angular/common/http';
import {
  effect,
  inject,
  Injectable,
  signal,
  WritableSignal,
} from '@angular/core';
import { Currency, CurrencyResponse } from '../models/currency.model';
import { map, tap } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class CurrencyService {
  private BASE_URL = 'https://api.freecurrencyapi.com/v1';
  private STORAGE_KEY = 'currency-list';

  private http = inject(HttpClient);

  private currencyList$: WritableSignal<Currency[]> = signal(
    (() => {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (!stored) return [];
      try {
        return JSON.parse(stored) as Currency[];
      } catch {
        return [];
      }
    })()
  );

  constructor() {
    effect(() => {
      const currencyList = this.currencyList$();

      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(currencyList));
    });
  }

  public getCurrencyList() {
    return this.currencyList$().length
      ? toObservable(this.currencyList$)
      : this.loadCurrencyList();
  }

  private loadCurrencyList() {
    return this.http.get<CurrencyResponse>(`${this.BASE_URL}/currencies`).pipe(
      map(({ data }) => Object.values(data)),
      tap((data) => this.currencyList$.set(data)),
      tap((data) => console.log(data, 'currencies'))
    );
  }
}
