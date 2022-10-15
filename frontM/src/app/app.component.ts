import {Component, OnInit} from '@angular/core';
import {HttpService} from "../services/http.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  boxName: string = "";
  boxColor: string = "";
  boxThickness: number= 0;
  boxWidth: number = 0;
  boxDepth: number = 0;
  boxHeight: number = 0;
  boxId: number = -1;
  boxes: any;




  constructor(private http: HttpService) {

  }

  async ngOnInit() {
     const boxes = await this.http.getBoxes();
     console.clear();
     this.boxes = boxes;
  }


  writeBoxName() {
    console.log(this.boxName);
  }

async createBox(){
    let dto = {
      name: this.boxName,
      color: this.boxColor,
      thickness: this.boxThickness,
      width: this.boxWidth,
      depth: this.boxDepth,
      height: this.boxHeight,
      id: this.boxId
    }
    const result = await this.http.createBox(dto);
    this.boxes.push(result)
  }

  // @ts-ignore
  async deleteBox(id: any) {
    //if (confirm('Sure you want to delete')) {
      const box = await this.http.deleteBox(id)
      this.boxes = this.boxes.filter((b: { id: any; }) => b.id != box.id)
      this.boxId = -1
    //} else {
    //  return false;
    //}
  }

  UpdateBoxValues(b: any) {
    this.boxName = b.name;
    this.boxColor = b.color;
    this.boxThickness = b.thickness;
    this.boxWidth = b.width;
    this.boxDepth = b.depth;
    this.boxHeight = b.height;
    this.boxId = b.id;
  }

  async updateBox() {
    let dto = {
      name: this.boxName,
      color: this.boxColor,
      thickness: this.boxThickness,
      width: this.boxWidth,
      depth: this.boxDepth,
      height: this.boxHeight,
      id: this.boxId
    }
    await this.http.editBox(dto);
    await this.ngOnInit();
  }

  // @ts-ignore
  async deleteBoxWithoutId() {
    if (confirm('Sure you want to delete')) {
      const box = await this.http.deleteBox(this.boxId)
      this.boxes = this.boxes.filter((b: { id: any; }) => b.id != box.id)
      this.boxId = -1
    } else {
      return false;
    }  }
}
