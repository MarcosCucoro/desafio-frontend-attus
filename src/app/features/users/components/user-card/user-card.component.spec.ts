import { TestBed } from '@angular/core/testing';
import { UserCardComponent } from './user-card.component';
import { describe, it, expect, beforeEach } from 'vitest';

describe('UserCardComponent', () => {
  let component: UserCardComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [UserCardComponent],
    });

    const fixture = TestBed.createComponent(UserCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
