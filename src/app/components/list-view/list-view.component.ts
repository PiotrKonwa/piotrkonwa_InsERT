import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category';
import { Offer } from 'src/app/models/offer';
import { OfferService } from 'src/app/services/offer.service';

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.scss']
})
export class ListViewComponent implements OnInit {

  offers!: Offer[];
  categories!: Category[];
  selectedValue!: Category

  constructor(private offerService: OfferService) { }

  ngOnInit(): void {
    this.getOffers();
    this.getCategories();
  }

  getOffers() {
    this.offerService.getOffers().subscribe(result => {
      this.offers = result;
    })
  }

  getCategories() {
    this.offerService.getCategory().subscribe(result => {
      this.categories = result;
      this.fillCategoryId();
    })
  }

  categoryChanged() {
    if (this.selectedValue.id != undefined) {
      this.offerService.filterOffers(this.selectedValue.id).subscribe(result => {
        console.log("categoryChanged", result);
        this.offers = result;
      });
    } else {
      this.getOffers();
    }
  }

  fillCategoryId() {
    for (let offer of this.offers) {
      for (let category of this.categories) {
        if (offer.category_name == category.name) {
          category.id = offer.category;
        }
      }
    }
  }

  deleteOffer(id: number) {
    this.offerService.deleteOffer(id).subscribe(resposne => {
      this.ngOnInit();
    });
  }
}
