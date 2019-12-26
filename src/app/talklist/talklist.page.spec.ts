import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TalklistPage } from './talklist.page';

describe('TalklistPage', () => {
  let component: TalklistPage;
  let fixture: ComponentFixture<TalklistPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TalklistPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TalklistPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
