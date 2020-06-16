/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { EditListOfUsersComponent } from './editListOfUsers.component';

describe('EditListOfUsersComponent', () => {
  let component: EditListOfUsersComponent;
  let fixture: ComponentFixture<EditListOfUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditListOfUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditListOfUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
