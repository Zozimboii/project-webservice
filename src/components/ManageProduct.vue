<template>
  
  <div class="admin-container">
    <h5>Product List</h5>
    <div class="add-btn">
    <router-link to="/admin">
      <button class="admin-btn">Add product</button>
    </router-link>
  </div>
  <div class="admin-form">
    <table>
      <thead>
        <tr>
          <th class="th1">Food ID</th>
          <th class="th2">Food Name</th>
          <th class="th3">Description</th>
          <th class="th4">Price</th>
          <th class="th5">Category</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="food in foods" :key="food.foodId">
          <td>{{ food.foodId }}</td>
          <td>{{ food.foodName }}</td>
          <td>{{ food.description }}</td>
          <td>{{ food.price }}</td>
          <td>{{ food.category }}</td>
        </tr>
      </tbody>
    </table>
  </div>
  </div>  
</template>


<script>
import axios from 'axios'
export default {
    name:'ManageProduct',
    data(){
      return{
        foods:[]
      }
    },
    mounted(){
      axios.get('http://localhost:3000/products')
      .then(res=>{
        this.foods = res.data
      })
      .catch(err=>{
        console.log(err)
      })
    }
}
</script>

<style>

</style>