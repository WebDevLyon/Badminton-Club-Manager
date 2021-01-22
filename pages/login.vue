<template>
  <div>
    <form @submit.prevent="userLogin">
      <div>
        <label>Username</label>
        <input v-model="login.username" type="text">
      </div>
      <div>
        <label>Password</label>
        <input v-model="login.password" type="text">
      </div>
      <div>
        <button type="submit">
          Submit
        </button>
        <p>{{ this.$auth.loggedIn }}</p>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      login: {
        username: 'nijlak',
        password: '123'
      }
    }
  },
  methods: {
    userLogin () {
      this.$auth.loginWith('local', { data: this.login })
        .then(resp => console.log(resp))
    }
  }
}
</script>
