import { ChangeDetectionStrategy, Component, OnInit, OnDestroy } from '@angular/core';
import { NbMenuItem, NbMenuService } from '@nebular/theme';
import { takeWhile, filter, map } from 'rxjs/operators';
import { NbAuthService, NbAuthResult } from '@nebular/auth';
import { Observable } from 'rxjs';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnDestroy, OnInit {

  private alive = true;
  constructor(private menuService: NbMenuService, private authService: AuthServiceService) {

  }

  userMenuItems: NbMenuItem[] = [
    {
      title: 'Logout',
      data: 'logout'
    }
  ];

  navMenuItems: NbMenuItem[] = [
    {
      title: 'Home',
      link: '/',
    },
    {
      title: 'My Impact',
      link: '/contribution',
    },
    {
      title: 'About Us',
      link: '/about-us',
    }
  ];

  ngOnDestroy(): void {
    this.alive = false;
  }


  onHomeClicked() {
    this.menuService.getSelectedItem('navMenu')
      .pipe(takeWhile(() => this.alive))
      .subscribe((menuBag) => {
        menuBag.item.selected = false;
      });
  }

  ngOnInit() {
    this.menuService.onItemClick()
      .pipe(
        filter(({ tag }) => tag === 'userMenu'),
        map(({ item: { data } }) => data),
      )
      .subscribe(data => {
        if (data === 'logout') {
          this.authService.logout('oauth2');
        }
      });
  }
}
