import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Offer } from 'src/app/models/offer';
import { OfferService } from 'src/app/services/offer.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  offer!: Offer;

  constructor(
    private route: ActivatedRoute,
    private offerService: OfferService
  ) { }

  ngOnInit(): void {
    let id = this.route.snapshot.params.id;
    this.offerService.getOffer(id).subscribe(result => {
      console.log(result);
      this.offer = result;
    });
  }

}
