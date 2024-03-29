import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from "rxjs/operators";
import { throwError, BehaviorSubject } from "rxjs";
import { User } from "./user.model";

export interface AuthResponseData {
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

@Injectable({providedIn: 'root'})
export class AuthService { 
    user = new BehaviorSubject<User>(null);

    constructor(private http: HttpClient) {}

    signup(email: string, password: string) {
        return this.http
        .post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCd-MHgNg2Zn-CB7HdsRuSbuvCZtZVNNqc',
            {
                email: email,
                password: password,
                returnSecureToken: true
            }
        )
        .pipe(
          catchError(this.handleError),
          tap(resData => {
                this.handleAuthentication(
                    resData.email,
                    resData.localId,
                    resData.idToken,
                    +resData.expiresIn
                );
            })
        );
    }

    login(email: string, password: string) {
        return this.http
            .post<AuthResponseData>(
                'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCd-MHgNg2Zn-CB7HdsRuSbuvCZtZVNNqc',
        {
            email: email,
            password: password,
            returnSecureToken: true
        }
    )
    .pipe(catchError(this.handleError)
    tap(resData => {
        this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
        );
      }) 
    );
  }

  private handleAuthentication(
    email: string, 
    userId: string,
    token: string, 
    expiresIn: number
    ) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(
            email,
            localId,
            idToken,
            expirationDate
        );
        this.user.next(user);
    }   

    private handleError(errorRes: HttpErrorResponse) {
        let errorMessage = 'An unknown error occurred!';
            if (!errorRes.error || !errorRes.error.error) {
                return throwError(errorMessage);
            }
                switch (errorRes.error.error.message) {
                    case 'EMAIL_EXISTS':
                        errorMessage = 'This email exists already';
                        break;
                    case 'EMAIL_NOT_FOUND':
                        errorMessage = 'This email does not exist';
                        break;
                    case 'INVALID_PASSWORD':
                        errorMessage = 'This password is not correct.';
                        break;        
                }
                return throwError(errorMessage); 
    }
}





// function handleAuthentication(email: any, string: any, token: any, string1: any, expiresIn: any, number: any) {
//     throw new Error("Function not implemented.");
// }
// firebase address link // https://firebase.google.com/docs/reference/rest/auth/#section-sign-in-email-passwrod