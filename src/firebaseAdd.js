import {firestore} from "./firebase.js";

const items = async () => {
  // const value = 
  // [{
  //       "id": 1,
  //       "type": "curry",
  //       "name": "カツカレー",
  //       "description": "食べると勝負に勝てると言われる勝つカレー。ラクラクカレー定番の１品です",
  //       "price": 1490,
  //       "imagePath": "/img_curry/1.jpg",
  //       "deleted": false

  // },
  // {
  //   "id": 2,
  //     "type": "curry",
  //     "name": "ポークポークカレー・ミート",
  //     "description": "グリーンアスパラと相性の良いベーコンにいろどりのフレッシュトマトをトッピングし特製マヨソースでまとめた商品です",
  //     "price": 1490,
  //     "imagePath": "/img_curry/2.jpg",
  //     "deleted": false
  // },
  // {
  //   "id": 3,
  //   "type": "curry",
  //   "name": "牛すじカレー",
  //   "description": "トロトロの牛すじとネギの風味が格別な味わいシンプルなカレーです！",
  //   "price": 1490,
  //   "imagePath": "/img_curry/3.jpg",
  //   "deleted": false
  // },
  // {
  //   "id": 4,
  //   "type": "curry",
  //   "name": "味噌カツカレー",
  //   "description": "マイルドな味付けのカレーに大きくカットした味噌カツをのせた、バターとチーズの風味が食欲をそそるお子様でも楽しめる商品です",
  //   "price": 1900,
  //   "imagePath": "/img_curry/4.jpg",
  //   "deleted": false
  // },
  // {
  //   "id": 5,
  //   "type": "curry",
  //   "name": "とんかつカレーラーメン",
  //   "description": "カレーはライスだけではありません。ラクラクピザが開発したカレーラーメンは絶品の美味しさ！",
  //   "price": 1900,
  //   "imagePath": "/img_curry/5.jpg",
  //   "deleted": false
  // },
  // {
  //   "id": 6,
  //   "type": "curry",
  //   "name": "ヒレカツカレー",
  //   "description": "やわらかくあっさりとしたヒレ肉を上質な衣で包み込みました。4種類の濃厚な味わいが一つで楽しめるカレーです",
  //   "price": 2700,
  //   "imagePath": "/img_curry/6.jpg",
  //   "deleted": false
  // },
  // {
  //   "id": 7,
  //   "type": "curry",
  //   "name": "濃厚Gorgeous4",
  //   "description": "こだわりのソースで、旨みとコクを堪能！濃厚Gorgeous4とは、動物由来の原材料を使用していないカレーです。ベジタリアンの方にオススメです",
  //   "price": 2570,
  //   "imagePath": "/img_curry/7.jpg",
  //   "deleted": false
  // },
  // {
  //   "id": 8,
  //   "type": "curry",
  //   "name": "カレーうどん",
  //   "description": "ラクラクカレー自慢のカレーに魚介のダシ、ローストオニオンのコクが加わった絶妙なスープをお楽しみください",
  //   "price": 2160,
  //   "imagePath": "/img_curry/8.jpg",
  //   "deleted": false
  // },
  // {
  //   "id": 9,
  //   "type": "curry",
  //   "name": "Charity4",
  //   "description": "にんにくとトマトの旨みが効いたスパイスカレー。食べると思わず元気が出るラクラクカレーの自信作",
  //   "price": 2700,
  //   "imagePath": "/img_curry/9.jpg",
  //   "deleted": false
  // },
  // {
  //   "id": 10,
  //   "type": "curry",
  //   "name": "ほうれん草のカレードリア",
  //   "description": "カレードリアの王道！ホワイトソースとカレーのダブルソースとなす、ほうれん草、チーズのおいしい組み合わせ",
  //   "price": 2160,
  //   "imagePath": "/img_curry/10.jpg",
  //   "deleted": false
  // },
  // {
  //   "id": 11,
  //   "type": "curry",
  //   "name": "Specialドリア4",
  //   "description": "ホワイトソースとカレーのダブルソースにハンバーグを合わせました",
  //   "price": 2700,
  //   "imagePath": "/img_curry/11.jpg",
  //   "deleted": false
  // },
  // {
  //   "id": 12,
  //   "type": "curry",
  //   "name": "バラエティー４",
  //   "description": "あらびきスライス牛肉とイタリアンチーズを、トマトソースと特製マヨソースの2種類のソースで召し上がって頂く商品です",
  //   "price": 2160,
  //   "imagePath": "/img_curry/13.jpg",
  //   "deleted": false
  // },
  // {
  //   "id": 13,
  //   "type": "curry",
  //   "name": "えびナスカレー",
  //   "description": "デミグラスソースでじっくり煮込んだ旨味たっぷりのえびとナスのカレー",
  //   "price": 2980,
  //   "imagePath": "/img_curry/14.jpg",
  //   "deleted": false
  // }]
  // for(let i = 0; i<value.length;i++){
  //   await firestore.collection("items").add(value[i]);

  // }
  const toppings =[{
    "name": "オニオン",
    "id": 1,
    "price": 100,
    "checked":false
  },
  {
    "name": "チーズ",
    "id": 2,
    "price": 200,
    "checked":false
  },
  {
    "name": "ピーマン",
    "id": 3,
    "price": 100,
    "checked":false
  },
  {
    "name": "ロースハム",
    "id": 4,
    "price": 200,
    "checked":false
  },
  {
    "name": "ほうれん草",
    "id": 5,
    "price": 100,
    "checked":false
  },
  {
    "name": "ナス",
    "id": 6,
    "price": 100,
    "checked":false
  },
  {
    "name": "ソーセージ",
    "id": 7,
    "price": 200,
    "checked":false
  },
  {
    "name": "納豆",
    "id": 8,
    "price": 100,
    "checked":false
  },
  {
    "name": "Lサイズ",
    "id": 9,
    "price": 300,
    "checked":false
  },
  {
    "name": "Lサイズ",
    "id": 10,
    "price": 300,
    "checked": false
  }
]
for(let i = 0; i< toppings.length;i++)
await firestore.collection("topping").add(toppings[i])
};

export default items
