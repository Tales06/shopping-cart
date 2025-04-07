import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
    private themeKey = 'darkTheme';
    private darkThemeClass = 'dark-theme';

  constructor() {
    const saved = localStorage.getItem("darkTheme") === 'true';
    if (saved) {
      this.setDarkTheme(true);
    }
  }

  toggleTheme(): void {
    const isDark = document.body.classList.toggle('dark-theme');
    localStorage.setItem(this.themeKey, String(isDark));
  }

  private setDarkTheme(enable: boolean): void {
    if (enable) {
        document.body.classList.remove(this.darkThemeClass);
    } else {
        document.body.classList.add(this.darkThemeClass);
    }
  }
}