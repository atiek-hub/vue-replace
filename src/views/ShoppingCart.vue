<template>
    <v-app v-if="cartInItems.length > 0" style="margin-top: 50px;">
      <div class="my-2" style="text-align:center; ">
      <v-btn color="warning" dark @click.prevent="onClickConfirm">注文内容確認</v-btn>
      <h1>合計：{{ totalOrderPrice }}</h1>
      </div>
      <div class="my-2 item_style">
      <v-card  max-width="344" v-for="(cartInItem, index) in cartInItems" :key="index" style="margin:10px">
        <v-img :src="cartInItem.imagePath" height="200px"></v-img>
        <v-card-title>{{ cartInItem.name }}</v-card-title>
        <v-card-subtitle> 単価:{{ cartInItem.price }}円 </v-card-subtitle>
        <v-card-actions>
          <v-btn depressed color="error" text @click="onClickItemDelete(cartInItem.id, index)">削除</v-btn>
          <v-spacer></v-spacer>
          topping
          <v-btn icon type="submit" @click="show = !show">
            <v-icon>{{ show ? "mdi-chevron-up" : "mdi-chevron-down" }}</v-icon>
          </v-btn>
        </v-card-actions>
        <v-expand-transition>
          <div v-show="show">
            <v-divider></v-divider>
            <v-card-text v-for="(topping, index) in cartInItem.toppings" :key="index">
              {{ topping.name }}:¥{{ topping.price }}
            </v-card-text>
          </div>
        </v-expand-transition>
      </v-card>
    </div>
    </v-app>

  <div v-else-if="cartInItems.length === 0">
    <div>
      <v-app>
        <h1 v-cloak style="margin-top: 100px; text-align: center">
          カートに商品がありません。
        </h1>
        <br />
        <h2 style="text-align: center">
          <router-link
            to="/"
            style="margin-right: auto; margin-left: auto; font-size: larger"
            >ホームに戻る</router-link
          >
        </h2>
      </v-app>
    </div>
  </div>
</template>

<script>
import { firestore, projectAuth } from "@/firebase";
export default {
  data() {
    return {
      cartInItems: [],
      show: false,
      totalOrderPrice: 0,
      isOrderShow: true,
    };
  },

  // computed: {
  //   isOrderShow: function () {
  //     if (this.cartInItems.length) {
  //       return false;
  //     } else {
  //       return true;
  //     }
  //   },
  // },

  methods: {
    async onClickItemDelete(id, index) {
      this.cartInItems.splice(index, 1);//(配列の番号、削除したい範囲)
      await firestore.collection("cartInItem").doc(id).delete();
      this.totalOrderPrice = 0;
      this.cartInItems.forEach((cartInItem) => {
        this.totalOrderPrice += cartInItem.totalprice;
      });
    },

    onClickConfirm() {//ボタン押下時にログアウトだとログイン画面に遷移し、登録されている場合、注文確定画面位遷移する。
      projectAuth.onAuthStateChanged((user) => {
        if (!user) {
          this.$router.push("/login-view");
        } else if (user) {
          this.$router.push("/confirm-view");
        } else {
          return;
        }
      });
    },
  },

  mounted: function () {
    firestore
      .collection("cartInItem")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          this.cartInItems.push({ ...doc.data(), id: doc.id }); //dataの中身を展開しcartInItemsに入るitemのidを追加する。そうすることでidによって削除することができる。既にidがあったらidが上書きされる
          this.totalOrderPrice += doc.data().totalprice;
        });
        console.log(this.cartInItems)
      })
      .then(() => {
        if (this.cartInItems.length === 0) {
          return this.isOrderShow === true;
        } else {
          return this.isOrderShow === false;
        }
      })
      .catch((e) => console.log(e));
  },
};
</script>

<style>
[v-cloak] {
  display: none;
}
.item_style{

        display:flex;
        flex-wrap: wrap;
        margin:50px;
}
/* .item_style>* {
  flex: 1%;
    } */
</style>
