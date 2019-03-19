import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { postingComponent } from './posting.component';

describe('postingComponent', () => {
  let component: postingComponent;
  let fixture: ComponentFixture<postingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ postingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(postingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
