import {Component, OnInit} from '@angular/core';
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
  selectedBox?: Box;

  constructor(private boxService: BoxService,
              private messageService: MessageService
  ) {
  }

  ngOnInit(): void {
    this.getBoxes();
  }

  getBoxes(): void {
    this.boxService.getBoxes()
      .subscribe(boxes => this.boxes = boxes);
  }

  delete(box: Box): void {
    if (confirm("Are you sure you want to delete " + box.name + "?")) {
      this.boxes = this.boxes.filter(b => b !== box);//fjerner boxen fra den lokale liste
      this.boxService.deleteBox(box.id).subscribe();//fjerner boxen fra Databasen
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

  resetBoxInfo() {

  }

  nullSelectedBox(value: Box) {
    this.selectedBox = undefined;
  }
}
