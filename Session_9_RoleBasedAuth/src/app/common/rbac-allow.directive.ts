


import {Directive, Input, OnDestroy, TemplateRef, ViewContainerRef} from "@angular/core";
import {AuthService} from "../services/auth.service";
import {User} from "../model/user";
import {Subscription} from "rxjs/Subscription";
import * as _ from 'lodash';

@Directive({
    selector:"[rbacAllow]"
})
export class RbacAllowDirective implements OnDestroy {

    allowedRoles:string[];
    user:User;

    sub:Subscription;

    //TemplateRef -- will be a reference on which the directive is being applied.
    //ViewContainerRef -- Represents a container where one or more views can be attached to a component.

    constructor(
        private templateRef: TemplateRef<any>,
        private viewContainer: ViewContainerRef,
        private authService: AuthService) {
      //If there is a change, calculate if the element should be shown, or not.
        this.sub = authService.user$.subscribe(
            user => {
                this.user = user;
                this.showIfUserAllowed();
            });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    //We can actually, define directives, with actual parameters
    //   <li *rbacAllow="['ADMIN']">
    //     <a routerLink="/admin">Admin</a>
    //   </li>
    @Input()
    set rbacAllow(allowedRoles: string[]) {
        this.allowedRoles = allowedRoles;
        this.showIfUserAllowed();
    }

    showIfUserAllowed() {

        if (!this.allowedRoles || this.allowedRoles.length === 0 ||
            !this.user) {
    //Will clear the tag, and no data will be shown
            this.viewContainer.clear();
            return;
        }

        const isUserAllowed =
            _.intersection(this.allowedRoles, this.user.roles).length > 0;


        if (isUserAllowed) {
    //Will attach the view to this container
            this.viewContainer.createEmbeddedView(this.templateRef);
        }
        else {
            this.viewContainer.clear();
        }

    }

}











