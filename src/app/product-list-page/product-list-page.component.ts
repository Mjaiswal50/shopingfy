import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { CartsService } from '../services/carts.service';
import { ProductsService } from '../services/products.service';
import { map, tap, take, switchMap, filter } from 'rxjs/operators';
import { AlertingService } from '../services/alerting.service';
/* @ts-ignore */
@Component({
  selector: 'app-product-list-page',
  templateUrl: './product-list-page.component.html',
  styleUrls: ['./product-list-page.component.css']
})
export class ProductListPageComponent implements OnInit, AfterViewInit {
  products: any = [];
  listVar: boolean = true;
  quantityVar: any = 1;
  paginations: any;
  p: number = 1;

  constructor(private httpclient: HttpClient, private productsService: ProductsService, private cartsService: CartsService, private alertingService: AlertingService) {
  }


  ngOnInit(): void {
    this.productsService.products.subscribe((res: any) => {
      this.products = res;
    });
    this.cartsService.fetchCartProducts().subscribe(res => {
    });
  }

  ngAfterViewInit(): void {
    this.productsService.fetchAllProducts().subscribe(() => {
    }
    )

  }


  addToCart(product: any, quantity: any) {
    this.cartsService.disableViewCartBtn.next(false);
    this.alertingService.success("Done ('.')", "Product Successfully Added To Cart", 2);
    setTimeout(() => {
      this.cartsService.disableViewCartBtn.next(true)
    }, 2000);
    /* @ts-ignore */
    this.cartsService.fetchCartProducts().subscribe((res: any) => {
      /* @ts-ignore */
      this.cartsService.addToCart(product, quantity).subscribe((cart: any) => {
      }
      )
    });
    this.quantityVar = 1;
  }

  listViewSet(e: Event) {
    e.preventDefault();
    this.listVar = true;
  }
  gridViewSet(e: Event) {
    e.preventDefault();
    this.listVar = false;
  }





}
