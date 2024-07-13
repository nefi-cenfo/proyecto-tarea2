import { Component, Input, Signal, SimpleChanges } from '@angular/core';
import { Category, Product } from '../../../interfaces';
import { ProductService } from '../../../services/product.service';
import { ProductFormComponent } from '../product-form/product-form.component';
import { ModalComponent } from '../../modal/modal.component';
import { CommonModule } from '@angular/common';
import { CategoryService } from '../../../services/category.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    CommonModule,
    ModalComponent,
    ProductFormComponent
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent {
  @Input() itemList: Product[] = [];
  @Input() areActionsAvailable: boolean = false;
  public selectedItem: Product;
  public categoriesSig: Signal<Category[]>;
  public readonly isAdmin: boolean;

  constructor(public gameService: ProductService, private categoryService: CategoryService, private authService: AuthService) {
    this.selectedItem = {
      id: 0,
      name: '',
      description: '',
      price: 0,
      stock: 0,
      category: {
        id: 0,
        name: '',
        description: ''
      }
    }
    this.categoryService.getAll();
    this.categoriesSig = this.categoryService.items$;
    this.isAdmin = this.authService.isAdmin();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['areActionsAvailable']) {
      console.log('areActionsAvailable', this.areActionsAvailable);
    }
  }
  
  showDetailModal(item: Product, modal: any) {
    this.selectedItem = {...item}
    modal.show();
  }

  handleFormAction(item: Product) {
    this.gameService.update(item);
  }

  deleteProduct(item: Product) {
    this.gameService.delete(item);
  }
}
