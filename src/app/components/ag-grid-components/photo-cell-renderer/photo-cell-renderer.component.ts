import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-photo-cell-renderer',
  templateUrl: './photo-cell-renderer.component.html',
  styleUrls: ['./photo-cell-renderer.component.scss']
})
export class PhotoCellRendererComponent {
  params: any;

  agInit(params: any): void {
    this.params = params;
  }

}