import { AsyncPipe, DatePipe } from '@angular/common';
import { Component, inject, OnInit, signal, effect } from '@angular/core';
import {
  FormControl,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import {
  IonHeader,
  IonContent,
  IonCard,
  IonCardContent,
  IonList,
  IonItem,
  IonLabel,
  IonIcon,
  IonButton,
} from '@ionic/angular/standalone';
import { shareReplay } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
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
    IonIcon,
  ],
})
export class HomeComponent implements OnInit {
  ngOnInit(): void {
    this.getHistory();
  }

  private fb = inject(NonNullableFormBuilder);
  private currencyService = inject(CurrencyService);
  private storageService = inject(StorageService);
  private authService = inject(AuthService);
  private router = inject(Router);

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

  logout() {
    this.authService.logOut();
    this.router.navigate(['/login']);
  }

  private async getHistory() {
    const history = await this.storageService.getItem<any[]>('history');
    this.history$.set(history || []);
  }
}
