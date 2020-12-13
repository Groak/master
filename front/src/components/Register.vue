<template>
  <div class="page">
    <div class="w-100 d-flex justify-content-center">
      <div class="login w-80">
        <h1>Register</h1>
        <div class="w-100 d-flex justify-content-center text-left">
          <div>
              <div class="d-flex input">
           <img src="../assets/heart.png" alt=""> <input type="text" v-model="name" placeholder="name"/>
          </div>
          <div class="d-flex input">
           <img src="../assets/user.png" alt=""> <input type="text" v-model="email" placeholder="email"/>
          </div>
          <div class="d-flex input">
            <img src="../assets/lock.png" alt=""><input type="password" v-model="password" placeholder="password" />
          </div>
          <div class="text-right">
              <img @click="register()" src="../assets/arrow.png" alt="">
          </div>
          <p >You want to <router-link to="/login" class="link">connect to your account </router-link>?</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Register",
  title: 'Register',
  data(){
      return{
          email:"",
          password:"",
          name:""
      }
  },
  methods: {
    async register() {
      try {
        const res = await this.$http.post("http://localhost:3000/users", {
          email: this.email,
          password: this.password,
          name: this.name,
          favorites:[],
          budget:0,
          planning: [],
          list: [],
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
input{
    border:none;
    margin-left:10px;
    background-color: #F6E9E6;
    width:250px;
}
img{
    height:25px;
    width:auto;
}
.input{
    background-color:#F6E9E6 ;
    margin-bottom:20px;
    padding: 10px;
    border-radius: 15px;
}
.link{
    color: #CC513F;
    text-decoration: none;
}
.link:hover{
    color:rgb(179, 56, 37);
}
/* visited link */
.link:visited {
    text-decoration:none;
}

/* mouse over link */
.link:hover {
    text-decoration:none;
}

/* selected link */
.link:active {
    text-decoration:none;
}

</style>
