import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { sellComponent } from './sell.component';

describe('sellComponent', () => {
  let component: sellComponent;
  let fixture: ComponentFixture<sellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ sellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(sellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
