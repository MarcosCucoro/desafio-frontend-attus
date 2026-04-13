import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { provideNgxMask } from 'ngx-mask';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserModalComponent } from './user-modal.component';
import { UserService } from '../../../core/services/user.service';
import { SnackbarService } from '../../../core/services/snackbar.service';
import { of } from 'rxjs';
import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('UserModalComponent', () => {
  const mockDialogRef = { close: vi.fn() };
  let component: UserModalComponent;
  let userService: UserService;
  let snackbarService: SnackbarService;

  describe('Create mode', () => {
    beforeEach(() => {
      mockDialogRef.close.mockClear();

      TestBed.configureTestingModule({
        imports: [UserModalComponent, NoopAnimationsModule],
        providers: [
          provideHttpClient(),
          provideHttpClientTesting(),
          provideNgxMask(),
          { provide: MatDialogRef, useValue: mockDialogRef },
          { provide: MAT_DIALOG_DATA, useValue: null },
        ],
      });

      const fixture = TestBed.createComponent(UserModalComponent);
      component = fixture.componentInstance;
      userService = TestBed.inject(UserService);
      snackbarService = TestBed.inject(SnackbarService);
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should not be in edit mode when no data is provided', () => {
      expect(component.isEdit).toBe(false);
    });

    it('should have empty form controls initially', () => {
      expect(component.email.value).toBe('');
      expect(component.name.value).toBe('');
      expect(component.cpf.value).toBe('');
      expect(component.phone.value).toBe('');
    });

    it('should have required validators on email, name, cpf, phone', () => {
      component.email.markAsTouched();
      component.name.markAsTouched();
      component.cpf.markAsTouched();
      component.phone.markAsTouched();

      expect(component.email.hasError('required')).toBe(true);
      expect(component.name.hasError('required')).toBe(true);
      expect(component.cpf.hasError('required')).toBe(true);
      expect(component.phone.hasError('required')).toBe(true);
    });

    it('should validate email format', () => {
      component.email.setValue('invalid-email');
      expect(component.email.hasError('email')).toBe(true);

      component.email.setValue('valid@email.com');
      expect(component.email.valid).toBe(true);
    });

    it('should validate name minimum length', () => {
      component.name.setValue('ab');
      expect(component.name.hasError('minlength')).toBe(true);

      component.name.setValue('abc');
      expect(component.name.valid).toBe(true);
    });

    it('should return false from isFormValid when form is incomplete', () => {
      expect(component.isFormValid()).toBe(false);
    });

    it('should return true from isFormValid when all fields are valid', () => {
      component.email.setValue('test@email.com');
      component.name.setValue('Test User');
      component.cpf.setValue('11144477735');
      component.phone.setValue('11999999999');

      expect(component.isFormValid()).toBe(true);
    });

    it('should show error snackbar when submitting invalid form', () => {
      const errorSpy = vi.spyOn(snackbarService, 'error');
      component.onSubmit();
      expect(errorSpy).toHaveBeenCalledWith('Preencha todos os campos obrigatórios!');
    });

    it('should call postNewUser when submitting valid form without id', () => {
      const postSpy = vi.spyOn(userService, 'postNewUser').mockReturnValue(of({} as any));
      const successSpy = vi.spyOn(snackbarService, 'success');
      const refreshSpy = vi.spyOn(userService, 'notifyRefresh');

      component.email.setValue('test@email.com');
      component.name.setValue('Test User');
      component.cpf.setValue('11144477735');
      component.phone.setValue('11999999999');

      component.onSubmit();

      expect(postSpy).toHaveBeenCalled();
      expect(successSpy).toHaveBeenCalledWith('Usuário salvo com sucesso!');
      expect(refreshSpy).toHaveBeenCalled();
      expect(mockDialogRef.close).toHaveBeenCalled();
    });
  });

  describe('Edit mode', () => {
    const mockUser = {
      id: '1',
      email: 'joao@email.com',
      name: 'João Silva',
      cpf: '11144477735',
      phone: '11999999999',
      phoneType: 0,
    };

    beforeEach(() => {
      mockDialogRef.close.mockClear();

      TestBed.configureTestingModule({
        imports: [UserModalComponent, NoopAnimationsModule],
        providers: [
          provideHttpClient(),
          provideHttpClientTesting(),
          provideNgxMask(),
          { provide: MatDialogRef, useValue: mockDialogRef },
          { provide: MAT_DIALOG_DATA, useValue: { user: mockUser } },
        ],
      });

      const fixture = TestBed.createComponent(UserModalComponent);
      component = fixture.componentInstance;
      userService = TestBed.inject(UserService);
      snackbarService = TestBed.inject(SnackbarService);
      fixture.detectChanges();
    });

    it('should be in edit mode when user data is provided', () => {
      expect(component.isEdit).toBe(true);
    });

    it('should populate form controls with user data', () => {
      expect(component.id.value).toBe(mockUser.id);
      expect(component.email.value).toBe(mockUser.email);
      expect(component.name.value).toBe(mockUser.name);
      expect(component.cpf.value).toBe(mockUser.cpf);
      expect(component.phone.value).toBe(mockUser.phone);
      expect(component.phoneType.value).toBe(mockUser.phoneType);
    });

    it('should call updateUser when submitting in edit mode', () => {
      const updateSpy = vi.spyOn(userService, 'updateUser').mockReturnValue(of({} as any));
      const successSpy = vi.spyOn(snackbarService, 'success');

      component.onSubmit();

      expect(updateSpy).toHaveBeenCalled();
      expect(successSpy).toHaveBeenCalledWith('Usuário atualizado!');
    });
  });
});
