<template>
  <div class="setting-big">
    <div class="setting-name"><h1>Profile</h1></div>
    <div class="setting-container">
      <div class="setting-header">
        <div class="setting-text1"><h1>Account Information</h1></div>
        <div class="setting-text2">
          <p>username</p>
          <div class="inside-text2">
            <span>data user</span>
          </div>
        </div>
        <div class="setting-text2">
          <p>email address</p>
          <div class="inside-text2">
            <span>data user</span>
          </div>
        </div>
        <div class="setting-text2">
          <p>status</p>
          <div class="inside-text2">
            <span>data user</span>
          </div>
        </div>
      </div>
      <div class="cart-finished">
        <div class="setting-cart">
          <h1>Cart</h1>
          <p>data product</p>
        </div>
        <div class="setting-finished">
          <h1>Cart</h1>
          <p>data product</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios"; //1.import axios มาใช้งาน
axios.defaults.withCredentials = true;

export default {
  data() {
    return {
      memEmail: null,
      memName: null,
      dutyId: null,
    };
  },
  async mounted() {
    await this.chkSession();
  },
  methods: {
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
  },
};
</script>

<style></style>
