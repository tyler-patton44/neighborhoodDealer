import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { offerMessageComponent } from './offerMessage.component';

describe('offerMessageComponent', () => {
  let component: offerMessageComponent;
  let fixture: ComponentFixture<offerMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ offerMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(offerMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
