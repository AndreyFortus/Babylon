import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TaskTextService {

  tasks: string[] = [];

  constructor() { }

  setTasks(value: string []) {
    console.log(value);
    this.tasks = value;
  }

  getTasks() {
    return this.tasks;
  }
}
