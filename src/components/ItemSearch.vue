<template>
  <v-app>
    <v-toolbar dark color="teal" style="position: fixed; z-index: 3; width: 100%">
    <v-toolbar-title>検索</v-toolbar-title>
    <input
      v-model="keyword"
      :loading="loading"
      cache-items
      class="mx-4"
      flat
      hide-no-data
      hide-details
      label="What do you want to eat?"
      solo-inverted
      style="width:90%;height: 50px; border-radius: 4px; background-color: aliceblue;"
    >
    <v-btn @click="ClickToCancel">キャンセル</v-btn>
  </v-toolbar>
  <div style="display:flex; flex-wrap: wrap;"  class="my-12">
    <v-card v-for="item in filteredItems" :key="item.id"  max-width="374" style="margin:50px;">
      <template slot="progress">
        <v-progress-linear color="deep-purple" height="10" indeterminate ></v-progress-linear>
      </template>
      <v-img height="250" :src="item.imagePath"></v-img>
      <v-card-title>{{ item.name }}</v-card-title>
      <v-card-text>
        <div class="my-4 text-subtitle-1">¥{{ item.price }}</div>
        <div>{{ item.description }}</div>
      </v-card-text>
      <v-divider class="mx-4"></v-divider>
      <v-card-actions>
        <v-btn class="ma-2" depressed color="primary" outlined text @click="showItemDetail(item.id)">
          詳細
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</v-app>
</template>

<script>
import { firestore } from "../firebase.js"; //分割代入
// import AllItems from "@/components/AllItems"
export default {
  components: {
    // AllItems
  },
  data() {
    return {
      itemIndex: -1,
      keyword: "",
      items: [],
    };
  },
  methods: {
    showItemDetail(id) {
      this.itemIndex = id - 1;
      // console.log("詳細",this.itemIndex);
      this.$router.push({
        name: "Item",
        params: {
          id: this.items[this.itemIndex].id,
          name: this.items[this.itemIndex].name,
          description: this.items[this.itemIndex].description,
          imagePath: this.items[this.itemIndex].imagePath,
          price: this.items[this.itemIndex].price,
        },
      });
      // console.log(this.items[this.itemIndex].name)
    },
    ClickToCancel() {
      this.keyword = "";
    },
  },
  computed: {
    filteredItems: function () {
      let resultItems = [];

      for (let i in this.items) {
        let item = this.items[i];
        // console.log("aaa",item.id,item.name);

        if (
          item.name.toLowerCase().indexOf(this.keyword) !== -1 //指定された値が最初に現れたindexを返す。値がない場合、-1を返す
        ) {
          resultItems.push(item);
        }
      }
      //  firestoreが大丈夫か確認する
      // console.log(resultItems);
      return resultItems;
    },
  },
  mounted: function () {
    firestore
      .collection("items")
      .orderBy("id")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // console.log(`${doc.id}=>${doc.data().name}`)
          this.items.push(doc.data());
        });
        // console.log(this.items);
      });
  },
};
</script>
