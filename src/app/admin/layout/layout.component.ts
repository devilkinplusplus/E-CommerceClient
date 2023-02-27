import { Component, OnInit } from '@angular/core';
import {
  AlertifyService,
  MessagePosition,
  MessageType,
} from '../../services/admin/alertify.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  constructor(private alertifyService: AlertifyService) {}

  ngOnInit(): void {
    this.alertifyService.message('Hello', { messageType: MessageType.Error });
  }
}
