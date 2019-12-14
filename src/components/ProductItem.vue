<template>
  <div>
    <section v-if="items.length !== 0">
      <div class="row product-box mb-5" :key="index" v-for="(product, index) in items">
        <div class="col-1 product-img">
          <img :src="product.img" />
        </div>
        <div class="col">
          <div class="card">
            <div class="header">
              <h5 class="title">"{{ product.titleOrder }}"</h5>
              <h5 class="price">R${{ product.price }}</h5>
            </div>
            <div class="product-content">
              <h5>
                <b>Sabor:</b>
                {{ product.taste }}
              </h5>
              <h5>
                <b>Sabor:</b>
                {{ product.description }}
              </h5>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "ProductItem",
  props: {
    items: {
      type: Object | Array
    }
  }
};
</script>

<style scoped>
.product-box {
  display: flex;
}
.card {
  width: 100%;
  box-shadow: 0px 0px 15px 5px rgba(0, 0, 0, 0.1);
  border: 0;
  border-radius: 20px;
  color: #a03400;
  height: 100%;
  z-index: 0;
}
.product-img {
  z-index: 1;
}
img {
  width: 200px;
}
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
  color: #ffca00;
  background-color: #e43636;
  border-radius: 20px 20px 0 0;
}
.title {
  font: Bold Italic 30px/37px Roboto;
  margin-left: 80px;
  margin-bottom: 0;
}
.price {
  font: Bold Italic 26px/32px Roboto;
  margin: 0 20px;
  color: white;
}
.product-content {
  text-align: left;
  margin: 20px 100px;
}
</style>
