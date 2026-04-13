import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

type Theme = 'light' | 'dark';

@Component({
  selector: 'app-toggle-theme',
  imports: [MatIconModule, MatButtonModule],
  templateUrl: './toggle-theme.component.html',
  styleUrls: ['./toggle-theme.component.scss']
})
export class ToggleThemeComponent implements OnInit {
  theme: Theme = 'light';

  ngOnInit() {
    this.changeTheme();
  }

  changeTheme(): void {
    const savedTheme = localStorage.getItem('theme') as Theme | null;

    if(savedTheme) {
      this.theme = savedTheme;
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      this.theme = prefersDark ? 'dark' : 'light';
    }

    this.applyTheme();

  }

  toggleTheme(): void {
    this.theme = this.theme === 'light' ? 'dark' : 'light';
    localStorage.setItem('theme', this.theme);
    this.applyTheme();
  }

  private applyTheme(): void {
    document.body.classList.remove('light-theme', 'dark-theme');
    document.body.classList.add(this.theme === 'light' ? 'light-theme' : 'dark-theme');
  }

}
