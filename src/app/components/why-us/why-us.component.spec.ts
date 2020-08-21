import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WhyUsComponent } from './why-us.component';

describe('WhyUsComponent', () => {
  let component: WhyUsComponent;
  let fixture: ComponentFixture<WhyUsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WhyUsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WhyUsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
