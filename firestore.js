import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js"
import { addDoc, collection, deleteDoc, doc, getDoc, getFirestore, onSnapshot, updateDoc} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js"


const firebaseConfig = {
    apiKey: "AIzaSyA0CCldY5AnBUZlI0U9x34K68DZ9BN-zR0",
    authDomain: "lolxd-e9008.firebaseapp.com",
    projectId: "lolxd-e9008",
    storageBucket: "lolxd-e9008.appspot.com",
    messagingSenderId: "447559854875",
    appId: "1:447559854875:web:52af216c447627da2841be"
};

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export const save = (jugador) => {
  addDoc(collection(db, 'Jugador'), jugador)
}

export const getData = (data) => {
  onSnapshot(collection(db, 'Jugador'), data)
}

export const remove = (id) => {
  deleteDoc(doc(db, 'Jugador', id))
}

export const getDocumento = (id) => getDoc(doc(db, 'Jugador', id))

export const update = (id,Jug) =>{
  updateDoc(doc(db,'Jugador',id),Jug)
}
