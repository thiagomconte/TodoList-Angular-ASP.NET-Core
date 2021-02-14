import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-Register',
  templateUrl: './Register.component.html',
  styleUrls: ['./Register.component.css']
})
export class RegisterComponent implements OnInit {

  baseUrl = environment.baseUrl

  registerForm = this.fb.group({
    name: '',
    email: '',
    password: '',
  })

  constructor(private toastr: ToastrService, private fb: FormBuilder, private http: HttpClient, private router: Router) { }


  ngOnInit() {
  }

  submitRegisterForm() {
    if (this.registerForm.value.password.length < 6) {
      this.router.navigateByUrl("/register").then(() => {
        this.toastr.error("Senha deve conter no minimo 6 caracteres");
      });
    } else if (this.registerForm.value.email.length === 0) {
      this.router.navigateByUrl("/register").then(() => {
        this.toastr.error("Email invalido");
      });
    } else {
      this.http.post(`${this.baseUrl}user`, JSON.stringify(this.registerForm.value), {
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        }
      }).subscribe(
        (res: any) => {
          this.router.navigateByUrl("/").then(() => {
            this.toastr.success("Conta criada com sucesso");
          });
        },
        (err: any) => {
          this.router.navigateByUrl("/register").then(() => {
            this.toastr.error("Erro ao criar conta");
          });
        }
      )
    }

  }

}
