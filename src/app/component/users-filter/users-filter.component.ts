import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-users-filter',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './users-filter.component.html',
  styleUrl: './users-filter.component.scss'
})
export class UsersFilterComponent {

  @Output()
  filterUserEvent = new EventEmitter<string>();

  form = new FormGroup({
    filter: new FormControl<string>('') 
  })

  filterUsers(){
    // console.log('filterUsers: ', this.form.value.filter);
    this.filterUserEvent.emit(this.form.value.filter!);
  }
}
