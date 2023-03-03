import { NgxSpinnerService } from 'ngx-spinner';
//! Həm admin, həm də ui componentləri üçün ortaq əməliyyatların icra edildiyi bir classdır!
export class BaseComponent {
  constructor(private spinner: NgxSpinnerService) {}

  showSpinner() {
    this.spinner.show();

    setTimeout(() => {
      this.spinner.hide();
    }, 1000);
  }

  hideSpinner() {
    this.spinner.hide();
  }
}
