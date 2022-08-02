import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductsService } from '../services/products.service';
import { take } from 'rxjs/operators';
import { AlertingService } from '../services/alerting.service';
@Component({
  selector: 'app-shop-by-category-page',
  templateUrl: './shop-by-category-page.component.html',
  styleUrls: ['./shop-by-category-page.component.css']
})
export class ShopByCategoryPageComponent implements OnInit {
  @Input() showFormVar: any;
  productSubmitForm: any;
  categories: any = "";
  oldCategory = "reset";
  constructor(private productsService: ProductsService, private alertingService: AlertingService) {
  }
  callPostApi() {

    if (!!this.productSubmitForm.value.image) {
      let arr = this.productSubmitForm.value.image.split(".");
      if (arr[1] == "jpeg") {
        if (!!this.productSubmitForm.value.title) {
          if (!!this.productSubmitForm.value.description) {
            if (!!this.productSubmitForm.value.price) {
              if (!!this.productSubmitForm.value.category) {
                this.productsService.addProduct(this.productSubmitForm.value).subscribe((res) => {
                  console.log(res, "callapi");
                  this.productSubmitForm.patchValue({
                    image: "",
                    title: "",
                    description: "",
                    price: "",
                    category: ""
                  });
                })
              } else {
                this.alertingService.error("Error", "Product Category Is Required", 3);

              }

            } else {
              this.alertingService.error("Error", "Product Price Is Required", 3);

            }

          } else {
            this.alertingService.error("Error", "Product Description Is Required", 3);

          }

        } else {
          this.alertingService.error("Error", "Product Name Is Required", 3);

        }
      } else {
        this.alertingService.error("Please !", "insert valid image url.", 3);

      }

    } else {
      this.alertingService.error("Error", "Product Image Url Is Required", 3);

    }



    console.log("productFormValue()", this.productSubmitForm.value);
  }
  ngOnInit(): void {
    this.productSubmitForm = new FormGroup({
      image: new FormControl(null, [Validators.required]),
      title: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required]),
      price: new FormControl(null, [Validators.required]),
      category: new FormControl(null, [Validators.required])
    });
    this.productsService.categoryArray.subscribe(res => {
      this.categories = res;
    });
    console.log("xmx", this.categories);
  }
  callProductFilter(catNamez: any) {
    if (this.oldCategory !== catNamez) {
      this.productsService.filterCategory(catNamez);
      this.oldCategory = catNamez;
    }
  }
}
