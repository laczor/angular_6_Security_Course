import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {User} from "../model/user";
import {BehaviorSubject} from "rxjs/BehaviorSubject";

export const ANONYMOUS_USER : User = {
    id: undefined,
    email: ''
}

//1.We are using behaviourSubjects, since it will always return a value when a subpscription to it has been made.
//2.Thus we are making a base value as Anonymus user
//3. We declare it as an observable, to work with.
//4. map is an rxjs function, which will enable us to use functions on a collection of observables (it has to be imported in the appModule)

//5. So we make a post request, cache the result, and when we will recieved the user, we emit the userObservable,
//6. which will triger the isLoggedIn$ observable, which will trigger the isLoggedOut$ observable.


@Injectable()
export class AuthService {

   private subject = new BehaviorSubject<User>(ANONYMOUS_USER);

   user$: Observable<User> = this.subject.asObservable();

   isLoggedIn$: Observable<boolean> = this.user$.map(user => !!user.id);

   isLoggedOut$: Observable<boolean> = this.isLoggedIn$.map(isLoggedIn => !isLoggedIn);


  constructor(private http: HttpClient) {


  }


  signUp(email:string, password:string ) {

      return this.http.post<User>('/api/signup', {email, password})
      // The result of the http request is still being cached, and the the resulting obseravble is still retriable.
      // So we can execute some command before emitting the data
          .shareReplay()
          .do(user => this.subject.next(user));

  }


}





