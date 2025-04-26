import { AsyncPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardContent,
  IonList,
  IonSelect,
  IonItem,
  IonSelectOption,
  IonGrid,
  IonRow,
  IonButton,
  IonInput,
  IonLabel,
  IonCol,
  IonIcon,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
} from '@ionic/angular/standalone';
import { shareReplay } from 'rxjs';
import { CurrencyService } from 'src/app/services/currency.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [IonHeader, IonContent, IonCard, IonCardContent, AsyncPipe],
})
export class HomeComponent implements OnInit {
  constructor(private currencyService: CurrencyService) {
    this.currencyService
      .getCurrencyList()
      .subscribe((data) => console.log(data));
  }

  currencyList$ = this.currencyService.getCurrencyList().pipe(shareReplay(1));

  ngOnInit() {}
}
