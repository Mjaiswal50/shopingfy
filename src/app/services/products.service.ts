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
  fetchAllProducts() {
    return this.httpclient.get("https://onlineshoppingapi-default-rtdb.firebaseio.com/allproducts.json").pipe(map(resData => {
      const products: any = [];
      for (const key of Object.values(resData)) {
        products.push(key);
      }
      const groupByCategory = products.reduce((group: any, product: any) => {
        const { category } = product;
        group[category] = group[category] ?? [];
        group[category].push(product);
        return group;
      }, {});
      this.categoryArray.next(Object.keys(groupByCategory));
      return products;
    }),
      tap(products => {
        this._products.next(products);
      })
    );
  }
  addProduct(productDetail: any) {
    return this.httpclient.post<any>('https://onlineshoppingapi-default-rtdb.firebaseio.com/allproducts.json',
      productDetail 
    ).pipe( tap((Newproduct: any) => {
      let newId = this._products.value.length + productDetail.category;
      let newProducts = { ...productDetail };
      // ADD UID AND UPDATE ADDED PRODUCT
      this.httpclient.put<any>('https://onlineshoppingapi-default-rtdb.firebaseio.com/allproducts/' + Newproduct.name + '.json', { ...newProducts, uid: Newproduct.name, id: newId }
      ).subscribe((res) => {
        // UPDATE LATEST PRODUCT IN MAIN ARRAY
        this.fetchAllProducts().subscribe(() => {
        
        })
      })

    }));
  }

  filterCategory(catName: any) {
    this.fetchAllProducts().subscribe(res => {
      const groupByCategory = res.reduce((group: any, product: any) => {
        const { category } = product;
        group[category] = group[category] ?? [];
        group[category].push(product);
        return group;
      }, {});
      let arrz = Object.keys(groupByCategory);
      for (let categoryz of arrz) {
        if (categoryz == catName) {
          this._products.next(groupByCategory[categoryz]);
        }
      }


      this.arr = [];
    })
  }
}
