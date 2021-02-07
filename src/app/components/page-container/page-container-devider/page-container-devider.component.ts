import { Component, HostBinding, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-page-container-devider",
  templateUrl: "./page-container-devider.component.html",
  styleUrls: ["./page-container-devider.component.scss"],
})
export class PageContainerDeviderComponent implements OnInit {
  @Input() title: string;
  @Input() center: boolean;
  @HostBinding('class.center') get isCenter() { return this.center; }
  constructor() {}

  ngOnInit(): void { }
}
