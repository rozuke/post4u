import {
  Component,
  ChangeDetectionStrategy,
  Input,
  inject,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
@Component({
  selector: 'app-post-card',
  imports: [MatButtonModule, MatCardModule, MatIconModule, MatMenuModule],
  templateUrl: './post-card.component.html',
  styleUrl: './post-card.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostCardComponent {
  private readonly router = inject(Router);
  @Input() avatar: string = '';
  @Input() title: string = '';
  @Input() subtitle: string = '';
  @Input() content: string = '';
  @Input() commentsCount: number = 0;
  @Input() showBulletOptions: boolean = false;

  onCardClick() {
    this.router.navigate(['/test1']);
  }
}
