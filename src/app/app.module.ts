import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy, RouterModule } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AngularFireModule } from '@angular/fire/compat';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { SocketIoModule, SocketIoConfig } from 'ng-socket-io';
let config: SocketIoConfig = { url: 'http://localhost:3001', options: {}};

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, RouterModule, IonicModule, AppRoutingModule, SocketIoModule.forRoot(config), provideFirebaseApp(() => initializeApp(environment.firebase)), provideAuth(() => getAuth()), AngularFireModule, provideFirestore(() => getFirestore()), AngularFireAuthModule, AngularFireModule.initializeApp(environment.firebaseConfig)],
  exports: [RouterModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
