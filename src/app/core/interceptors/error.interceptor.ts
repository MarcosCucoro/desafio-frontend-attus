import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { SnackbarService } from '../services/snackbar.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const snackbar = inject(SnackbarService);

  return next(req).pipe(
    catchError((error) => {
      console.error('HTTP ERROR:', error);

      let message = 'Erro ao salvar usuário.';

      if (error.status === 404) {
        message = 'Usuário não encontrado.';
      }

      if (error.status === 0) {
        message = 'Erro de conexão com servidor.';
      }

      snackbar.error(message);

      return throwError(() => error);
    })
  );
};
