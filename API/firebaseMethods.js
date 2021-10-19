import * as firebase from 'firebase';
import 'firebase/firestore';


export async function registration(email, password, lastName, firstName, telefone, date, empresa) {
  try {
    
    await firebase.auth().createUserWithEmailAndPassword(email, password);
    const currentUser = firebase.auth().currentUser;

    const db = firebase.firestore();
    db.collection('users')
      .doc(currentUser.uid)
      .set({
        email: currentUser.email,
        lastName: lastName,
        firstName: firstName,
        telefone: telefone,
        data: date,
        empresa: empresa
      });
  } catch (err) {
  }
}

export async function signIn(email, password) {
  try {
    await firebase
      .auth()
      .signInWithEmailAndPassword(email, password);
  } catch (err) {
  }
}

export async function loggingOut() {
  try {
    await firebase.auth().signOut();
  } catch (err) {
  }
}

export async function addCollectPoint(nome, tipoResiduos, localizacao) {
  try{

    const currentUser = firebase.auth().currentUser;
    const db = firebase.firestore();
    db.collection('collectPoints/' + currentUser.uid)
    .set({ 
      nome: nome,
      tipoResiduos: tipoResiduos,
      localizacao: localizacao
    })
  }catch(err) {
  }
}

