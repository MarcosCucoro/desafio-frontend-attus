import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { provideNgxMask } from 'ngx-mask';
import { HeaderComponent } from './header.component';
import { UserService } from '../../../core/services/user.service';
import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let userService: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HeaderComponent, NoopAnimationsModule],
      providers: [provideHttpClient(), provideHttpClientTesting(), provideNgxMask()],
    });

    const fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have an empty search control initially', () => {
    expect(component.searchControl.value).toBe('');
  });

  it('should call setSearch on UserService via onSearch', () => {
    const spy = vi.spyOn(userService, 'setSearch');
    component.onSearch('query');
    expect(spy).toHaveBeenCalledWith('query');
  });

  it('should call onSearch after debounce', async () => {
    vi.useFakeTimers();
    const spy = vi.spyOn(userService, 'setSearch');

    component.searchControl.setValue('test');
    vi.advanceTimersByTime(300);

    expect(spy).toHaveBeenCalledWith('test');
    vi.useRealTimers();
  });

  it('should not call onSearch before debounce time', async () => {
    vi.useFakeTimers();
    const spy = vi.spyOn(userService, 'setSearch');

    component.searchControl.setValue('test');
    vi.advanceTimersByTime(100);

    expect(spy).not.toHaveBeenCalledWith('test');

    vi.advanceTimersByTime(200);
    expect(spy).toHaveBeenCalledWith('test');
    vi.useRealTimers();
  });

  it('should skip duplicate consecutive values', async () => {
    vi.useFakeTimers();
    const spy = vi.spyOn(userService, 'setSearch');

    component.searchControl.setValue('test');
    vi.advanceTimersByTime(300);

    component.searchControl.setValue('test');
    vi.advanceTimersByTime(300);

    expect(spy).toHaveBeenCalledTimes(1);
    vi.useRealTimers();
  });
});
