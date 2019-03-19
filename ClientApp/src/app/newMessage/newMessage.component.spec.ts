import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { newMessageComponent } from './newMessage.component';

describe('newMessageComponent', () => {
  let component: newMessageComponent;
  let fixture: ComponentFixture<newMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ newMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(newMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
