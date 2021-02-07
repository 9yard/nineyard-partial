export interface DialogData {
  title: string;
  actions: DialogActions[];
}

export interface DialogActions {
  text: string;
  buttonStyle?: string;
  buttonColor?: string;
  buttonSize?: string;
  isDisabled: boolean;
}

export interface ErrorDialogData extends DialogData {
  errors: Errors[];
}

interface Errors {
  sku: string;
  skuType: string;
  reason: string;
  isShiperr: string;
  received: string;
  addBy: string;
  errDismissed: string;
  qty: number;
}
