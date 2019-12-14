<template>
  <div>
    <div class="card">
      <img class="pasteis-img" src="../assets/images/pasteis-img.png" alt />
      <div class="header">
        <h5 class="title">Monte aqui o seu cardápio. O que está esperando?</h5>
        <div class="switch">
          <span class="mr-2">Comida</span>
          <b-form-checkbox v-model="checked" name="check-button" switch></b-form-checkbox>
          <span>Bebida</span>
        </div>
      </div>
      <div class="form">
        <ValidationObserver v-slot="{ passes, invalid  }">
          <b-form @submit.prevent @reset="onReset">
            <div class="form-group">
              <ValidationProvider
                mode="lazy"
                rules="required|min:3|max:60"
                name="título do pedido"
                v-slot="{ classes, errors }"
                class="form-input"
              >
                <b-form-input
                  @keypress.enter="passes(onSubmit)"
                  v-model="form.titleOrder"
                  :class="classes"
                  placeholder="Título do Pedido"
                ></b-form-input>
                <span class="error">{{ errors[0] }}</span>
              </ValidationProvider>
              <ValidationProvider
                mode="lazy"
                rules="required|min:3|max:60"
                name="sabor"
                v-slot="{ classes, errors }"
                class="form-input"
              >
                <b-form-input
                  @keypress.enter="passes(onSubmit)"
                  v-model="form.taste"
                  :class="classes"
                  placeholder="Sabor"
                ></b-form-input>
                <span class="error">{{ errors[0] }}</span>
              </ValidationProvider>
              <ValidationProvider
                mode="lazy"
                rules="required|numeric"
                name="preço"
                v-slot="{ classes, errors }"
                class="form-input"
              >
                <b-form-input
                  v-model="form.price"
                  type="tel"
                  @keypress.enter="passes(onSubmit)"
                  required
                  placeholder="R$"
                  :class="classes"
                ></b-form-input>
                <span class="error">{{ errors[0] }}</span>
              </ValidationProvider>
            </div>

            <div class="form-group description">
              <b-form-textarea v-model="form.description" placeholder="Descrição"></b-form-textarea>
            </div>
            <vue-dropzone
              class="dropzone"
              ref="Dropzone"
              id="dropzone"
              @vdropzone-success="uploadSuccess"
              :options="dropzoneOptions"
              :useCustomSlot="true"
              v-model="form.img"
            >
              <div class="dropzone-custom-content">
                <h3 class="dropzone-custom-title">
                  <img class="upload-icon" src="../assets/images/upload-icon.svg" alt />
                </h3>
                <div
                  class="subtitle"
                >Jogue aqui o arquivo de imagem do seu pastel ou clique para localizar a pasta.</div>
              </div>
            </vue-dropzone>
            <b-button class="btn btn-reset" type="reset">Limpar</b-button>
            <b-button class="btn btn-submit" @click.prevent="passes(onSubmit)">Cadastrar</b-button>
          </b-form>
        </ValidationObserver>
      </div>
    </div>
  </div>
</template>

<script>
import { ValidationObserver, ValidationProvider } from "vee-validate";
import vue2Dropzone from "vue2-dropzone";
import "vue2-dropzone/dist/vue2Dropzone.min.css";

export default {
  name: "Form",
  components: {
    vueDropzone: vue2Dropzone,
    ValidationObserver,
    ValidationProvider
  },
  props: {
    resetData: {
      type: Boolean
    }
  },
  data() {
    return {
      productType: "Food",
      checked: false,
      form: {
        titleOrder: "",
        taste: "",
        price: "",
        description: "",
        img: "https://via.placeholder.com/150"
      },
      dropzoneOptions: {
        url: "https://api.imgur.com/3/upload",
        thumbnailWidth: 400,
        maxFilesize: 500,
        addRemoveLinks: true,
        acceptedFiles: ".jpg, .png",
        maxFiles: 1,
        autoProcessQueue: false,
        paramName: "image",
        headers: {
          Authorization: "Bearer 71492b24adc48a0a73843f665190e40872511384"
        }
      }
    };
  },
  watch: {
    checked(value) {
      if (value) this.productType = "Drink";
      else this.productType = "Food";
    }
  },
  methods: {
    onSubmit() {
      let count = this.$refs.Dropzone.getAcceptedFiles().length;
      if (count > 0) {
        this.$refs.Dropzone.processQueue();
      } else {
        this.resolverForm();
      }
    },
    onReset() {
      this.form.titleOrder = "";
      this.form.taste = "";
      this.form.price = "";
      this.form.description = "";
      this.$refs.Dropzone.removeAllFiles();
    },
    uploadSuccess(file, response) {
      this.resolverForm(response);
    },
    resolverForm(response = null) {
      this.form.productType = this.productType;

      if (response !== null) this.form.img = response.data.link;

      const formObject = Object.assign({}, this.form);

      this.$emit("pushItems", formObject);
      this.onReset();
    }
  }
};
</script>

<style scoped>
.card {
  width: 100%;
  box-shadow: 0px 0px 15px 5px rgba(0, 0, 0, 0.1);
  border: 0;
  border-radius: 20px;
  z-index: 1;
}
.pasteis-img {
  position: absolute;
  z-index: -1;
  top: -100px;
  right: 0;
  height: 200px;
}
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 30px;
  color: #a03400;
  background-color: #ffca00;
  border-radius: 20px 20px 0 0;
}
.title {
  font: Bold Italic 24px/29px Roboto;
}
.switch {
  display: flex;
}
.form {
  position: relative;
  top: -20px;
}
.form-group {
  display: flex;
  margin-bottom: 20px;
}
.form-group .form-input {
  width: 100%;
  margin: 0 10px;
}
.form-control {
  border-radius: 10px;
  border: 1px solid #e43636;
}
.description {
  margin-left: 10px;
  margin-right: 10px;
}
::-webkit-input-placeholder,
:-ms-input-placeholder,
::-ms-input-placeholde,
:-moz-placeholder,
::placeholder {
  color: #e43636 !important;
  font: Regular 16px/21px Roboto;
}
.dropzone {
  color: #e43636;
  -webkit-transition: background-color 0.2s linear;
  transition: background-color 0.2s linear;
  margin: 0 10px;
  border-radius: 10px;
  border: 1px solid #e43636;
}
.upload-icon {
  width: 50px;
}
.btn {
  bottom: -40px;
  position: relative;
  margin: 0 10px;
  border: 0;
  border-radius: 50px;
  padding: 10px 40px;
  font: Bold 20px/26px Roboto;
}
.btn-reset {
  background-color: #e43636;
  color: white;
}
.btn-submit {
  background-color: #ffca00;
  color: #a03400;
}
.error {
  font-size: 0.876em;
  color: rgb(177, 34, 34);
}
@media screen and (max-width: 425px) {
  .pasteis-img {
    position: absolute;
    z-index: -1;
    top: -100px;
    right: 20px;
    height: 200px;
  }
  .form-group {
    display: block;
    margin-bottom: 20px;
    margin: 10px;
  }
  .header {
    display: block;
  }
  .switch {
    justify-content: center;
  }
}
</style>
