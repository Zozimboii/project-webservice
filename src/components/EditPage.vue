<template>
  <div class="edit-container">
    <div class="edit-form1">
      <table class="edit-table">
        <thead class="edit-head">
          <tr class="edit-tr">
            <th class="th00">Food Image</th>
            <th class="th11">Food ID</th>
            <th class="th22">Food Name</th>
            <th class="th33">Description</th>
            <th class="th44">Price</th>
            <th class="th55">Category</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="food in foods" :key="food.foodId" class="edit-tr">
            <td class="td55">
              <img
                :src="`http://localhost:3000/img_fd/${food.foodId}.jpg`"
                alt=""
                style="width: 100px; height: 100px"
              />
            </td>
            <td class="td00">{{ food.foodId }}</td>
            <td class="td11">{{ food.foodName }}</td>
            <td class="td22">{{ food.description }}</td>
            <td class="td33">{{ food.price }}</td>
            <td class="td44">{{ food.category }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="edit-form2">
      <div class="edit-textbox">
      <div class="edit-textname" v-for="food in foods" :key="food.foodId">
          <h5 class="t1">Edit food</h5>   
      </div>
    </div>
    <div class="edit-form2box">
      <div class="edit-form-input">
        <div class="edit-input">
          <div class="edit-label">
            <label>Food Name:</label>
          </div>
          <input type="text" v-model="editFood.foodName" />
        </div>
        <div class="edit-input">
          <div class="edit-label">
            <label>Description</label>
          </div>
          <input type="text" v-model="editFood.description" />
        </div>
        <div class="edit-input">
          <div class="edit-label">
            <label>Price</label>
          </div>
          <input type="text" v-model="editFood.price" />
        </div>
        <div class="edit-input">
          <div class="edit-label">
            <label>Category</label>
          </div>
          <input type="text" v-model="editFood.category" />
        </div>
        <div class="edit-btn-form" v-for="food in foods" :key="food.foodId">
          <div class="edit-btn">
            <button class="edit-cancel" @click="cancelEdit">Cancel</button>

            <button class="edit-save" @click="updateProduct">Save</button> 
           
          </div>
        </div>
      </div>
      <div class="edit-form-input2">
        <div class="edit-input2">
          <div class="edit-label2">
            <label>Food Img:</label>
          </div>
          <input type="file" @change="handleFileUpload" id="image" required>
          
        </div>
        <div v-show="showImg">
          <img :src="editFood.previewImage" alt="Image Preview" style="width: 100px; height: 100px;">
        </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "EditPage",
  data() {
    return {
      foods: [],
      showImg: false,
      editFood: {
        foodId: "",
        foodName: "",
        description: "",
        price: 0,
        category: "",
        image: null,
        previewImage: null
      },
    };
  },
  mounted() {
    this.fetchProducts(this.$route.params.id);
   
  },
  methods: {
    fetchProducts(foodId) {
      axios
        .get(`http://localhost:3000/products/edit/${foodId}`)
        .then((res) => {
          this.foods = res.data;
          this.editFood = { ...this.foods[0] };
          this.editFood.previewImage = `http://localhost:3000/img_fd/${foodId}.jpg`;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    handleFileUpload(event) {
      const file = event.target.files[0];
      if (file) {
        this.editFood.image = file;
        this.editFood.previewImage = URL.createObjectURL(file);
        this.showImg = true;
      }
    },
    updateProduct() {
      console.log("Edit Food Data: ", this.editFood);
      // test อยู่
      const formData = new FormData();
      formData.append('foodId', this.editFood.foodId);
      formData.append('foodName', this.editFood.foodName);
      formData.append('description', this.editFood.description);
      formData.append('price', this.editFood.price);
      formData.append('category', this.editFood.category);
      if (this.editFood.image) {
        formData.append("image", this.editFood.image); 
      }
      for (let [key, value] of formData.entries()) {
        console.log(key, value); // ตรวจสอบค่าที่จะส่งไปยังเซิร์ฟเวอร์
      }
      // // 
      axios
        .put(
          `http://localhost:3000/products/edit/${this.editFood.foodId}`,formData,{
            headers:{
              'Content-Type': 'multipart/form-data'
            }
          })
        .then(() => {
          alert("Product updated successfully");
          this.$router.push('/manageproduct').then(() => {
            window.location.reload();
          })
        })
        .catch((err) => {
          console.log(err);
        });
    },
    cancelEdit() {
      this.editFood = {
        foodId: "",
        foodName: "",
        description: "",
        price: 0,
        category: "",
      };
      this.$router.push(`/manageproduct`);
    },
  },
};
</script>

<style>

</style>