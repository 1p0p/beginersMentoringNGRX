import { Injectable, inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, switchMap } from "rxjs/operators";
import { addUserAction, changeUserAction, deleteUserAction, loadUserAction, successAddUserAction, successChangeUserAction, successDeleteUserAction, loadUsersSuccess } from "./users.actions";
import { UserApiService } from "../service/user-api.service";

@Injectable()
export class AppEffects{
    usersApiService = inject(UserApiService);
    constructor(
        private actions$: Actions
    ){}

    users$ = createEffect(()=>
        this.actions$.pipe(
            ofType(loadUserAction),
            switchMap(()=> 
                this.usersApiService.getUsers().pipe(
                    map((val)=>loadUsersSuccess({payload: val}))
                )
            )
        )
    )
    //, {dispatch:false});
    
    addUser$ = createEffect(()=>
        this.actions$.pipe(
            ofType(addUserAction),
            switchMap(({newUser}) => 
                this.usersApiService.create(newUser).pipe(
                    map((val)=>successAddUserAction({user: val})))
            )
        )
    )
    

    changeUser$ = createEffect(()=>
        this.actions$.pipe(
            ofType(changeUserAction),
            switchMap(({changeUser})=>
                this.usersApiService.change(changeUser).pipe(
                    map((val)=>successChangeUserAction({user: val}))
                )
            )
        )
    )

    deleteUser$ = createEffect(()=>
        this.actions$.pipe(
            ofType(deleteUserAction),
            switchMap(({deleteUser})=>
                this.usersApiService.delete(deleteUser).pipe(
                    map((val)=>successDeleteUserAction({user: val}))
                )
            )
        )
    )

}