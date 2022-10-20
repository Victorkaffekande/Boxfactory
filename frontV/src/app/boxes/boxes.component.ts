import { Component, OnInit } from '@angular/core';
import {BOXES} from "../mock-boxes";
import {Box} from "./box";
import {BoxService} from "../box.service";
import {MessageService} from "../message.service";

@Component({
  selector: 'app-boxes',
  templateUrl: './boxes.component.html',
  styleUrls: ['./boxes.component.css']
})
export class BoxesComponent implements OnInit {

  boxes: Box[] = [];

  constructor(private boxService: BoxService,
              private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.getBoxes();
  }

  getBoxes(): void{
    this.boxService.getBoxes()
      .subscribe(boxes => this.boxes = boxes);
  }
}
