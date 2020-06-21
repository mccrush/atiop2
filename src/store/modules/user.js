import { auth } from "@/main.js";
import { db } from "@/main.js";

export default {
  state: {
    user: null
  },
  mutations: {
    logIn(state) {
      state.user = {
        uid: auth.currentUser.uid,
        email: auth.currentUser.email,
        name: auth.currentUser.name,
      }
    },
    logOut(state) {
      state.user = null;
    }
  },
  actions: {
    regist({ commit }, { email, password }) {
      auth.createUserWithEmailAndPassword(email, password).then(() => {
        // Add new user in userc collections
        db.collection("users").doc(auth.currentUser.uid).set({}).then(function () {
          const ref = db.collection("users").doc(auth.currentUser.uid)
          ref.collection("napravs").doc().set({})
          ref.collection("projects").doc().set({})
          ref.collection("tasks").doc().set({})
          //console.log("Коллекции успешно созданы");
        })
          .catch(function (error) {
            console.error("Ошибка при создании коллекций: ", error);
          });
      }).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.error("regist: errors:", errorCode, "& ", errorMessage);
      });
    },
    logIn({ commit }, { email, password }) {
      auth
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          commit('logIn')
        })
        .catch(function (error) {
          var errorCode = error.code;
          var errorMessage = error.message;
          console.error("Login: errors:", errorCode, "& ", errorMessage);
        });
    },
    logOut({ commit }) {
      auth
        .signOut()
        .then(() => {
          commit('logOut')
        })
        .catch(function (error) {
          console.error("logOut: errors:", error);
        });
    }
  },
  getters: {
    user: state => state.user
  }
}