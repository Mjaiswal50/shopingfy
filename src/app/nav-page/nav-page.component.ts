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
  searchForm: FormGroup;
  alertSuccess = false;
  alertFailure = true;
  lightMsg = "";
  strongMsg = "";
  constructor(private productsService: ProductsService, private alertingService: AlertingService) {
    this.searchForm = new FormGroup({
      Svalue: new FormControl("", Validators.required)
    })
  }
  searching() {
    this.productsService.categoryArray.pipe(take(1)).subscribe(res => {
      let bool = res.includes(this.searchForm.value.Svalue);
      if (!bool) {
        this.alertingService.error("Opps !", " No Item Found - Try Again", 2)
      }
    })
    this.productsService.filterCategory(this.searchForm.value.Svalue);
  }
  ngOnInit(): void {
    this.alertingService.tempSToastVar.subscribe(res => {
      this.alertSuccess = res;
    });
    this.alertingService.tempMsgVar.subscribe(res => {
      this.lightMsg = res;
    });
    this.alertingService.tempSmsgVar.subscribe(res => {
      this.strongMsg = res;
    });
    this.alertingService.tempFToastVar.subscribe(res => {
      this.alertFailure = res;
    });
  }


}
