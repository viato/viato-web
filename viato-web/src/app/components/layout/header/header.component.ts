import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { NbMenuService } from '@nebular/theme';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {
  userMenu = [ { title: 'Profile' }, { title: 'Log out' } ];
  constructor(private menuService: NbMenuService) { }

  ngOnInit(): void {
  }

}
