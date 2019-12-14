<template>
  <div class="home">
    <div class="hero"></div>
    <div class="container">
      <img class="logo" src="../assets/images/Logo.svg" alt />
      <Form @pushItems="addItems"></Form>
    </div>
    <div class="div" v-if="productItems.length !== 0">
      <h5 class="text-div">Veja como será apresentado ao cliente</h5>
    </div>
    <div class="container">
      <ProductItem :items="productItems"></ProductItem>
    </div>
  </div>
</template>

<script>
import Form from "@/components/Form.vue";
import ProductItem from "@/components/ProductItem.vue";

export default {
  name: "home",
  components: {
    Form,
    ProductItem
  },
  data() {
    return {
      productItems: [],
      clean: false
    };
  },
  methods: {
    addItems(item) {
      this.productItems.push(item);
      this.clean = true;
    }
  }
};
</script>

<style scoped>
/* .home {
  background: url("../assets/images/pattern-1.png");
  width: 100vw;
  height: 100%;
} */
.hero {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100vh;
  background-image: url("../assets/images/wave.svg");
  background-repeat: no-repeat;
  background-size: contain;
}
.logo {
  position: relative;
  width: 400px;
  margin: 40px;
}
.div {
  position: relative;
  height: 1px;
  width: 100%;
  border: 1px solid #a03400;
  margin: 7rem 0;
  display: flex;
  justify-content: center;
}
.text-div {
  position: absolute;
  bottom: -18px;
  padding: 0 15px;
  color: #a03400;
  background-color: white;
  font: Bold Italic 24px/29px Roboto;
}
</style>