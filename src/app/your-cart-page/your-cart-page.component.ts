import { Component, DoCheck, OnInit } from '@angular/core';
import { CartsService } from '../services/carts.service';

@Component({
  selector: 'app-your-cart-page',
  templateUrl: './your-cart-page.component.html',
  styleUrls: ['./your-cart-page.component.css']
})
export class YourCartPageComponent implements OnInit ,DoCheck{
formvarkey:any;
formvarvalue:any;
objz:any={formkey:"formvalue"};
disableVarCheckout:any=true;
Cno:any;
Cvalue:any;
  constructor(private cartsService:CartsService) { }
  ngDoCheck(): void {
    this.disableVarCheckout = !this.cartsService.DisableBtn.value;
    if (!this.disableVarCheckout) {
      //@ts-ignore
      document.getElementById("vcc").style['pointer-events'] = 'auto';
    } else {
      //@ts-ignore
      document.getElementById("vcc").style['pointer-events'] = 'none';
    }
    this.Cno=this.cartsService.totalCartItems.value;
    this.Cvalue=this.cartsService.totalValue.value;
  }

  ngOnInit(): void {
  
    }
  }


