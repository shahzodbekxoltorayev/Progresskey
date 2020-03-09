import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentStoresComponent } from './department-stores.component';

describe('DepartmentStoresComponent', () => {
  let component: DepartmentStoresComponent;
  let fixture: ComponentFixture<DepartmentStoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DepartmentStoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepartmentStoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
