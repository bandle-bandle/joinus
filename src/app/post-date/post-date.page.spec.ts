import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostDatePage } from './post-date.page';

describe('PostDatePage', () => {
  let component: PostDatePage;
  let fixture: ComponentFixture<PostDatePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostDatePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostDatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
