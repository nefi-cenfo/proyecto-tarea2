import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Category } from '../../../interfaces';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-category-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './category-form.component.html',
  styleUrl: './category-form.component.scss'
})
export class CategoryFormComponent {
  @Input() category: Category;
  @Input() action = '';
  @Output() callParentEvent: EventEmitter<Category> = new EventEmitter<Category>();

  constructor() {
    this.category = {
      id: 0,
      name: '',
      description: ''
    }
  }

  callEvent() {
    this.callParentEvent.emit(this.category);
  }
}
