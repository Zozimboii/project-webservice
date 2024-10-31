<template>
  <div v-if="memEmail == cusId" class="cartshow-container">
    <div class="cartshow-table-box1">
    <!---v for  -->

    <!-- Detail -->
    <div class="table">
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
        <div class="cartshow-td00">{{ ctd.row_number }}</div>
        <!-- <div class="cartshow-td66">{{ ctd.foodId }}</div> -->
        <div class="cartshow-td77">{{ ctd.foodName }}</div>
        <div class="cartshow-td88">{{ ctd.price }}</div>
        <div class="cartshow-td99">{{ ctd.qty }}</div>
        <div class="cartshow-td100">
          {{ (ctd.price * ctd.qty).toLocaleString() }}
        </div>
        <!-- <td class="text-center">
                    <i class="bi-x-lg text-danger"></i>
                </td> -->
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
            ยอดเงิน {{ ct.sprice.toLocaleString() }} บาท
          </div>
        </div>
      </div>
      <!--card-->
    </div>
  </div>
    <div class="cartshow-cf-del">
      <div onclick="return confirm('ยืนยันลบตะกร้า')" class="cartshow-del">
        <i class="bi-cart-x-fill"></i> ลบตะกร้าสินค้า
      </div>
      <div onclick="return confirm('ยืนยันสั่งสินค้า')" class="cartshow-cf">
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
      cart: [], //รับข้อมูล Master
      cartDtl: [], //รับข้อมูล Detail
      cartId: null,
      memEmail: null,
      cusId: null,
    };
  },
  async mounted() {
    // ตรวจสอบว่าเป็นเจ้าของตะกร้าหรือไม่
    await this.chkSession();
    this.cartId = this.$route.params.cartId;
    // อ่านข้อมูล Master +อ่านข้อมูล Detail
    await this.getCart();
    await this.getCartDtl();
  },
  methods: {
    // แปลงรูปแบบวันที่
    formattedDate(dateStr) {
      const date = new Date(dateStr);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0"); // เดือนเริ่มต้นที่ 0, จึงต้อง +1
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    },
    // Master
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
    // Detail
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
    // ตรวจสอบ Session
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
  },
};
</script>

<style></style>
