import { TestBed } from '@angular/core/testing';
import { UserFormModalComponent } from './user-form-modal.component';
import { describe, it, expect, beforeEach } from 'vitest';

describe('UserFormModalComponent', () => {
  let component: UserFormModalComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [UserFormModalComponent],
    });

    const fixture = TestBed.createComponent(UserFormModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
