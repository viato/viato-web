import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmDonationComponent } from './confirm-donation.component';

describe('ConfirmDonationComponent', () => {
  let component: ConfirmDonationComponent;
  let fixture: ComponentFixture<ConfirmDonationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmDonationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmDonationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
