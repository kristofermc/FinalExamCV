// Kristofer McCormick 1803203
import { Component, OnInit } from '@angular/core';
import { NavController, ModalController, AlertController } from '@ionic/angular';
import { AuthenticateService } from '../services/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService, Message } from 'src/app/services/message.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss']
})
export class Tab4Page {

  message: Message = {
    name: '',
    contact: '',
    message: '',
  };

  userEmail: string;

  constructor(
    private navCtrl: NavController,
    private authService: AuthenticateService,
    private activatedRoute: ActivatedRoute,
    private messageService: MessageService,
    private toastCtrl: ToastController,
    private router: Router,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {

    if (this.authService.userDetails()) {
      this.userEmail = this.authService.userDetails().email;
    } else {
      this.navCtrl.navigateBack('');
    }
  }

  logout() {
    this.authService.logoutUser()
    .then(res => {
      console.log(res);
      this.navCtrl.navigateBack('');
    })
    .catch(error => {
      console.log(error);
    });
  }
  ionViewWillEnter() {
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.messageService.getMessage(id).subscribe(message => {
        this.message = message;
      });
    }
  }

  addMessage() {
    this.messageService.addMessage(this.message).then(async () => {
      this.router.navigateByUrl('/tabs/tab4');
      const alert = await this.alertCtrl.create({
        header: 'Message Sent!',
        message: 'Thank you for your message!',
        buttons: ['Ok']
      });
      await alert.present();
    }, async err => {
      const alert = await this.alertCtrl.create({
        header: 'Message failed',
        message: 'Your Message was unable to send, please try again.',
        buttons: ['Ok']
    });
  });


}
}

