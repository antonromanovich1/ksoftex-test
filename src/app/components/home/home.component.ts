import { AsyncPipe } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import {
  FormBuilder,
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
} from '@ionic/angular/standalone';
import { shareReplay, Subject } from 'rxjs';
import { CurrencyService } from 'src/app/services/currency.service';

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
  ],
})
export class HomeComponent {
  private fb = inject(NonNullableFormBuilder);
  private currencyService = inject(CurrencyService);

  protected convert$ = new Subject<void>();

  protected result$ = signal<number | null>(null);

  form = this.fb.group({
    from: 'USD',
    to: 'EUR',
    amount: new FormControl<undefined | number>(undefined, [
      Validators.required,
    ]),
  });

  currencyList$ = this.currencyService.getCurrencyList().pipe(shareReplay(1));

  triggerConvert() {
    const { from, to, amount } = this.form.value;
    if (from === to) {
      this.result$.set(amount || 0);
      return;
    } else {
      this.currencyService.getRate(from || '', to || '').subscribe((data) => {
        const rate = data[to || ''] as number;
        const result = rate * (amount || 0);
        this.result$.set(+result.toFixed(2));
      });
    }
  }
}
