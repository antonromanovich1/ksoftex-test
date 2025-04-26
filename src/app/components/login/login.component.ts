import { Component, OnInit } from '@angular/core';
import { IonCard } from '@ionic/angular/standalone';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [IonCard],
})
export class LoginComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
