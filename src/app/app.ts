import { Component, signal } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AddButtonComponent } from './shared/components/add-button/add-button.component';
import { HeaderComponent } from './shared/components/header/header.component';

@Component({
  selector: 'app-root',
  imports: [ RouterModule, HeaderComponent, AddButtonComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('desafio-frontend-attus');
}
