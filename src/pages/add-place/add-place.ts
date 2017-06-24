import { Component } from '@angular/core';
import { NgForm } from "@angular/forms";
import { ModalController, ToastController, LoadingController } from "ionic-angular";
import { Geolocation } from '@ionic-native/geolocation';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { SetLocation } from '../set-location/set-location';
import { Location } from '../../models/location';
import { PlacesService } from '../../services/places';

@Component({
  selector: 'page-add-place',
  templateUrl: 'add-place.html',
})
export class AddPlace {
  location: Location = {
    lat: 43.6532,
    lng: -79.3832
  };

  locationIsSet = false;
  imageUrl = '';

  constructor(private modalCtrl: ModalController, public loadingCtrl: LoadingController, private toastCtrl: ToastController, private geolocation: Geolocation, private camera: Camera, private placesService: PlacesService) {}
  onSubmit(form: NgForm) {
    this.placesService.addPlace(form.value.title, form.value.description, this.location, this.imageUrl);
    form.reset();
    this.location = {
    lat: 43.6532,
    lng: -79.3832
  };
  this.imageUrl = '';
  this.locationIsSet = false;
  }
  onOpenMap() {
    const modal = this.modalCtrl.create(SetLocation, {location: this.location, isSet: this.locationIsSet});
    modal.present();
    modal.onDidDismiss(
      data => {
        if (data) {
          this.location = data.location;
          this.locationIsSet = true; 
        }
      }
    );
  }

  onLocate() {
    const loader = this.loadingCtrl.create({
      content: 'Getting your location ...'
    });
    this.geolocation.getCurrentPosition ()
    .then( location => {
        loader.dismiss();
          this.location.lat = location.coords.latitude;
          this.location.lat = location.coords.longitude;
          this.locationIsSet = true;
        }
      )
      .catch(
        error => {
          loader.dismiss();
          const toast = this.toastCtrl.create({
            message: 'Could not get location, pleae pick it manually',
            duration: 2500
          });
          toast.present()
        }
      );
    }

    onTakePhoto() {

      const options: CameraOptions = {
        quality: 100,
        encodingType: this.camera.EncodingType.JPEG,
}
      this.camera.getPicture(options).then((imageData) => {
        this.imageUrl = imageData;
      },
      
      (err) => {
        console.log(err);
      }
      );
    }


  }

 
