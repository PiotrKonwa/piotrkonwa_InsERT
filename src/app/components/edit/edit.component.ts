import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Offer } from 'src/app/models/offer';
import { OfferService } from 'src/app/services/offer.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  offer!: Offer;
  categories: any[];
  defaultCategory: number = 1;

  offerForm = this.formBuilder.group({
    category: [''],
    title: [''],
    description: [''],
    price: ['']
  });

  constructor(
    private router: Router,
    private offerService: OfferService,
    private formBuilder: FormBuilder
  ) {
    this.categories = this.router.getCurrentNavigation()?.extras.state?.date.categories;
  }

  ngOnInit(): void {
    this.offerForm = this.formBuilder.group({
      category: this.offer?.category,
      title: this.offer?.title,
      description: this.offer?.description,
      price: this.offer?.price,
    });
    this.offerForm.controls.category.setValue(this.defaultCategory)
  }

  onSubmit() {
    this.offerService.addOffer(this.offerForm.getRawValue());
  }

}
