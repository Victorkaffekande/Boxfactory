import { Component, OnInit } from '@angular/core';
import {BoxDto} from "../boxes/boxDto";
import {BoxService} from "../box.service";
import {MessageService} from "../message.service";

@Component({
  selector: 'app-box-create',
  templateUrl: './box-create.component.html',
  styleUrls: ['./box-create.component.css']
})
export class BoxCreateComponent implements OnInit {

  constructor(private boxService: BoxService, private messageService: MessageService) { }

  ngOnInit(): void {
  }


  add(name: string, color: string, width: string, depth: string, height: string, thickness: string): void {
    //validation?!?!?
    const boxDto: BoxDto = {
      name: name,
      color: color,
      width: parseInt(width),
      height: parseInt(height),
      depth: parseInt(depth),
      thickness: parseInt(thickness),
      totalVolume: +width * +height * +depth
    }

    this.boxService.addBox(boxDto)
      .subscribe();
  }


  updateBox(value: string, colorBox: HTMLInputElement) {
    colorBox.value = value;
  }

}
