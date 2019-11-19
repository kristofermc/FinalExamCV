// Kristofer McCormick 1803203
import { Component } from '@angular/core';

import { Platform, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthenticateService } from './services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  public appPage = [
    {
      title: 'About',
      url: '/tabs/tab1',
      icon: 'ios-contact'
    },
    {
      title: 'Portfolio',
      url: '/tabs/tab2',
      icon: 'ios-apps'
    },
    {
      title: 'Skills',
      url: '/tabs/tab3',
      icon: 'ios-finger-print',
    },
    {
      title: 'Contact',
      url: '/tabs/tab4',
      icon: 'ios-chatbubbles'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public navCtrl: NavController,
    private authService: AuthenticateService,
  ) {

    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  logout() {
    this.authService.logoutUser()
    .then(res => {
      console.log(res);
      this.navCtrl.navigateBack('');
    });
  }
}
