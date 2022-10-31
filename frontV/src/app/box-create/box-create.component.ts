import {Component, Input, OnInit} from '@angular/core';
import {BoxDto} from "../../interfaces/boxDto";
import {BoxService} from "../../services/box.service";
import {MessageService} from "../../services/message.service";


@Component({
  selector: 'app-box-create',
  templateUrl: './box-create.component.html',
  styleUrls: ['./box-create.component.css']
})
export class BoxCreateComponent implements OnInit {

  constructor(private boxService: BoxService, private messageService: MessageService) { }

  ngOnInit(): void {
  }
test:string ="TTTT";
 boxDto: BoxDto={
    name: "",
    color: "#ff0000",
    width: 0,
    height: 0,
    depth: 0,
    thickness: 0,
    totalVolume: 3
  }

  add(): void {
    //validation?!?!?
    if (this.boxDto){
      this.boxService.addBox(this.boxDto);
    }

  }


  updateBox(value: string, colorBox: HTMLInputElement) {
    colorBox.value = value;
  }

}
