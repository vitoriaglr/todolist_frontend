import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Todo } from 'src/app/models/todo';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-finalized',
  templateUrl: './finalized.component.html',
  styleUrls: ['./finalized.component.css']
})
export class FinalizedComponent implements OnInit {

  listFinished: Todo[] = [];

  constructor(private service: TodoService, private router: Router){}
  
  ngOnInit(): void {
    this.findAll();
  }

  findAll(): void {
    this.service.findAll().subscribe((resposta) => {
      resposta.forEach(todo => {
        if(todo.finished) {
          this.listFinished.push(todo);
        }
      })
    })
  }
  
  voltar(): void {
    this.router.navigate([''])
  }

}
