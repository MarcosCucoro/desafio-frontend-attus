import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { provideNgxMask } from 'ngx-mask';
import { MatDialog } from '@angular/material/dialog';
import { UserListComponent } from './user-list.component';
import { UserService } from '../../../../core/services/user.service';
import { UserData } from '../../../../core/models/userData';
import { ConfirmDialogComponent } from '../../../../shared/components/confirm-dialog/confirm-dialog.component';
import { UserModalComponent } from '../../../../shared/components/user-modal/user-modal.component';
import { of } from 'rxjs';
import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('UserListComponent', () => {
  let component: UserListComponent;
  let httpMock: HttpTestingController;
  let userService: UserService;
  let dialog: MatDialog;

  const mockUsers: UserData[] = [
    { id: '1', name: 'João Silva', email: 'joao@email.com', cpf: '11144477735', phone: '11999999999', phoneType: 0 },
    { id: '2', name: 'Maria Santos', email: 'maria@email.com', cpf: '52998215060', phone: '11988888888', phoneType: 1 },
    { id: '3', name: 'Carlos Souza', email: 'carlos@email.com', cpf: '11122233344', phone: '11977777777', phoneType: 0 },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [UserListComponent, NoopAnimationsModule],
      providers: [provideHttpClient(), provideHttpClientTesting(), provideNgxMask()],
    });

    httpMock = TestBed.inject(HttpTestingController);
    userService = TestBed.inject(UserService);
    dialog = TestBed.inject(MatDialog);

    const fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    // Flush the initial GET request triggered by the effect
    const req = httpMock.expectOne('http://localhost:3000/users');
    req.flush(mockUsers);

    // Flush effects so signals update
    TestBed.flushEffects();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load users on init', () => {
    expect(component.allUsers().length).toBe(3);
    expect(component.users().length).toBe(3);
    expect(component.loading()).toBe(false);
  });

  it('should set error state when API fails', () => {
    // Trigger a refresh which causes a new request
    userService.notifyRefresh();
    TestBed.flushEffects();

    const req = httpMock.expectOne('http://localhost:3000/users');
    req.flush(null, { status: 500, statusText: 'Server Error' });

    expect(component.error()).toBe('Erro ao carregar usuários.');
    expect(component.loading()).toBe(false);
  });

  it('should have correct default pagination values', () => {
    expect(component.pageSize()).toBe(5);
    expect(component.pageIndex()).toBe(0);
  });

  it('should handle page change', () => {
    component.onPageChange({ pageIndex: 1, pageSize: 2, length: 3 });
    expect(component.pageIndex()).toBe(1);
    expect(component.pageSize()).toBe(2);
  });

  it('should open edit modal with user data', () => {
    const openSpy = vi.spyOn(dialog, 'open');
    const user = mockUsers[0];

    component.showModalEdit(user);

    expect(openSpy).toHaveBeenCalledWith(UserModalComponent, {
      width: '800px',
      autoFocus: false,
      panelClass: 'custom-modal-container',
      data: { user },
    });
  });

  it('should open confirm dialog and delete user on confirmation', () => {
    const mockDialogRef = { afterClosed: () => of(true) };
    const openSpy = vi.spyOn(dialog, 'open').mockReturnValue(mockDialogRef as any);
    const deleteSpy = vi.spyOn(userService, 'deleteUser').mockReturnValue(of({} as any));
    const refreshSpy = vi.spyOn(userService, 'notifyRefresh');

    component.confirmDelete('1');

    expect(openSpy).toHaveBeenCalledWith(ConfirmDialogComponent, {
      width: '400px',
      autoFocus: false,
      panelClass: 'custom-modal-container',
    });
    expect(deleteSpy).toHaveBeenCalledWith('1');
    expect(refreshSpy).toHaveBeenCalled();
  });

  it('should not delete user when confirm dialog is cancelled', () => {
    const mockDialogRef = { afterClosed: () => of(false) };
    vi.spyOn(dialog, 'open').mockReturnValue(mockDialogRef as any);
    const deleteSpy = vi.spyOn(userService, 'deleteUser');

    component.confirmDelete('1');

    expect(deleteSpy).not.toHaveBeenCalled();
  });
});
