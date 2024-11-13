import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditCategoriaPage } from './edit-categoria.page';

describe('EditCategoriaPage', () => {
  let component: EditCategoriaPage;
  let fixture: ComponentFixture<EditCategoriaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCategoriaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
