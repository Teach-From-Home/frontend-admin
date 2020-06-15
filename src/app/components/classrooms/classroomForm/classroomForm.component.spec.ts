/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ClassroomFormComponent } from './classroomForm.component';

describe('ClassroomFormComponent', () => {
  let component: ClassroomFormComponent;
  let fixture: ComponentFixture<ClassroomFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassroomFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassroomFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
