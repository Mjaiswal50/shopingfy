import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PaginationService {
  getPosts() {
    throw new Error('Method not implemented.');
  }
  private url = 'http://jsonplaceholder.typicode.com/posts';

  constructor(private httpClient: HttpClient) { }

  getPost() {
    return this.httpClient.get(this.url);
  }
  }
