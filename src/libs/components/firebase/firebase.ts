import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
// Firebaseの設定用のインターフェースを定義
interface FirebaseConfig {
    apiKey: string;
    authDomain: string;
    projectId: string;
    storageBucket: string;
    messagingSenderId: string;
    appId: string;
    measurementId: string;
}

// 貴様のFirebaseプロジェクトの設定
const firebaseConfig: FirebaseConfig = {
    apiKey: "AIzaSyBZX81kZARtJg-f1IITNK8uzQ8Fc5Sifzc",
    authDomain: "tesns-d6403.firebaseapp.com",
    projectId: "tesns-d6403",
    storageBucket: "tesns-d6403.appspot.com",
    messagingSenderId: "98753278260",
    appId: "1:98753278260:web:717cfc3c1b8bd5bc553561",
    measurementId: "G-2SBL6XH0G8"
};

const app = initializeApp(firebaseConfig);

// Authオブジェクトを取得
export const auth = getAuth(app);
export const firestore = getFirestore(app);
export const storage = getStorage(app);