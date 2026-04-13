import { TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogRef } from '@angular/material/dialog';
import { ConfirmDialogComponent } from './confirm-dialog.component';
import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('ConfirmDialogComponent', () => {
  let component: ConfirmDialogComponent;
  let dialogRefMock: { close: ReturnType<typeof vi.fn> };

  beforeEach(() => {
    dialogRefMock = { close: vi.fn() };

    TestBed.configureTestingModule({
      imports: [ConfirmDialogComponent, NoopAnimationsModule],
      providers: [{ provide: MatDialogRef, useValue: dialogRefMock }],
    });

    const fixture = TestBed.createComponent(ConfirmDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close dialog with true when confirm is called', () => {
    component.confirm();
    expect(dialogRefMock.close).toHaveBeenCalledWith(true);
  });

  it('should close dialog with false when cancel is called', () => {
    component.cancel();
    expect(dialogRefMock.close).toHaveBeenCalledWith(false);
  });

  it('should render the dialog title', () => {
    const fixture = TestBed.createComponent(ConfirmDialogComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Confirmar Exclusão');
  });

  it('should render Cancelar and Deletar buttons', () => {
    const fixture = TestBed.createComponent(ConfirmDialogComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const buttons = compiled.querySelectorAll('button');
    const buttonTexts = Array.from(buttons).map((b) => b.textContent?.trim());
    expect(buttonTexts).toContain('Cancelar');
    expect(buttonTexts).toContain('Deletar');
  });
});
