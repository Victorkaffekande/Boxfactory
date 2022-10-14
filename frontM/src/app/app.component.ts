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
      height: this.boxHeight
    }
    const result = await this.http.createBox(dto);
    this.boxes.push(result)
  }

  async deleteBox(id: any) {
    const box = await this.http.deleteBox(id)
    this.boxes = this.boxes.filter((b: { id: any; }) => b.id != box.id)
  }
}
