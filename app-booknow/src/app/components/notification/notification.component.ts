import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
  message: string | null = null;
  type: string | null = null;

  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.notificationService.notifications$.subscribe(notification => {
      this.message = notification.message;
      this.type = notification.type;
      setTimeout(() => {
        this.message = null;
        this.type = null;
      }, 3000); // Ocultar após 3 segundos
    });
  }
}
