import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { Http,Headers } from '@angular/http';
import { AngularFireAuth } from 'angularfire2/auth';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
url:string;
data:string;
movieName:string;
  constructor(private afauth: AngularFireAuth, private toast: ToastController,public http:Http,
    public navCtrl: NavController) {

  }
  ionViewWillLoad() {
    this.afauth.authState.subscribe(data => {
      if (data && data.email && data.uid) {
        this.toast.create({
          message: 'Welcome to APP_NAME,${data.email}',
          duration: 3000
        }).present();
      }
      else {
        if (data && data.email && data.uid) {
          this.toast.create({
            message: 'Could not find user',
            duration: 3000
          }).present();
        }
      }
    });

  }

  ionViewDidLoad(){
    this.loadUser();
  }
  loadUser(){  
    this.http.get('http://www.omdbapi.com/?t=dhoom+3+3&plot=full&apikey=7ab0ab15')
    .map(res=>res.json())
    .subscribe(data=>{
      this.data=data.results;
      console.log(data.results);
    },err=>{
      console.log(err);
    });
  }

}
