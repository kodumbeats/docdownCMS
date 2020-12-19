<template>
  <div class="login is-flex is-justify-content-center">
    <form @submit.prevent="login">
      <div class="field">
        <label class="label">Email</label>
        <div class="control">
          <input
            v-model="email"
            class="input"
            type="email"
            placeholder="example@email.addr"
          />
        </div>
      </div>

      <div class="field">
        <label class="label">Password</label>
        <div class="control">
          <input
            v-model="password"
            class="input"
            type="password"
            placeholder="a_$ecUre*pAssw0r6"
          />
        </div>
      </div>
      <button class="button is-primary">Login</button>
    </form>
  </div>
</template>
<script>
import * as Appwrite from "appwrite";

export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    login() {
      const { apiEndpoint, apiProject } = this.$store.getters.getApiUrl;
      const appwrite = new Appwrite()
        .setEndpoint(apiEndpoint)
        .setProject(apiProject);
      Object.assign(this, { appwrite });

      this.appwrite.account
        .createSession(this.email, this.password)
        .then(res => {
          this.$router.push("/edit");
        })
        .catch(err => console.log(err.message));
    }
  }
};
</script>
