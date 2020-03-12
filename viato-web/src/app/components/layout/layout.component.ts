import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, DoCheck } from '@angular/core';
import { NbMenuItem, NbMenuService, NbSidebarService } from '@nebular/theme';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { Location } from '@angular/common';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutComponent implements OnInit, OnDestroy, DoCheck {

  private unsubscribe: Subject<void> = new Subject();
  constructor(
    private menuService: NbMenuService,
    private sidebarService: NbSidebarService,
    private location: Location) { }

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
  ngOnInit(): void {
    this.menuService.onItemClick()
      .pipe(
        filter(({ tag }) => tag === 'leftMenu'),
        takeUntil(this.unsubscribe)
      )
      .subscribe(() => {
        this.sidebarService.collapse('menu-sidebar');
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  ngDoCheck(): void {
    // Fix for https://github.com/akveo/nebular/issues/1242
    if (this.location.path() === '' && !this.navMenuItems[0].selected) {
      // Select home menu item when navigating to the site root
      this.navMenuItems[0].selected = true;
      for (let index = 1; index < this.navMenuItems.length; index++) {
        this.navMenuItems[index].selected = false;
      }
    }
  }

}
