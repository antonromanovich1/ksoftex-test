import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonIcon,
  IonInput,
  IonInputPasswordToggle,
  IonItem,
  IonLabel,
  IonSegment,
  IonSegmentButton,
  IonSegmentContent,
  IonSegmentView,
  IonText,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  personOutline,
  lockClosedOutline,
  mailOutline,
  personAddOutline,
  logInOutline,
} from 'ionicons/icons';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [
    IonCard,
    IonContent,
    IonCardHeader,
    IonCardContent,
    IonItem,
    IonLabel,
    IonInput,
    IonButton,
    FormsModule,
    IonInputPasswordToggle,
    IonSegmentButton,
    IonCardTitle,
    IonIcon,
    IonText,
    FormsModule,
    IonSegment,
    IonSegmentView,
    IonSegmentContent,
  ],
})
export class LoginComponent implements OnInit {
  segment$ = signal('login');

  loginForm = {
    email: '',
    password: '',
  };

  signupForm = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  constructor() {
    // Register Ionicons
    addIcons({
      'person-outline': personOutline,
      'lock-closed-outline': lockClosedOutline,
      'mail-outline': mailOutline,
      'person-add-outline': personAddOutline,
      'log-in-outline': logInOutline,
    });
  }

  login() {
    console.log('Login form submitted', this.loginForm);
    // Implement actual login logic here
  }

  signup() {
    console.log('Signup form submitted', this.signupForm);
    // Implement actual signup logic here
  }
  ngOnInit() {}
}
