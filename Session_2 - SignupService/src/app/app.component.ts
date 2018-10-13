import {Component, OnInit} from '@angular/core';
import {AuthService} from "./services/auth.service";
import {Observable} from "rxjs/Observable";
import {User} from "./model/user";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


//We are declaring variables, which will be observable reference, to observables created in the Authservice.
export class AppComponent  implements OnInit{

    isLoggedIn$: Observable<boolean>;
    isLoggedOut$: Observable<boolean>;


    constructor(private authService:AuthService) {

    }


    ngOnInit() {

        this.isLoggedIn$ = this.authService.isLoggedIn$;
        this.isLoggedOut$ = this.authService.isLoggedOut$;

    }



}
