import { Component } from '@angular/core';
declare var $: any; //! Jquery-e .ts filendan çatmaq üçün
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'ShopClient';
}
