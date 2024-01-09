import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterOutlet } from '@angular/router';
import { IUser } from '../../model/user.model';
import { DialogRef } from '@angular/cdk/dialog';

@Component({
  selector: 'app-create-user',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterOutlet, 
    MatDialogModule, 
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.scss'
})
export class CreateUserComponent {
  // @Output() 
  // btnCreateUserClick = new EventEmitter<IUser>();
  dialogRef = inject(MatDialogRef);
  
  form = new FormGroup({
    userName: new FormControl<string>('', [
      Validators.required, Validators.minLength(6)
    ]),
    city: new FormControl<string>(''),
    email: new FormControl<string>(''),
    phone: new FormControl<string>(''), 
    street: new FormControl<string>(''), 
  })

  submitUserAdd(){
    console.log('submit add user')
    const newUser: IUser = {
      id: '2222',
      name: this.form.value.userName as string,
      email: this.form.value.email as string,
      address: {
        city: this.form.value.city as string,
        street: '',
        suite: '',
        zipcode: '',
        geo: {
          lat: '',
          lng: ''
        }
      },
      phone: this.form.value.phone as string,
      username: '',
      website: '',
      company: {
        name: '',
        catchPhrase: '',
        bs: ''
      }
    }
    this.dialogRef.close(newUser);
  }
}
