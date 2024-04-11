import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css'],
  imports: [CommonModule]
})

export class MessageComponent {
  @Input() text: string = '';
  @Input() type: 'info' | 'error' | 'success' = 'info';
}