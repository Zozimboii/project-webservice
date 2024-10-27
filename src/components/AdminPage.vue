<template>
  <div class="add-menu-admin">
    <h5 class="menu-text">Menu Admin</h5>
    <div class="box-description">
      <form @submit.prevent="handleSubmit">
        <p>Form add menu</p>
        
        <div class="box-name1">
          <label for="foodId">FoodId</label>
          <input v-model="foodId" type="text" id="foodId" required placeholder="Food Id">
        </div>
        <div class="box-name1">
          <label for="foodName">Food Name</label>
          <input v-model="foodName" type="text" id="foodName" required placeholder="Food Name">
        </div>
        <div class="box-name1">
          <label for="description">Description</label>
          <input v-model="description" type="text" id="description" required placeholder="Description">
        </div>
        <div class="box-name1">
          <label for="price">Price</label>
          <input v-model="price" type="text" id="price" required placeholder="Price">
        </div>
        <div class="box-name1">
          <label for="category">Category</label>
          <input v-model="category" type="text" id="category" required placeholder="Category">
        </div>
        <div class="box-name1">
          <label for="image">Image</label>
          <input type="file" @change="handleFileUpload" id="image" required>
        </div>
        <div v-if="previewImage" class="image-preview">
          <img :src="previewImage" alt="Image Preview" style="width: 100px; height: 100px;">
        </div>
        <input type="submit" value="Add product" class="add-product-btn">
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios"
export default {
  name: 'AdminPage',
  data() {
    return {
      foodId: null,
      foodName: null,
      description: null,
      price: null,
      category: null,
      image: null,
      previewImage:null
    }
  },
  methods: {
    handleFileUpload(event) {
      this.image = event.target.files[0];
      this.previewImage = URL.createObjectURL(this.image);
    },
    async handleSubmit() {
      const formData = new FormData();
      formData.append('foodId', this.foodId);
      formData.append('foodName', this.foodName);
      formData.append('description', this.description);
      formData.append('price', this.price);
      formData.append('category', this.category);
      formData.append('image', this.image);

      try {
        const response = await axios.post('http://localhost:3000/products/addproduct', formData, {
          headers: {
            'Content-Type': 'multipart/form-data', 
          },
        });
        console.log('Product added:', response.data);
      } catch (err) {
        console.log(err);
      }
      this.$router.push('/manageproduct');
    }
  }
}
</script>

<style>

</style>
