import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TalkroomPage } from './talkroom.page';

describe('TalkroomPage', () => {
  let component: TalkroomPage;
  let fixture: ComponentFixture<TalkroomPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TalkroomPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TalkroomPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
