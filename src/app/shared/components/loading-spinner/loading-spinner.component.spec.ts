import { TestBed } from '@angular/core/testing';
import { LoadingSpinnerComponent } from './loading-spinner.component';
import { describe, it, expect, beforeEach } from 'vitest';

describe('LoadingSpinnerComponent', () => {
  let component: LoadingSpinnerComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [LoadingSpinnerComponent],
    });

    const fixture = TestBed.createComponent(LoadingSpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
