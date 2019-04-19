import { Messages } from './../interfaces/messages';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private getItemsCollections;
  private addItemsCollections: AngularFirestoreDocument<Messages>;
  public chats: Messages[] = [];

  constructor( private _afs: AngularFirestore) {

  }

  loadMessages() {
    this.getItemsCollections = this._afs.collection<Messages>('chats', ref => ref.orderBy('fecha', 'asc'));

    return this.getItemsCollections.valueChanges().pipe(
      map( (mensajes: any[]) => {
        console.log('mensajes Srv:: ', mensajes);
        this.chats = mensajes;
      }));
  }

  addMessage(msg: any) {
    const m: Messages = {
      nombre: 'DEMO',
      mensaje: msg,
      fecha: new Date().getTime(),
      uid: 'NA'
    };
    console.log('Mensaje enviado Srv:');
    return this._afs.collection('chats').add(m);
  }

}
