import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { addUserAction, changeUserAction, deleteUserAction, loadUserAction } from '../../state/users.actions';
import { UserCardComponent } from '../user-card/user-card.component';

import {MatDialog, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from  '@angular/material/icon' ;
import {MatInputModule} from '@angular/material/input';
import { RouterOutlet } from '@angular/router';
import { CreateUserComponent } from '../create-user/create-user.component';
import { IUser } from '../../model/user.model';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { countSelector } from '../../state/users.selectors';

@Component({
  selector: 'app-user-list',
  standalone: true,
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
  imports: [
    CommonModule,
    UserCardComponent,
    RouterOutlet,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    RouterOutlet,
    FormsModule,
    HttpClientModule,
    CreateUserComponent, 
  ]
})
export class UserListComponent implements OnInit{
  users$ = this.store.select(countSelector);
  newUser!: IUser;

  fileNameDialogRef: MatDialogRef<CreateUserComponent> | undefined;

  constructor(
    private store: Store,
    private matDialog: MatDialog
  ){}

  ngOnInit(): void {
    this.store.dispatch(loadUserAction());
    // this.users$ = this.store.select(getUsers);
  }

  openDialog(){
    this.fileNameDialogRef = this.matDialog.open(CreateUserComponent, {
      width: '350px'
    });

    this.fileNameDialogRef.afterClosed().pipe().subscribe(user => {
      this.createUser(user);
    })
  }

  createUser(user: IUser){
    this.store.dispatch(addUserAction({newUser: user}));
  }

  changeUser(user: IUser){
    this.store.dispatch(changeUserAction({changeUser: user}));
  }

  deleteUser(user: IUser){
    this.store.dispatch(deleteUserAction({deleteUser: user}));
  }
}
