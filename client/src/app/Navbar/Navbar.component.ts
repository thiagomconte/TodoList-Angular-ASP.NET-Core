import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Auth } from '../Models/Auth';
import { logoutUser } from '../Store/Actions/auth.actions';
import {Router} from '@angular/router';

@Component({
  selector: 'app-Navbar',
  templateUrl: './Navbar.component.html',
  styleUrls: ['./Navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  auth!: Auth;

  public isMenuCollapsed = true;

  constructor(private store: Store<{ auth: Auth }>, private router: Router) {
    store.select('auth').subscribe( x => {
      this.auth = x;
    })
   }

  ngOnInit() {
  }

  logout(){
    this.store.dispatch(logoutUser());
    this.router.navigateByUrl("/");
  }

}
