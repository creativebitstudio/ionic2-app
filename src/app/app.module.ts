import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Geolocation } from '@ionic-native/geolocation';
import { Camera} from '@ionic-native/camera';
import { PlacesService } from '../services/places';
// add google maps support module
import { AgmCoreModule } from '@agm/core';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AddPlace } from '../pages/add-place/add-place';
import { Place } from '../pages/place/place';
import { SetLocation } from '../pages/set-location/set-location';





@NgModule({
  declarations: [
    MyApp,
    HomePage,
    AddPlace,
    Place,
    SetLocation
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    // to configure, set up the api key and get google maps to work on app
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCOsJwlse0JyINuVR06N0X9fgq-yxoRZpQ' 
    }) 
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    AddPlace,
    Place,
    SetLocation
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    Camera,
    PlacesService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
