import { AlertController } from "@ionic/angular";

export class SendAlert {
  constructor(private alertController: AlertController) {}

  presentAlert = async climate => {
    const alert = await this.alertController.create({
      header: `${climate.data.temperature}Cº`,
      message: `Hoje: ${climate.data.condition} no momento. A humidade está de ${climate.data.humidity}% e a Sensação termica: ${climate.data.sensation}Cº`,
      buttons: ["OK"]
    });
    await alert.present();
  };
}
