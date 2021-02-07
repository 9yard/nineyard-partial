import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-note-cell-renderer',
  templateUrl: './note-cell-renderer.component.html',
  styleUrls: ['./note-cell-renderer.component.scss']
})
export class NoteCellRendererComponent {
  params: any;

  agInit(params: any): void {
    this.params = params;
  }

}
