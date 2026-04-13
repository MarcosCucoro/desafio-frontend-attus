import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { UserModalComponent } from '../user-modal/user-modal.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-add-button',
  imports: [MatIconModule, MatButtonModule],
  templateUrl: './add-button.component.html',
  styleUrls: ['./add-button.component.scss']
})
export class AddButtonComponent {
  readonly dialog = inject(MatDialog);

  showModalCreate() {
    this.dialog.open(UserModalComponent, {
      width: '800px',
      autoFocus: false,
      panelClass: 'custom-modal-container'
    });
  }
}
