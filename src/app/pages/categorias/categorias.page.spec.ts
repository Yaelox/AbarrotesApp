import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CategoriaPage } from './categorias.page';

describe('CategoriasPage', () => {
  let component: CategoriaPage;
  let fixture: ComponentFixture<CategoriaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
