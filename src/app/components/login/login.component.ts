import { ChatService } from './../../providers/chat.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor( private chstSrv: ChatService ) { }

  ngOnInit() {
  }

loginChat( prov: string) {
  console.log('Login::', prov);
  this.chstSrv.loginFireAuth(prov);
}



}
