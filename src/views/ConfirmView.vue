<template>
    <v-app>
    <div>
    <h1 style="text-align:center; margin-top:50px;">ご注文確認</h1>
    <br>
    <div style="display:flex; flex-wrap: wrap;">
      <v-card max-width="344" v-for="(confirmItem, index) in confirmItems" :key="index" style="margin:10px">
        <v-img :src="confirmItem.imagePath" height="200px"></v-img>
        <v-card-title>
          {{ confirmItem.name }}
        </v-card-title>
        <v-card-subtitle> 単価:{{ confirmItem.price }}円 </v-card-subtitle>
        <v-card-actions>
          <v-spacer></v-spacer>
          topping
          <v-btn icon type="submit" @click="show = !show">
            <v-icon>{{ show ? "mdi-chevron-up" : "mdi-chevron-down" }}</v-icon>
          </v-btn>
        </v-card-actions>
        <v-expand-transition>
          <div v-show="show">
            <v-divider></v-divider>
            <v-card-text v-for="(topping, index) in confirmItem.toppings" :key="index">
              {{ topping.name }}:¥{{ topping.price }}
            </v-card-text>
          </div>
        </v-expand-transition>
      </v-card>
    </div>

    <br/>
    <h1 style="text-align:center">合計金額</h1>
    <h1 style="text-align:center">¥{{ confirmTotalPrice }}(税抜)</h1>
    <v-form v-model="valid">
      <v-container>
        <v-row>
          <v-col cols="12" md="3">
            <v-text-field
              v-model="deliveryName"
              :rules="nameRules"
              :counter="10"
              label="Name"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="3">
            <v-text-field
              v-model="deliveryPhone"
              :rules="nameRules"
              :counter="10"
              label="Phone Number"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="3">
            <v-text-field
              v-model="deliveryEmail"
              :rules="emailRules"
              label="E-mail"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="3">
            <v-text-field type="date" label="Date" required></v-text-field>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
    <div style="text-align:center; margin-top:10px;">
    <v-btn
      class="ma-2"
      color="success"
      @click="onClickConfirm"
    >
    注文を確定する
      <template v-slot:loader>
        <span>Loading...</span>
      </template>
    </v-btn>
  </div>
  </div>
</v-app>
</template>

<script>
import { firestore, projectAuth } from "@/firebase";
export default {
  data() {
    return {
      confirmItems: [],
      show: false,
      confirmTotalPrice: 0,
      tax: 0,
      deliveryName: "",
      deliveryPhone: "",
      deliveryEmail: "",
      uid: "",
      valid: false,
      nameRules: [
        (v) => !!v || "Name is required",
        (v) => v.length <= 10 || "Name must be less than 10 characters",
      ],
      deliveryemail: "",
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+/.test(v) || "E-mail must be valid",
      ],
      picker: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
    };
  },
  methods: {
    onClickConfirm() {
      this.confirmItems.forEach((aaa) => {
        firestore.collection("cartInItem").doc(aaa.id).delete();
      });

      this.$router.push("/thankyou-view");
    },
  },
  mounted: function () {
    firestore
      .collection("cartInItem")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          this.confirmItems.push({ ...doc.data(), id: doc.id });
          this.confirmTotalPrice += doc.data().totalprice;
          this.tax += this.confirmTotalPrice * 0.1;
        });
        // console.log(this.confirmItems);
      });
    firestore
      .collection("users")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          console.log("aaa", doc.data().uid);
          if (this.uid === doc.data().uid) {
            this.deliveryName = doc.data().name;
            this.deliveryPhone = doc.data().phoneNumber;
            this.deliveryEmail = doc.data().email;
          }
        });
      });
  },

  created: function () {
    projectAuth.onAuthStateChanged((user) => {
      if (user) {
        this.uid = projectAuth.currentUser.uid;
        console.log(this.uid);
      }
    });
  },
};
</script>
<style>
</style>
