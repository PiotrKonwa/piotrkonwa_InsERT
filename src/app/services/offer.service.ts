import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Offer } from '../models/offer';

@Injectable({
  providedIn: 'root'
})
export class OfferService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  baseApiUrl = "https://backend-recruitment-api.herokuapp.com/";

  constructor(private http: HttpClient) { }

  getOffers(): Observable<any> {
    return this.http.get(this.baseApiUrl + "offers");
  }

  getCategory(): Observable<any> {
    return this.http.get(this.baseApiUrl + "category");
  }

  getOffer(id: number): Observable<any> {
    return this.http.get(this.baseApiUrl + "offers/" + id);
  }

  filterOffers(category: number): Observable<any> {
    return this.http.get(this.baseApiUrl + "offers/?category=" + category)
  }

  addOffer(offer: Offer) {
    const body = {
      category: offer.category,
      title: offer.title,
      description: offer.description,
      price: offer.price
    }

    return this.http.post<any>(this.baseApiUrl + "offers/", body, this.httpOptions)
      .subscribe(resposne => {
        console.log(resposne)
      })
  }

  deleteOffer(id: number) {
    return this.http.delete(this.baseApiUrl + "offers/" + id, this.httpOptions);
  }
}
