import { GridActionsService } from '../../../data-grid/grid-actions.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-repricing-model-cell-renderer',
  templateUrl: './repricing-model-cell-renderer.component.html',
  styleUrls: ['./repricing-model-cell-renderer.component.scss']
})
export class RepricingModelCellRendererComponent {
  constructor(private gridActionsService: GridActionsService){}
  params: any;

  agInit(params: any): void {
    this.params = params;
  }

  startEditing(params) {
    this.gridActionsService.editCell({rowIndex: params.rowIndex, colKey: params.column.colId});
  }

}
