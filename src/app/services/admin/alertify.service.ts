import { Injectable } from '@angular/core';
declare var alertify: any; //! For using alertify

@Injectable({
  providedIn: 'root',
})
export class AlertifyService {
  message(message: string, options: Partial<AlertifyOptions>) {
    alertify.set('notifier', 'delay', options.delay);
    alertify.set('notifier', 'position', options.position);
    const msg = alertify[options.messageType](message);
    if (options.dissmissOthers) msg.dismissOthers();
  }

  dismissAll() {
    alertify.dismissAll();
  }
}

export class AlertifyOptions {
  messageType: MessageType = MessageType.Message;
  position: MessagePosition = MessagePosition.BottomRight;
  delay: number = 1;
  dissmissOthers: boolean = false;
}

export enum MessageType {
  Success = 'success',
  Error = 'error',
  Warning = 'warning',
  Notify = 'notify',
  Message = 'message',
}

export enum MessagePosition {
  TopRight = 'top-right',
  TopCenter = 'top-center',
  TopLeft = 'top-left',
  BottomRight = 'bottom-right',
  BottomCenter = 'bottom-center',
  BottomLeft = 'bottom-left',
}
