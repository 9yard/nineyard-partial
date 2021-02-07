import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-boolean-cell-renderer',
  templateUrl: './boolean-cell-renderer.component.html',
  styleUrls: ['./boolean-cell-renderer.component.scss']
})
export class BooleanCellRendererComponent {
  params: any;

  agInit(params: any): void {
    this.params = params;    
  }

}
