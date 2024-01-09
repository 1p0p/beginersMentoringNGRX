import { Component, Inject, Input, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterOutlet } from '@angular/router';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatDividerModule} from  '@angular/material/divider';
import { IUser } from '../../model/user.model';

@Component({
  selector: 'app-change-user',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterOutlet,
    MatSlideToggleModule,
    MatDividerModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './change-user.component.html',
  styleUrl: './change-user.component.scss'
})
export class ChangeUserComponent {
  @Input()
  user!: IUser;
  dialogRef = inject(MatDialogRef);
  form = new FormGroup({
    userName: new FormControl<string>(''),
    city: new FormControl<string>(''),
    email: new FormControl<string>(''),
    phone: new FormControl<string>('')
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData // для передачи user
  ){}

  changeUser(){
    const changeUser: IUser = {
      id: this.data.user.id,
      name: this.form.value.userName as string,
      email: this.form.value.email as string,
      address: {
        city: this.form.value.city as string,
        street: this.data.user.address.street,
        suite: this.data.user.address.suite,
        zipcode: this.data.user.address.zipcode,
        geo: {
          lat: this.data.user.address.geo.lat,
          lng: this.data.user.address.geo.lng
        }
      },
      phone: this.form.value.phone as string,
      username: this.data.user.username,
      website: this.data.user.website,
      company: {
        name: this.data.user.company.name,
        catchPhrase: this.data.user.company.catchPhrase,
        bs: this.data.user.company.bs
      }
  };
  // console.log('change User:', changeUser);
  this.dialogRef.close(changeUser);
 }
}

interface DialogData {
  user: IUser
}