import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PageinitierPage } from './pageinitier.page';

describe('PageinitierPage', () => {
  let component: PageinitierPage;
  let fixture: ComponentFixture<PageinitierPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PageinitierPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
