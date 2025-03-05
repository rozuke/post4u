import { computed, effect, Injectable, signal } from '@angular/core';
import { AppTheme } from '../../shared/models/app-theme.model';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  appTheme = signal<string>('system');

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
  }

  setSystemTheme = effect(() => {
    const appTheme = this.appTheme();
    const colorSheme = appTheme === 'system' ? 'light dark' : appTheme;
    document.body.style.colorScheme = colorSheme;
  });

  selectedTheme = computed(() => {
    return this.themes.find(theme => theme.name === this.appTheme());
  });
}
