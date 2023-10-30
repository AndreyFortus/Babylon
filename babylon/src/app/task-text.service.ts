import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TaskTextService {

  tasks: string[] = [];

  constructor() { }

  setAdditionalValue(value: string []) {
    console.log(value);
    this.tasks = value;
  }

  getAdditionalValue() {
    return this.tasks;
  }
}
