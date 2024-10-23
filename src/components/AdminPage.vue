<template>
  <h5 class="text-success" style="text-align: center;">Menu Admin</h5>
  <form @submit.prevent="handleSubmit()">
    <p>Form add menu</p>
    <label for="foodId">FoodId :</label>
    <input v-model="foodId" type="text" id="foodId" required placeholder="Food Id">
    <input v-model="foodName" type="text" id="foodName" required placeholder="Food Name">
    <input v-model="description" type="text" id="description" required placeholder="Description">
    <input v-model="price" type="text" id="price" required placeholder="Price">
    <input v-model="category" type="text" id="category" required placeholder="Category">
    <input type="submit" value="Add product">
  </form>
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
        const response = await axios.post(`http://127.0.0.1:3000/products`,foods)
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