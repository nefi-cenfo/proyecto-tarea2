import { Component, inject, Input, SimpleChanges } from '@angular/core';
import { Category } from '../../../interfaces';
import { CommonModule } from '@angular/common';
import { ModalComponent } from '../../modal/modal.component';
import { CategoryService } from '../../../services/category.service';
import { CategoryFormComponent } from '../category-form/category-form.component';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [
    CommonModule,
    ModalComponent,
    CategoryFormComponent
  ],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.scss'
})
export class CategoryListComponent {
  @Input() itemList: Category[] = [];
  @Input() areActionsAvailable: boolean = false;
  public selectedItem: Category;
  public gameService: CategoryService = inject(CategoryService);
  public readonly isAdmin: boolean;

  constructor(private authService: AuthService) {
    this.selectedItem = {
      id: 0,
      name: '',
      description: ''
    }
    this.isAdmin = this.authService.isAdmin();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['areActionsAvailable']) {
      console.log('areActionsAvailable', this.areActionsAvailable);
    }
  }
  
  showDetailModal(item: Category, modal: any) {
    this.selectedItem = {...item}
    modal.show();
  }

  handleFormAction(item: Category) {
    this.gameService.update(item);
  }

  deleteCategory(item: Category) {
    this.gameService.delete(item);
  }
}
