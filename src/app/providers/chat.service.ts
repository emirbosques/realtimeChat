import { Messages } from './../interfaces/messages';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private getItemsCollections;
  private addItemsCollections: AngularFirestoreDocument<Messages>;
  public chats: Messages[] = [];
  public userData: any = {};

  constructor(private _afs: AngularFirestore, public _afAuth: AngularFireAuth) {

    this._afAuth.authState.subscribe(user => {
      console.log('Data User Logged:', user);
      if (user) {
        this.userData.displayName = user.displayName;
        this.userData.uid = user.uid;
        this.userData.avatar = user.photoURL;

        console.log('UserData :: ', this.userData);
      }

    });

  }

  loadMessages() {
    this.getItemsCollections = this._afs.collection<Messages>('chats', ref => ref.orderBy('fecha', 'asc'));

    return this.getItemsCollections.valueChanges().pipe(
      map((mensajes: any[]) => {
        console.log('mensajes Srv:: ', mensajes);
        this.chats = mensajes;
      }));
  }

  addMessage(msg: any) {
    const m: Messages = {
      nombre: this.userData.displayName,
      mensaje: msg,
      fecha: new Date().getTime(),
      uid: this.userData.uid,
      avatar: this.userData.avatar
    };
    console.log('Mensaje enviado Srv:');
    return this._afs.collection('chats').add(m);
  }

  loginFireAuth(prov: string) {
    if (prov === 'google') {
      console.log('Login Google Service');
      this._afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
    } else {
      this._afAuth.auth.signInWithPopup(new auth.TwitterAuthProvider());
      console.log('Login Twitter Service');
    }
  }

  logoutFireAuth() {
    this.userData = {};
    this._afAuth.auth.signOut();
    console.log('User logged out OK');
  }

}
