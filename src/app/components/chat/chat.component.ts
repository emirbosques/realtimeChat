import { ChatService } from './../../providers/chat.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  mensajes: any;
  elemento: any;

  constructor(public chatSrv: ChatService) {
  }

  ngOnInit() {
    this.elemento = document.getElementById('app-mensajes');
    this.chatSrv.loadMessages().subscribe(() => {
      setTimeout(() => {
        this.elemento.scrollTop = this.elemento.scrollHeight;
      }, 200);
    }
    );
  }



  sendMessage() {
    console.log('Mensaje::', this.mensajes);
    if (this.mensajes) {
      this.chatSrv.addMessage(this.mensajes)
        .then(() => { console.log('Mensaje Enviado'); this.mensajes = ''; })
        .catch((err) => console.log('Error en envio::', err));
    } else {
      console.log('Msg Vacio...');
      return;
    }

  }

}
