import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AlertingService } from '../services/alerting.service';
import { CartsService } from '../services/carts.service';

@Component({
  selector: 'app-shopping-cart-items',
  templateUrl: './shopping-cart-items.component.html',
  styleUrls: ['./shopping-cart-items.component.css']
})
export class ShoppingCartItemsComponent implements OnInit, AfterViewInit {
  cartItems: any;
  numz: any;
  totalCheckoutPrice: any = 0;
  disableVar: any = true;
  constructor(private cartsService: CartsService, private alertingService: AlertingService) { }

  ngOnInit(): void {
    this.cartsService.cartProducts.subscribe(res => {
      this.cartItems = res;
      this.totalCheckoutPrice = 0;
      for (let p of res) {
        this.totalCheckoutPrice += p.price * p.quantity;
      }
      this.totalCheckoutPrice = (this.totalCheckoutPrice);
      if (this.totalCheckoutPrice == 0) {
        this.disableVar = true;
      } else {
        this.disableVar = false;
      }
    });
    if (this.cartItems.length == 0) {
      this.alertingService.error("HEY !!!", "Your Cart Is EMPTY", 4);
    }
  }
  ngAfterViewInit() {
    this.cartsService.fetchCartProducts().subscribe(res => {
    });
  }
  inc(item: any) {
    this.cartsService.incrCartItem(item).subscribe(res => {
      this.cartsService.fetchCartProducts().subscribe();
    })
  }
  dec(item: any) {
    this.cartsService.decrCartItem(item).subscribe(res => {
      this.cartsService.fetchCartProducts().subscribe();
    })
  }
  deleteItem(uid: any) {
    this.cartsService.deleteProductFromCart(uid).subscribe(res => {
      this.alertingService.success("HEY !", "Your item deleted successfully", 4);
    }
    )

  }
}