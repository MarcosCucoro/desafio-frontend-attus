import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormField, MatSelectModule } from '@angular/material/select';
import { NgxMaskDirective } from 'ngx-mask';

import { SnackbarService } from '../../../core/services/snackbar.service';
import { UserService } from '../../../core/services/user.service';
import { cpfValidator } from '../../../core/validators/cpf.validator';

@Component({
  selector: 'app-user-modal',
  imports: [CommonModule, MatDialogModule, MatButtonModule, ReactiveFormsModule, MatFormField, MatInputModule, MatSelectModule, NgxMaskDirective],
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.scss']
})
export class UserModalComponent {
  private dialogRef = inject(MatDialogRef<UserModalComponent>);
  private userService = inject(UserService);
  private snackBar = inject(SnackbarService);

  data = inject(MAT_DIALOG_DATA);
  isEdit = !!this.data?.user;

  id = new FormControl('');
  email = new FormControl('', [Validators.required, Validators.email]);
  name = new FormControl('', [Validators.required, Validators.minLength(3)]);
  cpf = new FormControl('', [Validators.required, cpfValidator]);
  phone = new FormControl('', Validators.required);
  phoneType = new FormControl(null);

  constructor() {
    this.editUser();
  }

  editUser() {
    if (this.isEdit) {
      this.id.setValue(this.data.user.id || '');
      this.email.setValue(this.data.user.email || '');
      this.name.setValue(this.data.user.name || '');
      this.cpf.setValue(this.data.user.cpf || '');
      this.phone.setValue(this.data.user.phone || '');
      this.phoneType.setValue(this.data.user.phoneType || 0);
    }
  }

  isFormValid(): boolean {
    return (
      this.email.valid &&
      this.name.valid &&
      this.cpf.valid &&
      this.phone.valid
    );
  }

  onSubmit() {
    if (!this.isFormValid()) {
      this.snackBar.error('Preencha todos os campos obrigatórios!');
      return;
    }

    const user = {
      id: this.id.value || '',
      email: this.email.value || '',
      name: this.name.value || '',
      cpf: this.cpf.value?.replace(/\D/g, ''),
      phone: this.phone.value?.replace(/\D/g, ''),
      phoneType: this.phoneType.value || 0
    };

    const isEdit = !!user.id;
    const request = isEdit
      ? this.userService.updateUser(user as any)
      : this.userService.postNewUser(user as any);

    request.subscribe({
      next: () => {
        this.snackBar.success(
          isEdit
            ? 'Usuário atualizado!'
            : 'Usuário salvo com sucesso!'
        );

        this.userService.notifyRefresh();
        this.dialogRef.close();
      }
    });
  }

}
