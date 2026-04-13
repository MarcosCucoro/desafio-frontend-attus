import { TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideNgxMask } from 'ngx-mask';
import { MatDialog } from '@angular/material/dialog';
import { AddButtonComponent } from './add-button.component';
import { UserModalComponent } from '../user-modal/user-modal.component';
import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('AddButtonComponent', () => {
  let component: AddButtonComponent;
  let dialog: MatDialog;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AddButtonComponent, NoopAnimationsModule],
      providers: [provideHttpClient(), provideHttpClientTesting(), provideNgxMask()],
    });

    const fixture = TestBed.createComponent(AddButtonComponent);
    component = fixture.componentInstance;
    dialog = TestBed.inject(MatDialog);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open UserModalComponent dialog when showModalCreate is called', () => {
    const openSpy = vi.spyOn(dialog, 'open');

    component.showModalCreate();

    expect(openSpy).toHaveBeenCalledWith(UserModalComponent, {
      width: '800px',
      autoFocus: false,
      panelClass: 'custom-modal-container',
    });
  });

  it('should render a FAB button', () => {
    const fixture = TestBed.createComponent(AddButtonComponent);
    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector('button');
    expect(button).toBeTruthy();
  });
});
