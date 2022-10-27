import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Box} from "../boxes/box";
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {BoxService} from "../box.service";
import {MessageService} from "../message.service";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-box-detail',
  templateUrl: './box-detail.component.html',
  styleUrls: ['./box-detail.component.css']
})
export class BoxDetailComponent implements OnInit {

  //form setup
  detailsForm = this.fb.group({
    name:["filler"],
    colorText:[''],
    color: [""],
    width: [''],
    height: [''],
    depth: [''],
    thickness: [''],
    totalVolume: ['']
  });

  box?:Box;
  snapshot?:Box;
@Input()
set inBox(box: any){
  this.box = box;
  this.fillForm();
  this.snapshot = JSON.parse(JSON.stringify(box))
}

  @Output() cancelEvent = new EventEmitter<Box>();
  // @ts-ignore


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
      // @ts-ignore
      this.detailsForm = this.fb.group({
        name:[this.box.name],
        colorText:[this.box.color],
        color: [this.box.color],
        width: [this.box.width],
        height: [this.box.height],
        depth: [this.box.depth],
        thickness: [this.box.thickness],
        totalVolume: [this.box.totalVolume]
      });
    }
  }

  getBox(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.boxService.getBox(id)
      .subscribe(box => this.box = box);
  }

  save(): void {
    if (this.box) {
      // @ts-ignore
      this.box.name = this.detailsForm.get("name").value;
      // @ts-ignore
      this.box.color = this.detailsForm.get("color").value;
      // @ts-ignore
      this.box.width = this.detailsForm.get("width").value;
      // @ts-ignore
      this.box.height = this.detailsForm.get("height").value;
      // @ts-ignore
      this.box.depth = this.detailsForm.get("depth").value;
      // @ts-ignore
      this.box.totalVolume = this.detailsForm.get("totalVolume").value;
      // @ts-ignore
      this.box.thickness = this.detailsForm.get("thickness").value;
      this.boxService.updateBox(this.box)
        .subscribe();
    }
  }



  updateBox(value: string, colorBox: HTMLInputElement) {
    colorBox.value = value;
  }

  CancelDetails() {
    this.cancelEvent.emit()
  }

}
