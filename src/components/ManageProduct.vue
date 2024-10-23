<template>
  <div>
    <h5 class="text-success" style="text-align: center;">Product List</h5>
    <router-link to="/admin">
      <button class="btn btn-success">Add product</button>
    </router-link>
    <table border="1" style="width: 100%; text-align: center;">
      <thead>
        <tr>
          <th>Food ID</th>
          <th>Food Name</th>
          <th>Description</th>
          <th>Price</th>
          <th>Category</th>
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
      axios.get('http://127.0.0.1:3000/products')
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