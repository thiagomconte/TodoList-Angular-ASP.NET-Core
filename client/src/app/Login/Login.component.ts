import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {FormBuilder} from '@angular/forms';
import { Store } from '@ngrx/store';
import { authenticateUser } from '../Store/Actions/auth.actions';
import { Auth } from '../Models/Auth';
import { environment } from 'src/environments/environment';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-Login',
  templateUrl: './Login.component.html',
  styleUrls: ['./Login.component.scss']
})
export class LoginComponent implements OnInit {
  
  baseUrl = environment.baseUrl

  loginForm = this.fb.group({
    email: '',
    password: '',
  })

  public payload: Auth = {
    email: '',
    isLoggedIn: false,
    token: '',
  };

  constructor(private toastr: ToastrService, private store: Store, private http: HttpClient, private router: Router, private fb: FormBuilder) { }
  

  ngOnInit() {
  }

  submitLoginForm(){
    this.http.post(`${this.baseUrl}user/login`, JSON.stringify(this.loginForm.value), {
      headers:{
        "Accept": "application/json",
        "Content-Type": "application/json"
      }
    }).subscribe(
      (res: any) =>{
        this.payload.email = res.account.email
        this.payload.isLoggedIn = true;
        this.payload.token = res.token;
        this.store.dispatch(authenticateUser({payload: this.payload}))
        this.router.navigateByUrl("/todos");
      },
      (err: any) =>{
        this.router.navigateByUrl("/").then(() => {
          this.toastr.error("Credenciais incorretas");
        });
      }
    )
  }

}
