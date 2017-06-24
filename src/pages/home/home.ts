import { Component } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { AddPlace } from '../add-place/add-place';
import { PlacesService } from '../../services/places';
import { Place } from '../../models/place';




@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  addPlace = AddPlace;
  places: Place[] = [];

  constructor(public modalCtrl: ModalController, private placesService: PlacesService) {

  }

  ionViewWillEnter () {
    this.places = this.placesService.loadPlaces();
  }

  onOpenPlace(place: Place) {
    const modal = this.modalCtrl.create(Place, {place: place});
    modal.present();
  }

}
