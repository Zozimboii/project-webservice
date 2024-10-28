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
      <div class="edit-textname" v-for="food in foods" :key="food.foodId">
        <router-link :to="{ path: '/edit/'+food.foodId}" style="text-decoration: none;">

          <h5 class="t1">Edit food</h5>
        </router-link>
        <router-link :to="{ path: '/edit/'+food.foodId+'/img'}" style="text-decoration: none;">
        <h5 class="t2">IMG</h5>
      </router-link>
      </div>
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
           
            <!-- <button class="edit-cancel" @click="cancelEdit">Cancel</button>
        
            
              <button class="edit-save" @click="updateProduct">Save</button> -->
              <router-link :to="{ path: '/edit/'+food.foodId+'/img'}" style="text-decoration: none;" >

                <button class="edit-next" @click="nextStep">Next</button>
              </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
// import { EventBus } from "@/event-bus";
export default {
  name: "EditPage",
  data() {
    return {
      foods: [],
      isEditFormVisible: false,
      editFood: {
        foodId: "",
        foodName: "",
        description: "",
        price: 0,
        category: "",
      },
    };
  },
  watch: {
    foods(food) {
      if (food.length > 0) {
        this.openEditForm(food[0]);
      }
    },
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
        })
        .catch((err) => {
          console.log(err);
        });
    },
    openEditForm(food) {
      this.editFood = { ...food };
    },
    updateProduct() {
      axios
        .put(
          `http://localhost:3000/products/edit/${this.editFood.foodId}`,
          this.editFood
        )
        .then(() => {
          alert("Product updated successfully");
          this.fetchProducts(this.editFood.foodId);
          this.$router.push(`/manageproduct`)
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
      this.$router.push(`/manageproduct`)
    },
    
  },
};
</script>

<style></style>
