import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Box} from "../../interfaces/box";
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {BoxService} from "../../services/box.service";
import {MessageService} from "../../services/message.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";


@Component({
  selector: 'app-box-detail',
  templateUrl: './box-detail.component.html',
  styleUrls: ['./box-detail.component.css']
})
export class BoxDetailComponent implements OnInit {

  //form setup
  detailsForm = this.fb.group({
    name:[""],
    colorText:[''],
    color: [""],
    width: [''],
    height: [''],
    depth: [''],
    thickness: [''],
    totalVolume: [{value:'', disabled: true,}]
  });

  box?:Box;

@Input()
set inBox(box: any){
  this.box = box;
  this.fillForm();
}

  @Output() cancelEvent = new EventEmitter<Box>();

  constructor(
    private route: ActivatedRoute,
    private boxService: BoxService,
    private location: Location,
    private mess: MessageService,
    private fb: FormBuilder
  ) {
  }


  ngOnInit(): void {
    this.getBox();
  }

  fillForm() {
    if (this.box){
      this.detailsForm.controls['name'].setValue(this.box.name)
      this.detailsForm.controls['color'].setValue(this.box.color)
      this.detailsForm.controls['colorText'].setValue(this.box.color)
      this.detailsForm.controls['width'].setValue(this.box.width +"")
      this.detailsForm.controls['height'].setValue(this.box.height +"")
      this.detailsForm.controls['depth'].setValue(this.box.depth +"")
      this.detailsForm.controls['thickness'].setValue(this.box.thickness +"")
      this.detailsForm.controls['totalVolume'].setValue(this.box.totalVolume +"")
    }
  }

  async getBox(){
    if (this.box){
      const id = Number(this.route.snapshot.paramMap.get('id'));
      this.box = await this.boxService.getBox(id)
    }
  }

  save(): void {
    if (this.box) {
      this.box.name = <string>this.detailsForm.get("name")?.value;
      this.box.color = <string>this.detailsForm.get("color")?.value;
      this.box.width = Number(<string>this.detailsForm.get("width")?.value);
      this.box.height = Number(<string>this.detailsForm.get("height")?.value);
      this.box.depth = Number(<string>this.detailsForm.get("depth")?.value);
      this.box.totalVolume = Number(<string>this.detailsForm.get("totalVolume")?.value);
      this.box.thickness = Number(<string>this.detailsForm.get("thickness")?.value);
      this.boxService.updateBox(this.box)
    }
    this.CancelDetails();
  }

  updateBox(value: string, colorBox: HTMLInputElement) {
    colorBox.value = value;
  }


  CancelDetails() {
    this.mess.add("Cancel clicked")
    this.cancelEvent.emit()
  }

}
