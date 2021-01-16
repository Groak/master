<template>
  <div class="page">
    <div class="container d-flex justify-content-around w-90 main-title">
      <div class="hometitle">
        <img src="../assets/logo.png" alt="" class="logo" />
        <p><span>easy</span> cooking</p>
      </div>
      <img src="../assets/assiette.png" alt="" class="assiette" />
    </div>
    <div class="container page-section">
      <div class="row">
        <div class="col-4 d-none d-md-block">
          <img src="../assets/plat1.png" alt="" class="stock-image" />
        </div>
        <div class="col-12 col-md-8">
          <div class="title">
            <div class="title-name text-left">
              <p>Welcome back !</p>
            </div>
            <div class="number text-left">01</div>
          </div>
          <div class="text-left">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
            eleifend enim a ipsum faucibus tempus. Aenean ut molestie nibh, in
            pellentesque purus. Suspendisse gravida dolor metus, vitae
            consectetur mi facilisis quis. Integer ut pharetra dolor.
          </div>
        </div>
      </div>
    </div>
    <div class="container  page-section">
      <div class="row">
        <div class="col-12 col-md-8">
          <div class="title">
            <div class="title-name text-left">
              <p>What is groak ?</p>
            </div>
            <div class="number text-left">02</div>
          </div>
          <div class="text-left">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
            eleifend enim a ipsum faucibus tempus. Aenean ut molestie nibh, in
            pellentesque purus. Suspendisse gravida dolor metus, vitae
            consectetur mi facilisis quis. Integer ut pharetra dolor.
            <br />
            <br />
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
            eleifend enim a ipsum faucibus tempus. Aenean ut molestie nibh, in
            pellentesque purus. Suspendisse gravida dolor metus, vitae
            consectetur mi facilisis quis. Integer ut pharetra dolor.
          </div>
        </div>
        <div class="col-4 d-none d-md-block">
          <img src="../assets/assiettes.png" alt="" class="stock-image" />
        </div>
      </div>
    </div>
    <div class="w-100 d-flex justify-content-center">
        <div class="title">
            <div class="title-name text-left">
              <p>Need inspo ?</p>
            </div>
            <div class="number text-left">03</div>
          </div>
    </div>
    <carousel class="carousel" :perPage=3>
        <slide v-for="(n, i) in 10" :key="i+1">
            <img src="../assets/cake.png" alt="">
        </slide>

    </carousel>

  </div>
</template>

<script>
export default {
  name: "Home",
  title: "Home",
  components: {},
};
</script>

<style>
.carousel{
    margin-top:30px;
}
.main-title {
  margin-bottom: 100px;
}
.page-section {
  margin-bottom: 30px;
}
.title {
  position: relative;
  font-family: "Merienda", cursive;
  min-width:200px;
}
.title-name {
  position: absolute;
  margin-top: 35px;
  margin-left: 25px;
  top: 0;
  left: 0;
  z-index: 3;
  height: 100%;
  width: 100%;
  font-size: 20px;
}
.stock-image {
  width: 200px;
  height: auto;
}
.number {
  z-index: 0;
  font-size: 60px;
  color: #ebdac8;
}

.page {
  background-image: url("../assets/background/home-bg.png");
  min-height: 100vh;
  background-size: cover;
  background-repeat: no-repeat;
  padding-top: 100px;
}
.logo {
  height: 230px;
  width: auto;
  z-index: 1;
}
.assiette {
  z-index: 0;
  height: 200px;
  width: auto;
  position: relative;
  top: 60px;
  right: 60px;
  filter: drop-shadow(30px -10px 0px #f6e9e6);
}
.hometitle span {
  color: #e98d4e;
}
.hometitle {
  font-size: 50px;
}
</style>
