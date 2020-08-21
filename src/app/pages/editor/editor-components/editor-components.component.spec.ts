import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorComponentsComponent } from './editor-components.component';

describe('EditorComponentsComponent', () => {
  let component: EditorComponentsComponent;
  let fixture: ComponentFixture<EditorComponentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditorComponentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorComponentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
