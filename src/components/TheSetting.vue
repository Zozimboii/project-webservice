<template>
  <div class="setting-big">
    <div class="setting-name"><h1>Profile</h1></div>
    <div class="setting-container">
      <div class="setting-header">
        <div class="setting-text1"><h1>Account Information</h1></div>
        <div class="setting-text2">
          <p>Profile Image</p>
          <div class="inside-text2" v-if="imageExists">
            <img :src="`http://localhost:3000/img_mem/${memEmail}.jpg?timestamp=${imageTimestamp}`" :alt="memEmail">
          </div>
          <div class="inside-text2"  v-else >
            <img :src="`http://localhost:3000/img_mem/default.jpg`" :alt="memEmail">
          </div>
        </div>
        <form @submit.prevent="uploadFile">
          <div class="row g-3 mt-3">
              <div class="col-md-6 col-sm-12 "></div>
              <div class="col-auto">
                  <input class="form-control" type="file" id="formFile" @change="onFileChange" required />
              </div>
              <div class="col-auto">
                  <button class="btn btn-primary" type="submit">Upload</button>
              </div>
          </div>
          <div class="row g-3 mt-3">
              <div class="col-md-6 col-sm-12 ">
              </div>
              <div class="col-auto">
                  <div class="alert alert-success" v-if="fileMessage != 'fail' && fileMessage != null">
                  {{ fileMessage }}
                  </div>
              </div>
              <div class="col-auto"></div>
          </div>
      </form>
        <div class="setting-text2">
          <p>Username</p>
          <div class="inside-text2">
            <span>{{ memName }}</span>
          </div>
        </div>
        <div class="setting-text2">
          <p>Email address</p>
          <div class="inside-text2">
            <span>{{ memEmail }}</span>
          </div>
        </div>
        <div class="setting-text2">
          <p>Status</p>
          <div class="inside-text2">
            <span>{{ dutyId }}</span>
          </div>
        </div>
      </div>
      <div class="cart-finished">
        <div class="setting-cart">
          <h1>Cart</h1>
          <table class="table">
            <tr class="bg-secondary bg-opacity-10" style="height: 30px;">
                <td></td>
                <td>เลขที่</td>
                <td>วันที่</td>
                <td class="text-center">จำนวน</td>
                <td class="text-end">ยอดเงิน</td>
                <td></td>
            </tr>
            <tr v-for="(ct, cartId) in cart" :key="cartId" style="height: 30px;" >
                <td>{{ ct.row_number }}</td>
                <td><span class="text-primary">
                        <router-link :to="`/cartshow/${ct.cartId }`" style="text-decoration: none;">
                            {{ ct.cartId }}
                        </router-link>
                    </span>
                </td>
                <td>{{ formattedDate(ct.cartDate) }}</td>
                <td class="text-center">{{ ct.sqty }}</td>
                <td class="text-end">{{ ct.sprice.toLocaleString()}}</td>
                <td class="text-center">
                    <i class="bi-x-lg text-danger"></i>
                </td>
            </tr>
        </table>    
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
axios.defaults.withCredentials = true;

export default {
  data() {
    return {
      memEmail: null,
      memName: null,
      dutyId: null,
      imageExists:false,
      fileMessage:null,
      file:null,
      imageTimestamp: Date.now(),
      cart:[]
    };
  },
  async mounted() {
    await this.chkSession();
    await this.getCartList();
    this.checkImage();
  },
  methods: {
    formattedDate(dateStr) {
            const date = new Date(dateStr);
            const year = date.getFullYear();
            const month = String(date.getMonth()+ 1).padStart(2, '0'); // เดือนเริ่มต้นที่ 0, จึงต้อง +1
            const day = String(date.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
        },
        async getCartList() {
            let customer = {
                id:this.memEmail
            }
            console.log('Get CartLIST')
            await axios.post(`http://localhost:3000/carts/getcartbycus`,customer)
                .then(res => {
                    console.log("Cart \n" + res.data)
                    this.cart = res.data
                    this.cusId = res.data[0].cusId
                })
                .catch(err => {
                    console.error(err);
                });
        },
    async chkSession() {
      await axios
        .get(`http://localhost:3000/members/getss`)
        .then((res) => {
          console.log(res.data);
          this.memEmail = res.data.email;
          this.memName = res.data.name;
          this.dutyId = res.data.duty;
        })
        .catch((err) => {
          console.error(err);
        });
    },
    checkImage(){
      const image = new Image();
      image.src = `http://localhost:3000/img_mem/${this.memEmail}.jpg`;
      image.onload = () => {
        this.imageExists = true;
      }
      image.onerror = () => {
        this.imageExists = false;
      }
    },
    onFileChange(e){
      this.file = e.target.files[0];
    },
    async uploadFile(){
      if(!this.file){
        this.fileMessage = "เลือกไฟล์ก่อน";
        return;
      }
      const formData = new FormData();
      formData.append("file",this.file);
      try{
        const response = await axios.post(`http://localhost:3000/members/uploadImg`,formData,
          {
            headers: {
              "Content-Type" : "multipart/form-data",
            },
          }
        );
        this.fileMessage = response.data.message;
        this.checkImage();
        this.imageTimestamp = Date.now();
      }catch(err){
        this.fileMessage = "fail";
      }
    }
  },
};
</script>

<style></style>
