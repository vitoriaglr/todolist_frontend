import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Todo } from 'src/app/models/todo';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  todo: Todo = {
    id: '',
    title: '',
    description: '',
    deadLine: new Date,
    createdAt: new Date,
    updatedAt: new Date,
    finished: false,
  }

  constructor(private router: Router, private service: TodoService) { }
  
  ngOnInit(): void {
      
  }

  create(): void {
    this.formatDate();
    this.service.create(this.todo).subscribe((resposta) => {
      this.service.message('To-do criado com sucesso!');
      this.router.navigate(['']);
    }, err => {
      this.service.message('Falha ao criar To-do!');
      this.router.navigate(['']);
    })
  }

  cancel(): void {
    this.router.navigate([''])
  }

  formatDate(): void {
    let data = new Date(this.todo.deadLine)
    this.todo.deadLine = `${data.getDate()}/${data.getMonth() + 1}/${data.getFullYear()}`
  }

}
