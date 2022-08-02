import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { async, BehaviorSubject, Observable, throwError } from 'rxjs';
import { tap, take, switchMap, map, catchError, groupBy } from 'rxjs/operators';


interface ProductData {
  id: number;
  description: string;
  image: string;
  price: number;
  title: string;
  category: string;
}
@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private _products = new BehaviorSubject<any[]>([]);
  arr: any = [];
  filtered = false;
  categoryArray = new BehaviorSubject<any>([]);
  constructor(private httpclient: HttpClient) { }
  get products() {
    return this._products.asObservable();
  }
  fetchProducts() {
    return this.httpclient.get("https://onlineshoppingapi-default-rtdb.firebaseio.com/allproducts.json").pipe(map(resData => {
      const products: any = [];
      for (const key of Object.values(resData)) {
        products.push(key);
      }
      console.log("finalproducts", products);
      const groupByCategory = products.reduce((group: any, product: any) => {
        const { category } = product;
        group[category] = group[category] ?? [];
        group[category].push(product);
        return group;
      }, {});
      console.log("groupByCat", Object.keys(groupByCategory));
      this.categoryArray.next(Object.keys(groupByCategory));
      return products;
    }),
      tap(products => {
        console.log("theend", products);
        this._products.next(products);
      })
    );
  }
  addProduct(productDetail: any) {
    console.log("mj1", productDetail);
    console.log("yy", this._products.value.length);
    return this.httpclient.post<any>('https://onlineshoppingapi-default-rtdb.firebaseio.com/allproducts.json',
      { ...productDetail }
    ).pipe(take(1), tap((Newproduct: any) => {
      console.log(Newproduct, "mj2");
      let newId = this._products.value.length + productDetail.category;
      let newProducts = { ...productDetail };
      this.httpclient.put<any>('https://onlineshoppingapi-default-rtdb.firebaseio.com/allproducts/' + Newproduct.name + '.json', { ...newProducts, uid: Newproduct.name, id: newId }
      ).subscribe((res) => {
        console.log("winwin", res);
        this.fetchProducts().subscribe(newProducts => {
          console.log("mj3", newProducts);
          // return this._products.next(newProducts);
        })
      })

    }));
  }

  filterCategory(catName: any) {
    this.fetchProducts().subscribe(res => {
      const groupByCategory = res.reduce((group: any, product: any) => {
        const { category } = product;
        group[category] = group[category] ?? [];
        group[category].push(product);
        return group;
      }, {});
      console.log("groupByCat", (groupByCategory));
      let arrz = Object.keys(groupByCategory);
      for (let categoryz of arrz) {
        if (categoryz == catName) {
          console.log("insides", groupByCategory[categoryz], categoryz);
          this._products.next(groupByCategory[categoryz]);
          console.log("xx");
        }
      }


      this.arr = [];
    })
  }
}
