import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrl: './page-header.component.css'
})
export class PageHeaderComponent implements OnInit {

  @Input('page-title') pageTitle: string;
  @Input('button-class') buttonClass: string;
  @Input('button-text') buttonText: string;
  @Input('button-link') buttonLink: string;
  @Input('icon-class') iconClass: string;

  constructor() {
    this.pageTitle = '';
    this.buttonClass = '';
    this.buttonText = '';
    this.buttonLink = '';
    this.iconClass = '';
  }

  ngOnInit(): void {}

}
