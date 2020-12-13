<template>
  <div class="page">
    <div class="w-100 d-flex justify-content-center">
      <div class="login w-80">
        <h1>Login</h1>
        <div class="w-100 d-flex justify-content-center text-left">
          <div>
            <div class="d-flex input">
              <img src="../assets/user.png" alt="" />
              <input type="text" v-model="email" placeholder="email" />
            </div>
            <div class="d-flex input">
              <img src="../assets/lock.png" alt="" /><input
                type="password"
                v-model="password"
                placeholder="password"
              />
            </div>
            <div class="text-right">
              <router-link to="/favorites" v-if="logged"
                >
                <img src="../assets/arrow.png" alt="" />

                </router-link>
              <img v-else @click="login()" src="../assets/arrow.png" alt="" />
              
            </div>
            <p>
              You want to
              <router-link to="/register" class="link"
                >create an account </router-link
              >?
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  title: 'Login',
  data() {
    return {
      email: "",
      password: "",
      id: "",
      logged:false
    };
  },
  methods: {
    async login() {
        try {
        const res = await this.$http.get("http://localhost:3000/users");
        var user = res.data.find(e => {
          return e.email == this.email && e.password == this.password
        });
        console.log(user)
        if (!user) {
          console.log('wrong info!')
          return(false)
        } else {
          this.logged = true
          this.session(user)
          return(true)
        }
      } catch (error) {
        console.log(error);
      }
      },
    async session(user) {
      try {
        const res = await this.$http.post("http://localhost:3000/logged", {
          user
        });
        console.log(res.data);
      } catch (error) {
        this.logged = true;
        console.log(error.res.status);
      }
    },
  },
};
</script>

<style>
input {
  border: none;
  margin-left: 10px;
  background-color: #f6e9e6;
  width: 250px;
}
img {
  height: 25px;
  width: auto;
}
.input {
  background-color: #f6e9e6;
  margin-bottom: 20px;
  padding: 10px;
  border-radius: 15px;
}
.link {
  color: #cc513f;
  text-decoration: none;
}
.link:hover {
  color: rgb(179, 56, 37);
}
/* visited link */
.link:visited {
  text-decoration: none;
}

/* mouse over link */
.link:hover {
  text-decoration: none;
}

/* selected link */
.link:active {
  text-decoration: none;
}
</style>
