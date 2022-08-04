import { Component, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartsService } from '../services/carts.service';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit {
  constructor() {
  }


  ngOnInit(): void {
 
  }
}
