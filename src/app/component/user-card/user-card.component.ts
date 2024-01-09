import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { IUser } from '../../model/user.model';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { RouterOutlet } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ChangeUserComponent } from '../change-user/change-user.component';

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,  
    MatDialogModule, 
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss'
})
export class UserCardComponent {
  @Input({required: true}) 
  user!: IUser;

  matDialog = inject(MatDialog);
  fileNameDialogRef: MatDialogRef<ChangeUserComponent> | undefined;

  @Output() 
  changeUserEvent = new EventEmitter<IUser>();

  @Output() 
  deleteUserEvent = new EventEmitter<IUser>();

  openDialog(){
    this.fileNameDialogRef = this.matDialog.open(ChangeUserComponent, {
      width: '350px',
      data: {user: this.user}
    });

    this.fileNameDialogRef.afterClosed().pipe().subscribe((changeUser:IUser) => this.changeUserEvent.emit(changeUser));
  }

  deleteUser(){
    this.deleteUserEvent.emit(this.user);
  }
}
