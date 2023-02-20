import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Todo } from 'src/app/models/todo';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  todo: Todo = {
    id: '',
    title: '',
    description: '',
    deadLine: new Date,
    createdAt: new Date,
    updatedAt: new Date,
    finished: false,
  }

  constructor(private router: Router, private service: TodoService, private route: ActivatedRoute) { }
  
  ngOnInit(): void {
    this.todo.id = this.route.snapshot.paramMap.get("id")!;
    this.findById();
  }

  findById(): void {
    this.service.findById(this.todo.id).subscribe((resposta) => {
      this.todo = resposta;
    })
  }

  update(): void {
    this.formatDate();
    this.service.update(this.todo).subscribe((resposta) => {
      this.service.message('Informações atualizadas com sucesso!');
      this.router.navigate(['']);
    }, err => {
      this.service.message('Falha ao atualizar To-do!');
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
