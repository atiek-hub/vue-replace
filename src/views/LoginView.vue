<template>
  <div style="margin-top: 100px">
    <h1 style="text-align: center">Login</h1>
    <v-app>
    <validation-observer ref="observer" v-slot="{ invalid }">
      <form
        @submit.prevent="loginUser"
        style="width: 40%; margin-left: auto; margin-right: auto"
      >
        <validation-provider
          v-slot="{ errors }"
          name="loginEmail"
          rules="required|email"
        >
          <v-text-field
            v-model="loginEmail"
            :error-messages="errors"
            label="E-mail"
            required
          ></v-text-field>
        </validation-provider>
        <validation-provider
          v-slot="{ errors }"
          name="loginPassword"
          rules="required"
        >
          <v-text-field
            type="password"
            v-model="loginPassword"
            :error-messages="errors"
            label="Password"
            required
          ></v-text-field>
        </validation-provider>

        <v-btn class="mr-4" type="submit" :disabled="invalid"> Login </v-btn>
        <v-btn @click="clear"> clear </v-btn>
      </form>
    </validation-observer>
    <p style="text-align: center">
      Need an account?
      <router-link to="/create-user">Register Here</router-link>
    </p>
  </v-app>
  </div>
</template>

<script>
import { projectAuth } from "../firebase.js";
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
      loginEmail: "",
      loginPassword: "",
    };
  },

  methods: {
    loginUser() {
      projectAuth
        .signInWithEmailAndPassword(this.loginEmail, this.loginPassword)
        .then(() => {
          this.$router.push("/").catch(err => err)
        })
        .catch(() => {
          alert("正しいメールアドレスとパスワードを入力してください。");
        });
    },
    clear() {
      (this.loginEmail = ""), (this.loginPassword = "");
    },
  },
};
</script>

<style></style>
