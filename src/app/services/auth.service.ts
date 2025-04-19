import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';
import { UserCredential } from 'firebase/auth'; // <-- Tipo correcto

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: Auth, private firestore: Firestore) {}

  async login(email: string, password: string): Promise<UserCredential> {
    return await signInWithEmailAndPassword(this.auth, email, password);
  }

  async register(email: string, password: string, userData: any): Promise<UserCredential> {
    const credentials = await createUserWithEmailAndPassword(this.auth, email, password);

    // Guardar otros datos en Firestore
    const userRef = doc(this.firestore, `users/${credentials.user.uid}`);
    await setDoc(userRef, userData);

    return credentials;
  }

  async logout(): Promise<void> {
    return await this.auth.signOut();
  }
}
