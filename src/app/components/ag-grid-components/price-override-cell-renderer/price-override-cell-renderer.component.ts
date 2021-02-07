import { Component } from '@angular/core';

@Component({
  selector: 'app-price-override-cell-renderer',
  templateUrl: './price-override-cell-renderer.component.html',
  styleUrls: ['./price-override-cell-renderer.component.scss']
})
export class PriceOverrideCellRendererComponent {
  params: any;
  tooltipText: string;
  agInit(params: any): void {
    this.params = params;
    if (!this.params.value['isAuto']) {
      this.tooltipText = "Amount is overriden and not managed by the system. Double click cell to change"
    } else {
      this.tooltipText = "Amount is managed by system rules"
    }
  }
}
