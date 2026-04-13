import { TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ToggleThemeComponent } from './toggle-theme.component';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

describe('ToggleThemeComponent', () => {
  let component: ToggleThemeComponent;

  beforeEach(() => {
    localStorage.clear();
    document.body.classList.remove('light-theme', 'dark-theme');

    TestBed.configureTestingModule({
      imports: [ToggleThemeComponent, NoopAnimationsModule],
    });

    const fixture = TestBed.createComponent(ToggleThemeComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    localStorage.clear();
    document.body.classList.remove('light-theme', 'dark-theme');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should apply saved theme from localStorage on init', () => {
    localStorage.setItem('theme', 'dark');
    component.ngOnInit();
    expect(component.theme).toBe('dark');
    expect(document.body.classList.contains('dark-theme')).toBe(true);
  });

  it('should toggle from light to dark', () => {
    component.theme = 'light';
    component.toggleTheme();
    expect(component.theme).toBe('dark');
    expect(localStorage.getItem('theme')).toBe('dark');
    expect(document.body.classList.contains('dark-theme')).toBe(true);
  });

  it('should toggle from dark to light', () => {
    component.theme = 'dark';
    component.toggleTheme();
    expect(component.theme).toBe('light');
    expect(localStorage.getItem('theme')).toBe('light');
    expect(document.body.classList.contains('light-theme')).toBe(true);
  });

  it('should remove previous theme class when toggling', () => {
    component.theme = 'light';
    component.toggleTheme();
    expect(document.body.classList.contains('light-theme')).toBe(false);
    expect(document.body.classList.contains('dark-theme')).toBe(true);
  });

  it('should detect system dark preference when no saved theme exists', () => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockReturnValue({ matches: true } as MediaQueryList),
    });

    component.changeTheme();
    expect(component.theme).toBe('dark');
  });

  it('should default to light when system preference is light', () => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockReturnValue({ matches: false } as MediaQueryList),
    });

    component.changeTheme();
    expect(component.theme).toBe('light');
  });
});
