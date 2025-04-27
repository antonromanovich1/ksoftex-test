import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  personOutline,
  lockClosedOutline,
  mailOutline,
  personAddOutline,
  logInOutline,
  logOutOutline,
} from 'ionicons/icons';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  imports: [IonRouterOutlet, IonApp],
})
export class AppComponent {
  constructor() {
    // Register Ionicons
    addIcons({
      'person-outline': personOutline,
      'lock-closed-outline': lockClosedOutline,
      'mail-outline': mailOutline,
      'person-add-outline': personAddOutline,
      'log-in-outline': logInOutline,
      'log-out-outline': logOutOutline,
    });
  }
}
