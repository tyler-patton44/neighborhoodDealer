import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { yourMessagesComponent } from './yourMessages.component';

describe('yourMessagesComponent', () => {
  let component: yourMessagesComponent;
  let fixture: ComponentFixture<yourMessagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ yourMessagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(yourMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
