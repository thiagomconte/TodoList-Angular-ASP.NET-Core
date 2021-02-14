import { Component, OnInit } from '@angular/core';
import jwt_decode from "jwt-decode";
import {FormGroup, FormBuilder} from '@angular/forms';
import { environment } from 'src/environments/environment';
import {HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-Todos',
  templateUrl: './Todos.component.html',
  styleUrls: ['./Todos.component.css']
})
export class TodosComponent implements OnInit {

  token = JSON.parse(localStorage.getItem('auth') || '{}');
  decoded: decodeT = jwt_decode(this.token.token);
  baseUrl = environment.baseUrl;

  todoForm = this.fb.group({
    description: '',
    userId: this.decoded.nameid
  })

  public todos:any = [];

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router,private toastr: ToastrService) { }

  ngOnInit() {
    this.http.get(`${this.baseUrl}todo/getTodosByUserId/${this.decoded.nameid}`).subscribe(
      (res: any) =>{
        this.todos = res
      },
      (err: any) =>{
        console.log(err);
      }
    )
  }

  submitTodoForm(){
    this.http.post(`${this.baseUrl}todo`, JSON.stringify(this.todoForm.value)).subscribe(
      (res: any) =>{
        this.todos.push(res);
        this.router.navigateByUrl('/todos').then(()=>{
          this.toastr.success('Tarefa adicionada');
        });
        this.todoForm.reset({
          description:'',
          userId: this.decoded.nameid
        });
      },
      (err: any) =>{
        this.router.navigateByUrl('/todos').then(()=>{
          this.toastr.error('Erro ao adicionar tarefa');
        });
      }
    )
  }

  deleteTodo(id: string, index: number){
    this.http.delete(`${this.baseUrl}todo/${id}`).subscribe(
      (res: any) =>{
        this.todos.splice(index, 1);
        this.router.navigateByUrl('/todos').then(()=>{
          this.toastr.success('Tarefa removida');
        });
      },
      (err: any) =>{
        this.router.navigateByUrl('/todos').then(()=>{
          this.toastr.error('Erro ao remover tarefa');
        });
      }
    )
  }

}

interface decodeT{
  email: string;
  nameid: number;
}
