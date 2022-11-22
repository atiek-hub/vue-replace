<template>
  <div>
    <v-app>
    <v-app-bar>
      <img src="../assets/logo.png" alt="" height="30px" width="30px" />
      <router-link to="/">Home</router-link>|
      <router-link to="/shopping-cart">ShoppingCart</router-link>|
      <div v-if="authenticatedUser" v-cloak>ようこそ{{ userName }}さん</div>
      <v-btn
        v-if="authenticatedUser"
        @click="logoutUser"
      >
        ログアウト
      </v-btn>
      <router-link to="/login-view" v-else>ログイン</router-link>
    </v-app-bar>

    <router-view />
  </v-app>
  </div>
</template>

<script>
import { firestore, projectAuth } from "@/firebase";
export default {
  // components: { ItemSearch },
  name: "HeaderView",
  data() {
    return {
      authenticatedUser: true,
      userName: "",
    };
  },

  methods: {
    logoutUser() {
      projectAuth.signOut();
      this.$router.push("/").catch((err) => err);
    },
  },

  created: function () {
    projectAuth.onAuthStateChanged((user) => {
      if (user) {
        this.authenticatedUser = true;
        firestore
          .collection("users")
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              if (doc.data().uid === projectAuth.currentUser.uid) {
                this.userName = doc.data().name;
              }
              // console.log(this.message);
            });
          });
        console.log(this.uid);
      } else {
        // console.log("logout");
        this.authenticatedUser = false;
      }
    });
  },

};
</script>

<style>
[v-cloak] {
  display: none;
}
</style>
