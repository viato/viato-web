import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-auth-wrapper',
  templateUrl: './auth-wrapper.component.html',
  styleUrls: ['./auth-wrapper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthWrapperComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
