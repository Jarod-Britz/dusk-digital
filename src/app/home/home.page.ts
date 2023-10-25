import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Socket } from 'ng-socket-io';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  nickname = '';
  message: string = '';
  user:any
  constructor(public route:Router, public authService:AuthenticationService, public socket: Socket, public navCtrl: NavController) {
    this.user = authService.getProfile()
    console.log(this.user);

  }

  async logout() {
    this.authService.signOut().then(() => {
      this.route.navigate(['/landing'])
    }).catch((error) => {
      console.log(error);
    })
  }

  sendMessage() {
    this.socket.emit("Message", {message: this.message});
  }

  // joinChat() {
  //   this.socket.connect();
  //   this.socket.emit('set-nickname', this.nickname);
  //   this.navCtrl.navigateForward('ChatRoomPage', {state: { nickname: this.nickname }})
  // }
}
