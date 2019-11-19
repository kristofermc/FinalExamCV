// Kristofer McCormick 1803203
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentReference } from '@angular/fire/firestore';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';

export interface Message {
  id?: string;
  name: string;
  contact: string;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private messages: Observable<Message[]>;
  private messageCollection: AngularFirestoreCollection<Message>;

  constructor(private afs: AngularFirestore) {
    this.messageCollection = this.afs.collection<Message>('Messages');
    this.messages = this.messageCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  getMessages(): Observable<Message[]> {
    return this.messages;
  }

  getMessage(id: string): Observable<Message> {
    return this.messageCollection.doc<Message>(id).valueChanges().pipe(
      take(1),
      map(message => {
        message.id = id;
        return message;
      })
    );
  }

  addMessage(message: Message): Promise<DocumentReference> {
    return this.messageCollection.add(message);
  }

  updateMessage(message: Message): Promise<void> {
    return this.messageCollection.doc(message.id).update({ name: message.name, notes: message.contact });
  }

  deleteMessage(id: string): Promise<void> {
    return this.messageCollection.doc(id).delete();
  }
}
