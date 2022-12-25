<template>
  <v-app style="margin-top:10px;">
  <v-card
    :loading="loading"
    class="mx-auto my-12"
    style="margin-top: 200px; width: 80%"
    
  >
    <template slot="progress">
      <v-progress-linear
        color="deep-purple"
        height="10"
        indeterminate
      ></v-progress-linear>
    </template>

    <img :src="imagePath" alt="" height="300" />

    <v-card-title style="font-size: 30px">{{ name }}</v-card-title>

    <v-card-text>
      <br />
      <div style="font-size: 25px">
        ¥{{ price }}
      </div>
      <br />
      <div style="font-size: 25px">
        {{ description }}
      </div>
    </v-card-text>

    <v-divider class="mx-4"></v-divider>
    <li v-for="topping in toppings" :key="topping.id" style="list-style:none; margin-left:10px;">
      <input
        @change="addToppingPrice"
        v-model="topping.checked"
        :id="topping.id"
        type="checkbox"
        :value="topping.name"
      />
      <label :for="topping.id" style="font-size:20px;">{{ topping.name }}</label>
      &nbsp;<span style="font-size:20px;">¥{{topping.price}}</span>
    </li>
    <div style="font-size:20px; margin-left:10px;">合計{{ totalprice }}</div>
    <v-card-actions>
      <v-btn color="deep-purple lighten-2" text @click="onClickInShoppingcart">
        カートに入れる
      </v-btn>
    </v-card-actions>
  </v-card>
</v-app>
</template>

<script>
import { firestore } from "../firebase.js";
export default {
  data(){
    return{
    toppings: [],
    totalprice:Number(this.price),
    loading: false,
    selection: 1,
  }
},
  props: {
    id: Number,
    name: String,
    imagePath: String,
    description: String,
    price: Number,
  },
  methods: {
    addToppingPrice() {
      this.checkedToppingList = this.toppings.filter(
        (topping) => topping.checked === true
      );
      let toppingPrice = 0;
      this.checkedToppingList.forEach((checkedTopping) => {
        toppingPrice += checkedTopping.price;
      });
      this.totalprice = this.price + toppingPrice;
    },
     async onClickInShoppingcart() {
      this.loading = true;
      setTimeout(() => (this.loading = false), 3000);
      console.log(this.id);
       await firestore.collection("cartInItem").add({
        name: this.name,
        imagePath: this.imagePath,
        price: this.price,
        totalprice: this.totalprice,
        toppings: this.checkedToppingList || "",
      });
      this.$router.push("/");
    },
  },
  mounted: 
  function () {
    firestore
      .collection("topping")
      .orderBy("id")
      .get()
      .then((querySnapshot) =>
        querySnapshot.forEach((doc) => this.toppings.push(doc.data()))
      );
    // console.log(this.toppings);
  },
};
</script>

<style></style>
