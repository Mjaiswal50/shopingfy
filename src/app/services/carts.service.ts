import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map, tap, take, switchMap, filter } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class CartsService {
  encryptName: any;
  flag = false;
  private _cartProducts = new BehaviorSubject<any[]>([]);
  oldCartProduct: any;
  incrProduct: any;
  DisableBtn: any = new BehaviorSubject<any>(true);
  totalValue: any = new BehaviorSubject<any>(0);
  totalCartItems: any = new BehaviorSubject<any>(0);
  constructor(private httpClient: HttpClient) {
  }

  get cartProducts() {
    return this._cartProducts.asObservable();
  }
  // @ts-ignore: Object is possibly 'null'.
  addToCart(product: any, nValue: any) {
    this.flag = true;
    console.log("direct", this._cartProducts.value);
    for (let key of this._cartProducts.value) {
      if (key.title == product.title) {
        this.flag = false;
        let nq = key.quantity + nValue;
        this.incrProduct = { ...key, quantity: nq };
        this.httpClient.put<any>('https://onlineshoppingapi-default-rtdb.firebaseio.com/carts/' + key.uid + '.json', this.incrProduct
        ).pipe(take(1)).subscribe(res => {
          console.log("in");
          return this.fetchProductsFromCart();
        })
      }
    }
    if (this.flag) {
      return this.httpClient.post<any>('https://onlineshoppingapi-default-rtdb.firebaseio.com/carts.json', product
      ).pipe(take(1), tap((NewproductName: any) => {
        return this.fetchProductsFromCart().subscribe(oldProducts => {
          let numz = oldProducts.length - 1;
          let newProducts = oldProducts[numz];
          console.log("ColdProducts", oldProducts);
          this.httpClient.put<any>('https://onlineshoppingapi-default-rtdb.firebaseio.com/carts/' + NewproductName.name + '.json', { ...newProducts, uid: NewproductName.name, quantity: nValue }
          ).subscribe((res) => {
            console.log("winwin", res);
            let totalCheckoutPrice = 0;
            for (let p of this._cartProducts.value) {
              if (!p.quantity) {
                totalCheckoutPrice += p.price * res.quantity;
              } else {
                totalCheckoutPrice += p.price * p.quantity;
              }
            }
            this.totalValue.next(totalCheckoutPrice);
          })
        })
      }));
    }



  }


  fetchProductsFromCart() {
    return this.httpClient.get<any>('https://onlineshoppingapi-default-rtdb.firebaseio.com/carts.json').pipe(
      map(resData => {
        const cartProducts: any = [];
        if (resData) {
          for (const value of Object.values(resData)) {
            cartProducts.push(value);
          }
        }

        console.log("finalcartproducts", cartProducts);
        return cartProducts;
      }),
      tap(cartProducts => {
        console.log("hardz", cartProducts);
        let totalCheckoutPrice = 0;
        for (let p of cartProducts) {
          totalCheckoutPrice += p.price * p.quantity;
        }
        this.totalValue.next(totalCheckoutPrice);
        this.totalCartItems.next(cartProducts.length);
        this._cartProducts.next(cartProducts);
      })
    );
  }

  incrCartItem(item: any) {
    let newItem = { ...item, quantity: item.quantity + 1 }
    return this.httpClient.put<any>('https://onlineshoppingapi-default-rtdb.firebaseio.com/carts/' + newItem.uid + '.json', newItem
    )

  }
  decrCartItem(item: any) {
    let newItem = { ...item, quantity: item.quantity - 1 }
    return this.httpClient.put<any>('https://onlineshoppingapi-default-rtdb.firebaseio.com/carts/' + newItem.uid + '.json', newItem
    )
  }


  deleteProductFromCart(deletedItemName: any) {
    return this.httpClient
      .delete(
        `https://onlineshoppingapi-default-rtdb.firebaseio.com/carts/${deletedItemName}.json`
      ).pipe(switchMap((res): any => {
        return this.cartProducts
      }), take(1), map((cartProducts: any) => {
        this._cartProducts.next(cartProducts.filter((b: any) => b.uid !== deletedItemName))
      }), tap((res) => {
        this.fetchProductsFromCart().subscribe();
      }))
  }
}
