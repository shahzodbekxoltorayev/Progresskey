import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManyProductComponent } from './many-product.component';

describe('ManyProductComponent', () => {
  let component: ManyProductComponent;
  let fixture: ComponentFixture<ManyProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManyProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManyProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
