import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscriptionComponent } from './discription.component';

describe('DiscriptionComponent', () => {
  let component: DiscriptionComponent;
  let fixture: ComponentFixture<DiscriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiscriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
