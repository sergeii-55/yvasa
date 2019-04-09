import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MailUserComponent } from './mail-user.component';

describe('MailUserComponent', () => {
  let component: MailUserComponent;
  let fixture: ComponentFixture<MailUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MailUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MailUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
