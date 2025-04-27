import { AsyncPipe, DatePipe } from '@angular/common';
import { Component, inject, OnInit, signal, effect } from '@angular/core';
import {
  FormControl,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  IonHeader,
  IonContent,
  IonCard,
  IonCardContent,
  IonList,
  IonItem,
  IonLabel,
} from '@ionic/angular/standalone';
import { shareReplay } from 'rxjs';
import { CurrencyService } from 'src/app/services/currency.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [
    IonHeader,
    IonContent,
    IonCard,
    IonCardContent,
    AsyncPipe,
    ReactiveFormsModule,
    IonList,
    IonItem,
    IonLabel,
    DatePipe,
  ],
})
export class HomeComponent implements OnInit {
  ngOnInit(): void {
    this.getHistory();
  }

  private fb = inject(NonNullableFormBuilder);
  private currencyService = inject(CurrencyService);
  private storageService = inject(StorageService);

  protected result$ = signal<number | null>(null);

  history$ = signal<any[]>([]);

  form = this.fb.group({
    from: 'USD',
    to: 'EUR',
    amount: new FormControl<undefined | number>(undefined, [
      Validators.required,
    ]),
  });

  currencyList$ = this.currencyService.getCurrencyList().pipe(shareReplay(1));

  triggerConvert() {
    const { from, to, amount } = this.form.getRawValue();
    if (from === to) {
      this.result$.set(amount || 0);
      return;
    } else {
      this.currencyService.getRate(from || '', to || '').subscribe((data) => {
        const rate = data[to || ''] as number;
        const result = +(rate * (amount || 0)).toFixed(2);
        this.result$.set(result);

        this.saveToHistory(from, to, amount || 0, result, rate);
      });
    }
  }

  reverse() {
    const { from, to, amount } = this.form.value;
    this.form.patchValue({ from: to, to: from, amount });
  }

  private async saveToHistory(
    from: string,
    to: string,
    amount: number,
    result: number,
    rate: number
  ) {
    const history = JSON.parse(localStorage.getItem('history') || '[]');
    history.unshift({
      date: new Date(),
      from,
      to,
      amount,
      result,
      rate,
    });
    await this.storageService.setItem('history', history);

    this.getHistory();
  }

  private async getHistory() {
    const history = await this.storageService.getItem<any[]>('history');
    this.history$.set(history || []);
  }
}
