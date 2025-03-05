import { computed, effect, Injectable, signal } from '@angular/core';
import { AppTheme } from '../../shared/models/app-theme.model';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly THEME_KEY = 'appTheme';
  appTheme = signal<string>(this.getStoredTheme() || 'system');

  themes: AppTheme[] = [
    {
      name: 'light',
      icon: 'light_mode',
    },
    {
      name: 'dark',
      icon: 'dark_mode',
    },
    {
      name: 'system',
      icon: 'desktop_windows',
    },
  ];

  getThemes() {
    return this.themes;
  }

  setTheme(name: string) {
    this.appTheme.set(name);
    this.storeTheme(name);
  }

  setSystemTheme = effect(() => {
    const appTheme = this.appTheme();
    const colorSheme = appTheme === 'system' ? 'light dark' : appTheme;
    document.body.style.colorScheme = colorSheme;
  });

  selectedTheme = computed(() => {
    return this.themes.find(theme => theme.name === this.appTheme());
  });

  private storeTheme(theme: string) {
    localStorage.setItem(this.THEME_KEY, theme);
  }

  private getStoredTheme(): string | null {
    return localStorage.getItem(this.THEME_KEY);
  }
}
