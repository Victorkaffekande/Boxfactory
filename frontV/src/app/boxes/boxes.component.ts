import {Component, OnInit} from '@angular/core';
import {Box} from "../../interfaces/box";
import {BoxService} from "../../services/box.service";
import {MessageService} from "../../services/message.service";


@Component({
  selector: 'app-boxes',
  templateUrl: './boxes.component.html',
  styleUrls: ['./boxes.component.css']
})
export class BoxesComponent implements OnInit {

  boxes: Box[] = [];
  selectedBox?: Box;

  constructor(private boxService: BoxService,
              private messageService: MessageService
  ) {
  }

  ngOnInit(): void {
    this.getBoxes();
  }

  async getBoxes() {
   this.boxes = await this.boxService.getBoxes();
  }

  delete(box: Box): void {
    if (confirm("Are you sure you want to delete " + box.name + "?")) {
      this.boxes = this.boxes.filter(b => b !== box);//fjerner boxen fra den lokale liste
      this.boxService.deleteBox(box.id)//fjerner boxen fra Databasen
    }
  }

  onEdit(box: Box) {
    if (!this.selectedBox){
      this.selectedBox = box;
    }
    else if (confirm("Do you want to continue without saving?")){
      this.selectedBox = box;
    }

  }

  test(box: Box) {
    this.nullSelectedBox(box)

  }
  nullSelectedBox(value: Box) {
    this.selectedBox = undefined;
  }
}
