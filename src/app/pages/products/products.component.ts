import { Component, inject, Signal } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Category, Product } from '../../interfaces';
import { ProductFormComponent } from '../../components/products/product-form/product-form.component';
import { ModalComponent } from '../../components/modal/modal.component';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from '../../components/loader/loader.component';
import { ProductListComponent } from '../../components/products/product-list/product-list.component';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    ProductListComponent,
    LoaderComponent,
    CommonModule,
    ModalComponent,
    ProductFormComponent
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {
  public areActionsAvailable: boolean = false;
  public routeAuthorities: string[] =  [];
  public categoriesSig: Signal<Category[]>;
  public readonly isAdmin: boolean;

  constructor(public productService: ProductService, public route: ActivatedRoute,public authService: AuthService, private categoryService: CategoryService) {
    this.categoryService.getAll();
    this.categoriesSig = this.categoryService.items$;
    this.isAdmin = this.authService.isAdmin();
  }

  ngOnInit(): void {
    this.productService.getAll();
    this.route.data.subscribe( data => {
      this.routeAuthorities = data['authorities'] ? data['authorities'] : [];
      this.areActionsAvailable = this.authService.areActionsAvailable(this.routeAuthorities);
    });
  }

  handleFormAction(item: Product) {
    this.productService.save(item);
  }
}
