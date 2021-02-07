import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-feature-explenation',
  templateUrl: './feature-explenation.component.html',
  styleUrls: ['./feature-explenation.component.scss']
})
export class FeatureExplenationComponent implements OnInit {
  @Input() title: string;
  @Input() text: string;
  constructor() { }

  ngOnInit(): void {
  }

}
