<template>
  
  <div class="admin-container">
    <h5 class="text-product">Product List</h5>
    <div class="add-btn">
    <router-link to="/admin">
      <button class="admin-btn">Add product</button>
    </router-link>
  </div>
  <div class="admin-form">
    <table class="admin-table">
      <thead class="admin-head">
        <tr class="admin-tr">
          <th class="th0">Food Image</th>
          <th class="th1">Food ID</th>
          <th class="th2">Food Name</th>
          <th class="th3">Description</th>
          <th class="th4">Price</th>
          <th class="th5">Category</th>
          <th class="th6">Manage</th>
        
       
        </tr>
      </thead>
      <tbody>
        <tr v-for="food in foods" :key="food.foodId" class="admin-tr">
          <td class="td0"><img :src="`http://localhost:3000/img_fd/${food.foodId}.jpg`" alt="" style="width: 100px; height: 100px"></td>
          <td class="td1">{{ food.foodId }}</td>
          <td class="td2">{{ food.foodName }}</td>
          <td class="td3">{{ food.description }}</td>
          <td class="td4">{{ food.price }}</td>
          <td class="td5">{{ food.category }}</td>
          <td>
            <router-link :to="{ path: '/edit/'+food.foodId}"  >
              <!-- @click="openEditForm(food)" -->
            <button class="edit-del btn btn-warning"><i class="bi bi-pencil-square"></i></button>
          </router-link>
            <button class="edit-del btn btn-danger" @click="confirmDelete(food.foodId)"><i class="bi bi-trash3-fill"></i></button>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- <div v-if="isEditFormVisible" class="edit-form">
      <h5>Edit food</h5>
      <label>Food Name:</label>
      <input type="text" v-model="editFood.foodName">
      <label>Description</label>
      <input type="text" v-model="editFood.description">
      <label>Price</label>
      <input type="text" v-model="editFood.price">
      <label>Category</label>
      <input type="text" v-model="editFood.category">
      <button @click="updateProduct">Save</button>
      <button @click="cancelEdit">Cancel</button>
    </div> -->
  </div>
  </div>  
</template>


<script>
import axios from 'axios';

export default {
  name: 'ManageProduct',
  data() {
    return {
      foods: [],
      isEditFormVisible: false,
      editFood:{
        foodId:'',
        foodName:'',
        description:'',
        price: 0,
        category:''
      }
    };
  },
  mounted() {
    this.fetchProducts();
  },
  methods: {
    fetchProducts() {
      axios.get('http://localhost:3000/products')
        .then(res => {
          this.foods = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    
    // openEditForm(food){
    //   this.editFood = { ...food }
    //   this.isEditFormVisible = true;
    // },
    // updateProduct(){
    //   axios.put(`http://localhost:3000/products/edit/${this.editFood.foodId}`,this.editFood)
    //   .then(()=>{
    //     this.fetchProducts();
    //     this.isEditFormVisible = false;
    //   })
    //   .catch(err => {
    //     console.log(err)
    //   })
    // },
    // cancelEdit(){
    //   this.isEditFormVisible = false;
    //   this.editFood = {
    //     foodId:'',
    //     foodName:'',
    //     description:'',
    //     price: 0,
    //     category:''
    //   }
    // },
    confirmDelete(foodId) {
      const confirmDelete = confirm('Are you sure you want to delete this product?');
      if (confirmDelete) {
        this.deleteProduct(foodId);
      }
    },
    deleteProduct(foodId) {
      axios.delete(`http://localhost:3000/products/${foodId}`)
        .then(() => {
          this.fetchProducts();
        })
        .catch(err => {
          console.log(err);
        });
    } 
  }
};
</script>

<style>

</style>