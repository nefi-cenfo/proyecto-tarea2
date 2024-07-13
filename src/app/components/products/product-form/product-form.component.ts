import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Category, Product } from '../../../interfaces';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss'
})
export class ProductFormComponent {
  @Input() product: Product;
  @Input() action = '';
  @Input() categories: Category[]
  @Output() callParentEvent: EventEmitter<Product> = new EventEmitter<Product>();

  constructor() {
    this.product = {
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
    this.categories = []
  }

  callEvent() {
    this.callParentEvent.emit(this.product);
  }

  public updateCategory(): void {
    this.product.category = this.categories.find(category => category.id === Number(this.product.category.id)) ?? {id: 0, name: '', description: ''};
  }
}
