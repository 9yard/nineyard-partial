import { Component } from '@angular/core';

@Component({
  selector: 'app-rank-cell-renderer',
  templateUrl: './rank-cell-renderer.component.html',
  styleUrls: ['./rank-cell-renderer.component.scss']
})
export class RankCellRendererComponent {
  params: any;

  agInit(params: any): void {
    this.params = params;
  }

}
