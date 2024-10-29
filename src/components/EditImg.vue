<template>
  <!-- <div class="edit-container">
    <div class="edit-form1">
      <table class="edit-table">
        <thead class="edit-head">
          <tr class="edit-tr">
            <th class="th00">Food Image</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="food in foods" :key="food.foodId" class="edit-tr">
            <td class="td55">
              <img :src="`http://localhost:3000/img_fd/${food.foodId}.jpg`" alt=""
                style="width: 100px; height: 100px" />
            </td>


          </tr>
        </tbody>
      </table>
    </div>
    <div class="edit-form2">
      <div class="edit-textname" v-for="food in foods" :key="food.foodId">
        <router-link :to="{ path: '/edit/'+food.foodId}" style="text-decoration: none;">

          <h5 class="t1">Edit food</h5>
        </router-link>
        <router-link :to="{ path: '/edit/' + food.foodId + '/img' }" style="text-decoration: none;">
          <h5 class="t2">IMG</h5>
        </router-link>
      </div>
      <div class="edit-form-input">
        <div class="edit-input">
          <div class="edit-label">
            <label>Food Img:</label>
          </div>
          <input type="file" @change="handleFileUpload" id="image" required>
        </div>
        <div v-show="showImg">
          <img :src="editFood.previewImage" alt="Image Preview" style="width: 100px; height: 100px;">
        </div>
        <div class="edit-btn-form">
          <div class="edit-btn">

            <button class="edit-cancel" @click="cancelEdit">Cancel</button>


            <button class="edit-save" @click="updateProduct">Save</button>

          </div>
        </div>
      </div>
    </div>
  </div> -->

 <div>asd</div>
</template>
<script>
// import { EventBus } from "@/event-bus";
// import axios from "axios";
export default {
  name: "EditImg",
  // data() {
  //   return {
  //     foods: [],
  //     editFood: {
  //       showImg: false,
  //       image: null,
  //       previewImage: null
  //     },
  //   };
  // },
  // watch: {
  //   foods(food) {
  //     if (food.length > 0) {
  //       this.openEditForm(food[0]);
  //     }
  //   },
  // },
  // mounted() {
  //   this.fetchProducts(this.$route.params.id);
  // },

  // methods: {
  //   fetchProducts(foodId) {
  //     axios
  //       .get(`http://localhost:3000/products/edit/${foodId}`)
  //       .then((res) => {
  //         this.foods = res.data;
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   },
  //   openEditForm(food) {
  //     this.editFood = { ...food };
  //     this.editFood.previewImage = `http://localhost:3000/img_fd/${food.foodId}.jpg`;
  //   },
  //   handleFileUpload(event) {
  //     const file = event.target.files[0];
  //     if (file) {
  //       this.editFood.image = file;
  //       this.editFood.previewImage = URL.createObjectURL(file);
  //       this.showImg = true;
  //     }
      
  //   },
  //   updateProduct() {
  //     axios
  //       .put(
  //         `http://localhost:3000/products/edit/${this.editFood.foodId}`,
  //         this.editFood
  //       )
  //       .then(() => {
  //         alert("Product updated successfully");
  //         this.fetchProducts(this.editFood.foodId);
          
  //         this.$router.push(`/manageproduct`)
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   },
  //   cancelEdit() {
  //     this.editFood = {
  //       foodId: "",
  //       foodName: "",
  //       description: "",
  //       price: 0,
  //       category: "",
  //     };
  //     this.$router.push(`/manageproduct`)
  //   },

  // },
};
</script>

<style></style>
