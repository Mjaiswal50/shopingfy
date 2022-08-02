import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { take } from 'rxjs/operators';
import { AlertingService } from '../services/alerting.service';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-nav-page',
  templateUrl: './nav-page.component.html',
  styleUrls: ['./nav-page.component.css']
})
export class NavPageComponent implements OnInit {
  toastVar = false;
  searchForm: FormGroup;
  alertSVar = false;
  alertFVar = true;
  alertMsg = "";
  strongMsg = "";
  constructor(private productsService: ProductsService, private alertingService: AlertingService) {
    this.searchForm = new FormGroup({
      Svalue: new FormControl("", Validators.required)
    })
  }
  searching() {
    var Sfvalue = this.searchForm.value;
    console.log(Sfvalue);
    this.productsService.categoryArray.pipe(take(1)).subscribe(res => {
      let bool = res.includes(Sfvalue.Svalue);
      console.log(bool);
      if (!bool) {
        this.alertingService.error("Opps !", " No Item Found - Try Again", 2)
      }
    })
    this.productsService.filterCategory(Sfvalue.Svalue);
  }
  ngOnInit(): void {
    this.alertingService.tempSToastVar.subscribe(res => {
      console.log(res);
      this.alertSVar = res;
    });
    this.alertingService.tempMsgVar.subscribe(res => {
      console.log(res);
      this.alertMsg = res;
    });
    this.alertingService.tempSmsgVar.subscribe(res => {
      console.log(res);
      this.strongMsg = res;
    });
    this.alertingService.tempFToastVar.subscribe(res => {
      console.log(res);
      this.alertFVar = res;
    });
  }


}
