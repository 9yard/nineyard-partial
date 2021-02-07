import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-offers-cell-renderer',
  templateUrl: './offers-cell-renderer.component.html',
  styleUrls: ['./offers-cell-renderer.component.scss']
})
export class OffersCellRendererComponent {

  params: any;

  agInit(params: any): void {
    this.params = params.value;
  }

}
