import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-channal-icon',
  templateUrl: './channal-icon.component.html',
  styleUrls: ['./channal-icon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChannalIconComponent implements OnInit {
  @Input() channal: Channals;
  @Input() gray: boolean;
  cssClass = {};
  constructor() { }

  ngOnInit(): void {
    this.cssClass['icon--' + this.channal.toLowerCase()] = true;
    this.cssClass['icon--gray'] = this.gray;
  }

}


enum Channals {
  Amazon = "amazon",
  Ebay = "ebay",
  Walmart = "walmart",
  Wish = "wish",
  Newegg = "newegg"
}