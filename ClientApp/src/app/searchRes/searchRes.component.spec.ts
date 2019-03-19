import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { searchResComponent } from './searchRes.component';

describe('searchResComponent', () => {
  let component: searchResComponent;
  let fixture: ComponentFixture<searchResComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ searchResComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(searchResComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
