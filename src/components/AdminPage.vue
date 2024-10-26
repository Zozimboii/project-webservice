<template>
  <div class="add-menu-admin">
  <h5 class="menu-text">Menu Admin</h5>
  <div class="box-description">
  <form @submit.prevent="handleSubmit()">
    <p>Form add menu</p>
    
    <div class="box-name1">
    <label for="foodId">FoodId</label>
    <input v-model="foodId" type="text" id="foodId" required placeholder="Food Id">
  </div>
  <div class="box-name1">
    <label for="foodName">foodName</label>
    <input v-model="foodName" type="text" id="foodName" required placeholder="Food Name">
  </div>
  <div class="box-name1">
    <label for="description">description</label>
    <input v-model="description" type="text" id="description" required placeholder="Description">
  </div>
  <div class="box-name1">
    <label for="price">price</label>
    <input v-model="price" type="text" id="price" required placeholder="Price">
</div>
    <div class="box-name1">
    <label for="category">category</label>
    <input v-model="category" type="text" id="category" required placeholder="Category">
  </div>
    <input type="submit" value="Add product" class="add-product-btn">
  
  </form>
</div>
  </div>
</template>

<script>
import axios from "axios"
export default {
  name:'AdminPage',
  data(){
    return{
      foodId:null,
      foodName:null,
      description:null,
      price:null,
      category:null
    }
  },
  methods:{
    async handleSubmit(){
      let foods = {
        foodId:this.foodId,
        foodName:this.foodName,
        description:this.description,
        price:this.price,
        category:this.category
      }
      try{
        const response = await axios.post(`http://localhost:3000/products`,foods)
        console.log('Product added:',response.data)
      }catch(err){
        console.log(err)
      }
    }
  }
}
</script>

<style>

</style>