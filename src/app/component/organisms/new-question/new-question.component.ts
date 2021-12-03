import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Question} from "../../../model/question/question.model";
import {IQuestionTemplate} from "../../molecules/create-question/create-question.component";

@Component({
  selector: 'app-new-question',
  templateUrl: './new-question.component.html',
  styleUrls: ['./new-question.component.scss']
})
export class NewQuestionComponent implements OnInit {

  @Input() questions: Question[] = [];
  @Output() onCreatedQuestion: EventEmitter<IQuestionTemplate> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

}
