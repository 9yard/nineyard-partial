import { Component } from '@angular/core';

@Component({
  selector: 'app-date-cell-renderer',
  templateUrl: './date-cell-renderer.component.html',
  styleUrls: ['./date-cell-renderer.component.scss']
})
export class DateCellRendererComponent {

  params: any;
  date: any;

  agInit(params: any): void {
    this.params = params;
    if (this.params.value) {
      this.date = new Date(this.params.value);
    }
  }

}
