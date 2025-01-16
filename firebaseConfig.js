import { initializeApp } from "firebase/app";
import { initializeAuth } from "firebase/auth";
import { getReactNativePersistence } from "firebase/auth/react-native";
import { getStorage } from "firebase/storage";
import AsyncStorage from "@react-native-async-storage/async-storage";

import "firebase/auth";
import "firebase/database";
import "firebase/firestore";
import "firebase/functions";
import "firebase/storage";

import { initializeFirestore } from "firebase/firestore";
import { getFunctions } from "firebase/functions";

const firebaseConfig = {
  apiKey: "AIzaSyCoA5qt1Vxd6Drx0t5CPlYH-DMJYyA5lGM",
  authDomain: "bro-sim.firebaseapp.com",
  projectId: "bro-sim",
  storageBucket: "bro-sim.appspot.com",
  messagingSenderId: "607499588215",
  appId: "1:607499588215:web:b3ce9b2b449baf8378ec72",
  measurementId: "G-HGF46NMVLZ",
};

const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
});

export const functions = getFunctions(app);
export const storage = getStorage(app);
