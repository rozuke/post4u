import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ScreenService {
  private isDesktopSubject = new BehaviorSubject<boolean>(
    this.checkIsDesktop()
  );
  isDesktop$ = this.isDesktopSubject.asObservable();

  constructor() {
    window.addEventListener('resize', this.onResize.bind(this));
  }

  private checkIsDesktop(): boolean {
    return window.innerWidth >= 1024;
  }

  private onResize() {
    this.isDesktopSubject.next(this.checkIsDesktop());
  }
}
