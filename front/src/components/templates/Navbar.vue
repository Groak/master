@@ -0,0 +1,182 @@
<template>
  <div
    class="nav"
    :style="[
      clicked
        ? { 'background-color': 'white' }
        : { 'background-color': 'rgba(255, 255, 255, 0.774)' },
    ]"
  >
    <div class="container-fluid">
      <div class="row">
        <div class="col-3 d-flex justify-content-start">
           <router-link to="/">
          <img src="./logo.png" alt="logo" class="navlogo" />
           </router-link>
        </div>
        <div class="col-6 ">
          <div class="searchbar d-flex">
            <img src="./search.png" alt="" @click="clicked = !clicked" />
            <div class="options w-100 text-left">
              <select
                v-model="selectedFacilitiesSelectedValues"
                multiple="multiple"
                class="selected_options"
              >
                <option
                  class="d-inline-block"
                  v-for="facility in selectedFacilities"
                  v-bind:value="facility.value"
                  :key="facility.value + 2"
                  @click.prevent="removeFacilities"
                  >{{ facility.text }}</option
                >
              </select>
            </div>
          </div>
          <div v-if="clicked" class="d-flex justify-content-start">
            <div class="available d-flex justify-content-between w-100">
              <div>
                <p class="text-left">diet</p>
                <select
                  v-model="availableFacilitiesSelectedValues"
                  multiple="multiple"
                  class="available_options"
                >
                  <option
                    v-for="facility in availableFacilities"
                    v-bind:value="facility.value"
                    :key="facility.value + 1"
                    @click.prevent="addFacilities"
                    >{{ facility.text }}</option
                  >
                </select>
              </div>
              <div>
                <button @click="search()">Rechercher</button>
              </div>
            </div>
          </div>
        </div>
        <div class="col-3 d-flex justify-content-around icons">
          <router-link to="/favorites">
          <img src="./heart.png" alt="" />
          </router-link>
          <router-link to="/calendar">
          <img src="./cal.png" alt="" />
          </router-link>
          <router-link to="/login">
          <img src="./user.png" alt="" />
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Navbar",
  data() {
    return {
      clicked: false,
      availableFacilities: [
        {
          value: 1,
          text: "vegetarian",
        },
        {
          value: 2,
          text: "gluten-free",
        },
        {
          value: 3,
          text: "sugar-free",
        },
         {
          value: 4,
          text: "no-oven",
        }
      ],
      selectedFacilities: [],
      availableFacilitiesSelectedValues: [],
      selectedFacilitiesSelectedValues: [],
    };
  },
  methods: {
    move(value, arrFrom, arrTo) {
      var index = arrFrom.findIndex(function(el) {
        return el.value == value;
      });
      var item = arrFrom[index];

      arrFrom.splice(index, 1);
      arrTo.push(item);
    },
    addFacilities() {
      var selected = this.availableFacilitiesSelectedValues.slice(0);

      for (var i = 0; i < selected.length; ++i) {
        this.move(
          selected[i],
          this.availableFacilities,
          this.selectedFacilities
        );
      }
    },
    removeFacilities() {
      var selected = this.selectedFacilitiesSelectedValues.slice(0);

      for (var i = 0; i < selected.length; ++i) {
        this.move(
          selected[i],
          this.selectedFacilities,
          this.availableFacilities
        );
      }
    },
    search(){
      var criteria = []
      this.selectedFacilities.forEach(e => {
        criteria.push(e.text)
      });
      criteria = criteria.join('+')
      console.log(this.selected)
      console.log(criteria)
      window.location.replace("http://localhost:8080/#/recipes/search/"+criteria);
      window.focus()
    }
  },
};
</script>

<style>
.nav {
  height: auto;
  width: 100vw;
  padding: 0px 10px 10px 10px;
}
.selected_options {
  border: none;
  height: 30px;
  display: inline-block;
  background-color: rgba(255, 255, 255, 0);
}
.selected_options option {
  background-color: #f6e9e6;
  padding: 2px 10px 2px 10px;
  border-radius: 15px;
  margin-left: 10px;
  color: #cc513f;
}
.options {
  margin-top: 10px;

  overflow-x: scroll;

  overflow-y: hidden;
  white-space: nowrap;
}
.options::-webkit-scrollbar {
  display: none;
}
.searchbar {
  border-bottom: 2px solid black;
  margin-top: 15px;
}
.searchbar img {
  height: 20px;
  width: auto;
  margin-top: 10px;
}
.available p {
  margin: 10px 0px 0px 0px;
  font-weight: bold;
}
.available_options {
  border: none;
  background-color: rgba(255, 255, 255, 0);
}
.navlogo {
  height: 60px;
  width: auto;
  margin-top: 5px;
}
.icons img {
  height: 20px;
  width: auto;
  margin: 10px 0px 0px 30px;
}
</style>
