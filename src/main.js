//import Vue from 'vue'
import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

import * as firebase from "firebase/app";

import "firebase/auth";
import "firebase/firestore";

import apiKey from '../apiKey'

const firebaseConfig = {
  apiKey,
  authDomain: "atiop-8c255.firebaseapp.com",
  databaseURL: "https://atiop-8c255.firebaseio.com",
  projectId: "atiop-8c255",
  storageBucket: "atiop-8c255.appspot.com",
  messagingSenderId: "880500583039",
  appId: "1:880500583039:web:c0439e9a7b8c970f",
  measurementId: "G-3L9681ZJ5C"
};

firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore();
export const auth = firebase.auth();

let app
firebase.auth().onAuthStateChanged((user) => {

  if (!app) {
    app = createApp(App).use(store).use(router).mount('#app')
  }
  if (user) {
    store.dispatch('getItems', 'napravs')
    store.dispatch('getItems', 'projects')
    store.dispatch('getItems', 'tasks')
  }
})
