<template>
  <div v-if="memEmail == cusId" class="cartshow-container">
    <div class="cartshow-table-box1">
    <!---v for  -->

    <!-- Detail -->
    <div class="table" >
      <div class="cartshow-tr1">
        <div class="cartshow-td00"></div>
        <div class="cartshow-td11">สินค้า</div>
        <!-- <div class="cartshow-td00"></div> -->
        <div class="cartshow-td22">ราคาต่อหน่วย</div>
        <div class="cartshow-td33">จำนวน</div>
        <div class="cartshow-td44">เป็นเงิน</div>
        <!-- <div class="cartshow-td00"></div> -->
      </div>
      <div v-for="(ctd, foodId) in cartDtl" :key="foodId" class="cartshow-tr2">
        <div class="cartshow-td00" v-if="ctd.qty>0">{{ ctd.row_number }}</div>
        <div class="cartshow-td77" v-if="ctd.qty>0">{{ ctd.foodName }}</div>
        <div class="cartshow-td88" v-if="ctd.qty>0">{{ ctd.price }}</div>
        <div class="cartshow-td99" v-if="ctd.qty>0">{{ ctd.qty }}</div>
        <div class="cartshow-td100" v-if="ctd.qty>0">
          {{ (ctd.price * ctd.qty) }}
        </div>
      </div>
    </div>
    <div v-for="(ct, cartId) in cart" :key="cartId" class="cartshow-header">
      <div class="cartshow-box1">
        <div class="cartshow-title">
          <h4>คำสั่งซื้อเลขที่ {{ ct.cartId }}</h4>
          <h5>สั่งซื้อวันที่ {{ formattedDate(ct.cartDate) }}</h5>
        </div>
        <div class="cartshow-qty-price">
          <div class="cartshow-qty">จำนวนสินค้า {{ ct.sqty }}ชิ้น</div>

          <div class="cartshow-price">
            ยอดเงิน {{ ct.sprice }} บาท
          </div>
        </div>
      </div>
      <!--card-->
    </div>
  </div>
    <div class="cartshow-cf-del">
      <div @click="deleteCart" class="cartshow-del">
        <i class="bi-cart-x-fill"></i> ลบตะกร้าสินค้า
      </div>
      <div @click="createNewCart" class="cartshow-create">
        <i class="bi-cart-plus-fill"></i> สร้างตะกร้าใหม่
      </div>
      <div @click="confirmOrder" class="cartshow-cf">
        <i class="bi-currency-dollar"></i> ยืนยันสั่งสินค้า
      </div>
    </div>
  </div>
  <!--v-if-->
  <div v-else>
    <div class="alert alert-danger mt-5">คุณไม่มีสิทธิ์ดูรายการนี้</div>
  </div>
</template>

<script>
import axios from "axios";
axios.defaults.withCredentials = true;
export default {
  name: "CartShow",
  data() {
    return {
      cart: [],
      cartDtl: [], 
      cartId: null,
      memEmail: null,
      cusId: null,
    };
  },
  async mounted() {
    await this.chkSession();
    this.cartId = this.$route.params.cartId;
    if(this.cartId){
      await this.getCart();
      await this.getCartDtl();
    }
  },
  methods: {
    formattedDate(dateStr) {
      const date = new Date(dateStr);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0"); 
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    },
    async getCart() {
      console.log("Get Cart");
      await axios
        .get(`http://localhost:3000/carts/getcart/${this.cartId}`)
        .then((res) => {
          console.log("Cart \n" + res.data);
          this.cart = res.data;
          this.cusId = res.data[0].cusId;
        })
        .catch((err) => {
          console.error(err);
        });
    },
    async getCartDtl() {
      console.log("Get CartCartDtl");
      await axios
        .get(`http://localhost:3000/carts/getcartdtl/${this.cartId}`)
        .then((res) => {
          console.log("CartDtl \n" + res.data);
          this.cartDtl = res.data;
        })
        .catch((err) => {
          console.error(err);
        });
    },
    async chkSession() {
      await axios
        .get(`http://localhost:3000/members/getss`)
        .then((res) => {
          console.log(res.data);
          this.memEmail = res.data.email;
        })
        .catch((err) => {
          console.error(err);
      });
    },
    async confirmOrder(){
      const confirm = window.confirm("ยืนยันการสั่ง");
      if(confirm){
        try{
          const response = await axios.post(`http://localhost:3000/carts/confirmOrder`,{
            cartId:this.cartId,
            cartCf: true
          })
          if(response.data.success){
            alert("ยืนยันคำสั่งซื้อ")
            this.cartDtl = [];
            this.cart = [];
            this.cartId = null;

            sessionStorage.removeItem('cartId');

            const newCartResponse = await axios.post(`http://localhost:3000/carts/create`,{
              cusId:this.cusId
            })
            if(newCartResponse.data.cartOK){
              this.cartId = newCartResponse.data.messageAddCart;
              this.cartDtl = [];
            }else{
              alert("สร้างตะกร้าผิดพลาด")
            }
          }else{
            alert("เกิดข้อผิดพลาดในการยืนยัน")
          }
        }catch(error){
          console.error(error);
          alert("เกิดข้อผิดพลาดในการยืนยัน")
        }
      }
      this.$router.push('/');
    },
    async createNewCart() {
        try {
          this.cart = [];
          this.cartDtl = [];
          this.cartId = null;
          sessionStorage.removeItem('cartId');
          const response = await axios.post(`http://localhost:3000/carts/create`, {
            cusId: this.cusId
          });
          if (response.data.cartOK) {
            this.cartId = response.data.messageAddCart;
            sessionStorage.setItem('cartId', this.cartId);
            await this.getCart();
            await this.getCartDtl();
            alert("สร้างตะกร้าใหม่เรียบร้อยแล้ว");
          } else {
            alert("สร้างตะกร้าผิดพลาด");
          }
        } catch (error) {
          console.error(error);
          alert("เกิดข้อผิดพลาดในการสร้างตะกร้าใหม่");
        }
        this.$router.push('/showfoods');
      },

    async deleteCart(){
      const confirmDelete = window.confirm("ยืนยันลบตะกร้า");
      if(confirmDelete){
        try{
          const response = await axios.delete(`http://localhost:3000/carts/delete/${this.cartId}`);
          if (response.data.success){
            alert("ลบเรียบร้อยแล้ว")
            this.cart = [];
            this.cartDtl = [];
            this.cartId = null;
            sessionStorage.removeItem('cartId');
          }else{
            alert("เกิดข้อพลาดในการลบ")
          }
        }catch(error){
          console.error(error);
          alert("เกิดข้อพลาดในการลบ")
        }
      }
      this.$router.push('/setting');
    }
  },
};
</script>

<style></style>