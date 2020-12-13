<template>
  <div class="card">
      <p>{{name}}</p>
  </div>
</template>

<script>
export default {
  name: "Day",
  props: {
      id: Number,
      name: String,
      image: String

  }
};
</script>

<style></style>
