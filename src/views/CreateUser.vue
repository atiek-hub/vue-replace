<template>
  <div class="display_down">
    <h1 style="text-align: center">Register a membership</h1>
    <template>
      <v-app>
      <validation-observer ref="observer" v-slot="{ invalid }">
        <form @submit.prevent="registerUser" class="form_style">
          <validation-provider
            v-slot="{ errors }"
            name="Name"
            rules="required|max:10"
          >
            <v-text-field
              v-model="name"
              :counter="10"
              :error-messages="errors"
              label="Name"
              required
            ></v-text-field>
          </validation-provider>
          <validation-provider
            v-slot="{ errors }"
            name="phoneNumber"
            :rules="{
              required: true,
              regex: '^(71|72|74|76|81|82|84|85|86|87|88|89)\\d{5}$',
            }"
          >
            <v-text-field
              v-model="phoneNumber"
              :error-messages="errors"
              label="Phone Number"
              required
            ></v-text-field>
          </validation-provider>
          <validation-provider
            v-slot="{ errors }"
            name="email"
            rules="required|email"
          >
            <v-text-field
              v-model="email"
              :error-messages="errors"
              label="E-mail"
              required
            ></v-text-field>
          </validation-provider>
          <validation-provider
            v-slot="{ errors }"
            name="zipcode"
            rules="required"
            style="display: flex"
          >
            <v-text-field
              v-model="zipcode"
              :error-messages="errors"
              label="Zipcode"
              data-vv-name="Zipcode"
              required
            ></v-text-field
            ><v-btn
              type="button"
              @click="fetchAddress"
              style="margin-top: 13px; margin-left: 10px"
              >検索</v-btn
            >
          </validation-provider>
          <validation-provider
            v-slot="{ errors }"
            name="address"
            rules="required"
          >
            <v-text-field
              v-model="address"
              :error-messages="errors"
              label="Address"
              data-vv-name="Address"
              required
            ></v-text-field>
          </validation-provider>
          <validation-provider
            v-slot="{ errors }"
            name="password"
            rules="required"
          >
            <v-text-field
              type="password"
              v-model="password"
              :error-messages="errors"
              label="Password"
              data-vv-name="Password"
              required
            ></v-text-field>
          </validation-provider>
          <validation-provider
            v-slot="{ errors }"
            name="confirmpassword"
            rules="required"
          >
            <v-text-field
              type="password"
              v-model="confirmpassword"
              :error-messages="errors"
              label="Confirm Password"
              data-vv-name="Confirm Password"
              required
            ></v-text-field>
          </validation-provider>

          <v-btn class="mr-4" type="submit" :disabled="invalid"> submit </v-btn>
          <v-btn @click="clear"> clear </v-btn>
        </form>
      </validation-observer>
    </v-app>
    </template>
  </div>
</template>
<script>
import { firestore, projectAuth } from "../firebase.js";
import { required, digits, email, max, regex } from "vee-validate/dist/rules";
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode,
} from "vee-validate";
setInteractionMode("eager");

extend("digits", {
  ...digits,
  message: "{_field_} needs to be {length} digits. ({_value_})",
});

extend("required", {
  ...required,
  message: "{_field_} can not be empty",
});

extend("max", {
  ...max,
  message: "{_field_} may not be greater than {length} characters",
});

extend("regex", {
  ...regex,
  message: "{_field_} {_value_} does not match {regex}",
});

extend("email", {
  ...email,
  message: "Email must be valid",
});
export default {
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  data() {
    return {
      name: "",
      phoneNumber: "",
      email: "",
      zipcode: "",
      address: "",
      password: "",
      confirmpassword: "",
    };
  },

  methods: {
    registerUser() {
      projectAuth
        .createUserWithEmailAndPassword(this.email, this.password)
        .then((result) => {
          const user = result.user;
          if (user) {
            const uid = user.uid;
            const userInitialData = {
              customer_id: "",
              role: "customer",
              payment_method_id: "",
              uid: uid,
              name: this.name,
              email: this.email,
              phoneNumber: this.phoneNumber,
              zipcode: this.zipcode,
              address: this.address,
            };
            firestore.collection("users").doc(uid).set(userInitialData);
            this.$router.push("/");
          }
        });
    },

    clear() {
      this.name = "";
      this.phoneNumber = "";
      this.email = "";
      this.zipcode = "";
      this.address = "";
      this.password = "";
      this.confirmpassword = "";
      this.$refs.observer.reset();
    },
    fetchAddress() {
      fetch(`https://zipcloud.ibsnet.co.jp/api/search?zipcode=${this.zipcode}`)
        .then((res) => res.json())
        .then((data) => {
          const results =
            data.results[0].address1 +
            data.results[0].address2 +
            data.results[0].address3;
          this.address = results;
        });
    },
  },
};
</script>
<style>
.display_down {
  margin-top: 100px;
}
.form_style {
  width: 40%;
  display: block;
  margin-left: auto;
  margin-right: auto;
  margin-top: 20px;
}
</style>
