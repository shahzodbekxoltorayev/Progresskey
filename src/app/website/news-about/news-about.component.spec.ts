import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsAboutComponent } from './news-about.component';

describe('NewsAboutComponent', () => {
  let component: NewsAboutComponent;
  let fixture: ComponentFixture<NewsAboutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsAboutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsAboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
