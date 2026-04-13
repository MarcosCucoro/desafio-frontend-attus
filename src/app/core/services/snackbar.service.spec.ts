import { TestBed } from '@angular/core/testing';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { SnackbarService } from './snackbar.service';
import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('SnackbarService', () => {
  let service: SnackbarService;
  let snackBarMock: MatSnackBar;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatSnackBarModule],
      providers: [SnackbarService],
    });

    service = TestBed.inject(SnackbarService);
    snackBarMock = TestBed.inject(MatSnackBar);
  });

  describe('success', () => {
    it('should open snackbar with success message', () => {
      const openSpy = vi.spyOn(snackBarMock, 'open');
      const message = 'Operação realizada com sucesso!';

      service.success(message);

      expect(openSpy).toHaveBeenCalledWith(message, 'Fechar', {
        duration: 3000,
        panelClass: ['snackbar-error'],
      });
    });

    it('should handle different success messages', () => {
      const openSpy = vi.spyOn(snackBarMock, 'open');
      const messages = ['Usuário criado com sucesso', 'Dados salvos', 'Operação concluída'];

      messages.forEach((msg) => {
        service.success(msg);
        expect(openSpy).toHaveBeenCalledWith(msg, 'Fechar', {
          duration: 3000,
          panelClass: ['snackbar-error'],
        });
      });

      expect(openSpy).toHaveBeenCalledTimes(messages.length);
    });

    it('should set correct duration for success message', () => {
      const openSpy = vi.spyOn(snackBarMock, 'open');
      service.success('Test');

      const callArgs = openSpy.mock.calls[0];
      expect(callArgs[2]!.duration).toBe(3000);
    });
  });

  describe('error', () => {
    it('should open snackbar with error message', () => {
      const openSpy = vi.spyOn(snackBarMock, 'open');
      const message = 'Erro ao salvar dados';

      service.error(message);

      expect(openSpy).toHaveBeenCalledWith(message, 'Fechar', {
        duration: 4000,
        panelClass: ['snackbar-error'],
      });
    });

    it('should handle different error messages', () => {
      const openSpy = vi.spyOn(snackBarMock, 'open');
      const messages = ['Erro ao criar usuário', 'Falha na conexão', 'Dados inválidos'];

      messages.forEach((msg) => {
        service.error(msg);
        expect(openSpy).toHaveBeenCalledWith(msg, 'Fechar', {
          duration: 4000,
          panelClass: ['snackbar-error'],
        });
      });

      expect(openSpy).toHaveBeenCalledTimes(messages.length);
    });

    it('should set correct duration for error message', () => {
      const openSpy = vi.spyOn(snackBarMock, 'open');
      service.error('Test error');

      const callArgs = openSpy.mock.calls[0];
      expect(callArgs[2]!.duration).toBe(4000);
    });

    it('should have longer duration than success message', () => {
      const openSpy = vi.spyOn(snackBarMock, 'open');

      service.success('Success');
      const successDuration = openSpy.mock.calls[0][2]!.duration;

      service.error('Error');
      const errorDuration = openSpy.mock.calls[1][2]!.duration;

      expect(errorDuration).toBeGreaterThan(successDuration!);
    });
  });

  describe('Label and Styling', () => {
    it('should always display "Fechar" label', () => {
      const openSpy = vi.spyOn(snackBarMock, 'open');

      service.success('Test');
      expect(openSpy.mock.calls[0][1]).toBe('Fechar');

      service.error('Test');
      expect(openSpy.mock.calls[1][1]).toBe('Fechar');
    });

    it('should apply snackbar-error panel class', () => {
      const openSpy = vi.spyOn(snackBarMock, 'open');

      service.success('Test');
      expect(openSpy.mock.calls[0][2]!.panelClass).toContain('snackbar-error');

      service.error('Test');
      expect(openSpy.mock.calls[1][2]!.panelClass).toContain('snackbar-error');
    });
  });
});
