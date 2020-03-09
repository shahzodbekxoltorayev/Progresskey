import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopularProductComponent } from './popular-product.component';

describe('PopularProductComponent', () => {
  let component: PopularProductComponent;
  let fixture: ComponentFixture<PopularProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopularProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopularProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
