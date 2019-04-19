import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  mensajes: any;

  constructor() { }

  ngOnInit() {
  }

  sendMessage() {
    console.log('Mensaje::', this.mensajes);
  }

}
