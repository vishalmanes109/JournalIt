import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateeditorComponent } from './updateeditor.component';

describe('UpdateeditorComponent', () => {
  let component: UpdateeditorComponent;
  let fixture: ComponentFixture<UpdateeditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateeditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateeditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
