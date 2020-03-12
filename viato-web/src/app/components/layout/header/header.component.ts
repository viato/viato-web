import { ChangeDetectionStrategy, Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { NbMenuItem, NbMenuService, NbSidebarService } from '@nebular/theme';
import { filter, map, takeUntil, } from 'rxjs/operators';
import { NbAuthService, NbAuthResult, getDeepFromObject, NB_AUTH_OPTIONS } from '@nebular/auth';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class HeaderComponent implements OnDestroy, OnInit {

  private redirectDelay = 0;
  private strategy = '';
  private unsubscribe: Subject<void> = new Subject();
  constructor(
    private menuService: NbMenuService,
    public authService: NbAuthService,
    private sidebarService: NbSidebarService,
    @Inject(NB_AUTH_OPTIONS) protected options = {},
    protected router: Router) {
    this.redirectDelay = this.getConfigValue('forms.logout.redirectDelay');
    this.strategy = this.getConfigValue('forms.logout.strategy');
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
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  toggleSidebar(): void {
    this.sidebarService.toggle(false, 'menu-sidebar');
  }

  onHomeClicked() {
    this.menuService.getSelectedItem('navMenu')
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((menuBag) => {
        menuBag.item.selected = false;
      });
  }

  ngOnInit() {
    this.menuService.onItemClick()
      .pipe(
        filter(({ tag }) => tag === 'userMenu'),
        map(({ item: { data } }) => data),
        takeUntil(this.unsubscribe)
      )
      .subscribe(data => {
        if (data === 'logout') {
          this.logout(this.strategy);
        }
      });
  }

  logout(strategy: string): void {
    this.authService.logout(strategy)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((result: NbAuthResult) => {

        const redirect = result.getRedirect();
        if (redirect) {
          setTimeout(() => {
            return this.router.navigateByUrl(redirect);
          }, this.redirectDelay);
        }
      });
  }

  getConfigValue(key: string): any {
    return getDeepFromObject(this.options, key, null);
  }
}
