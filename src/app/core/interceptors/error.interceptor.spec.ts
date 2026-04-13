import { TestBed } from '@angular/core/testing';
import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { errorInterceptor } from './error.interceptor';
import { SnackbarService } from '../services/snackbar.service';
import { firstValueFrom } from 'rxjs';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

describe('errorInterceptor', () => {
  let httpClient: HttpClient;
  let httpMock: HttpTestingController;
  let snackbarService: SnackbarService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([errorInterceptor])),
        provideHttpClientTesting(),
        SnackbarService,
      ],
    });

    httpClient = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
    snackbarService = TestBed.inject(SnackbarService);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should show default error message for generic errors', async () => {
    const errorSpy = vi.spyOn(snackbarService, 'error');

    const promise = firstValueFrom(httpClient.get('/api/test')).catch((err) => err);

    const req = httpMock.expectOne('/api/test');
    req.flush(null, { status: 500, statusText: 'Server Error' });

    await promise;
    expect(errorSpy).toHaveBeenCalledWith('Erro ao salvar usuário.');
  });

  it('should show 404 message for not found errors', async () => {
    const errorSpy = vi.spyOn(snackbarService, 'error');

    const promise = firstValueFrom(httpClient.get('/api/test')).catch((err) => err);

    const req = httpMock.expectOne('/api/test');
    req.flush(null, { status: 404, statusText: 'Not Found' });

    await promise;
    expect(errorSpy).toHaveBeenCalledWith('Usuário não encontrado.');
  });

  it('should rethrow the error', async () => {
    const promise = firstValueFrom(httpClient.get('/api/test')).catch((err) => err);

    const req = httpMock.expectOne('/api/test');
    req.flush(null, { status: 500, statusText: 'Server Error' });

    const err = await promise;
    expect(err.status).toBe(500);
  });

  it('should pass through successful requests', async () => {
    const errorSpy = vi.spyOn(snackbarService, 'error');

    const promise = firstValueFrom(httpClient.get('/api/test'));

    const req = httpMock.expectOne('/api/test');
    req.flush({ ok: true });

    const data = await promise;
    expect(data).toEqual({ ok: true });
    expect(errorSpy).not.toHaveBeenCalled();
  });
});
