import {Component, OnInit, Input} from '@angular/core';
import {Box} from "../boxes/box";
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {BoxService} from "../box.service";

@Component({
  selector: 'app-box-detail',
  templateUrl: './box-detail.component.html',
  styleUrls: ['./box-detail.component.css']
})
export class BoxDetailComponent implements OnInit {

  @Input() box?: Box;

  constructor(
    private route: ActivatedRoute,
    private boxService: BoxService,
    private location: Location
  ) {
  }

  ngOnInit(): void {
    this.getBox();
  }

  getBox(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.boxService.getBox(id)
      .subscribe(box => this.box = box);
  }
  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (this.box){
      this.boxService.updateBox(this.box)
        .subscribe(()=>this.goBack())
    }
  }
}
