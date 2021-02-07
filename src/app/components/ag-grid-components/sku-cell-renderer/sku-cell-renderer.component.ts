import { Component } from '@angular/core';

@Component({
  selector: 'app-sku-cell-renderer',
  templateUrl: './sku-cell-renderer.component.html',
  styleUrls: ['./sku-cell-renderer.component.scss']
})
export class SkuCellRendererComponent {
  params: any;

  agInit(params: any): void {
    this.params = params;
  }

  openLink(link) {
    window.open(link)
  }

}
