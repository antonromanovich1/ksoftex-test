import { AsyncPipe } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import {
  FormsModule,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
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
  IonNote,
  IonSegment,
  IonSegmentButton,
  IonSegmentContent,
  IonSegmentView,
  IonText,
} from '@ionic/angular/standalone';
import { AuthService } from 'src/app/services/auth.service';

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
    ReactiveFormsModule,
    AsyncPipe,
    IonNote,
  ],
})
export class LoginComponent {
  segment$ = signal('login');

  private fb = inject(NonNullableFormBuilder);

  private authService = inject(AuthService);

  private router = inject(Router);

  protected authError$ = this.authService.authError$;

  protected loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  protected signupForm = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  constructor() {}

  async login() {
    console.log(this.loginForm.getRawValue());
    this.authService.signIn(this.loginForm.getRawValue()).then((success) => {
      console.log(success);
      if (success) {
        this.router.navigate(['/home']);
      } else {
        this.loginForm.get('password')?.reset();
      }
    });
  }

  signup() {
    this.authService.signUp(this.signupForm.getRawValue()).then((success) => {
      if (success) {
        this.segment$.set('login');
        this.loginForm
          .get('email')
          ?.setValue(this.signupForm.get('email')?.value || '');
      } else {
        this.signupForm.reset();
      }
    });
  }
}
