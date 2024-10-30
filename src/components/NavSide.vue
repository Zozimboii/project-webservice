<template>
  <div class="container">
    <div class="sidebar" v-show="showSide">
      <div class="head">
        <div class="user-img" v-if="memEmail">
          <div v-if="imageExists">
            <img style="width:40px; height:40px; border-radius: 50%;" :src="`http://localhost:3000/img_mem/${memEmail}.jpg?timestamp=${new Date().getTime()}`">
          </div>
          <div v-else>
            <img style="width:40px; height:40px; border-radius: 50%;" :src="`http://localhost:3000/img_mem/default.jpg`">
          </div>
        </div>
        <div class="user-details" v-if="memName === null">
          <p class="title">Unknown</p>
          <p class="name">Unknown</p>
        </div>
        <div class="user-details" v-else>
          <p class="title">{{ dutyId }}</p>
          <p class="name">{{ memName }}</p>
        </div>
      </div>
      <div class="nav" >
        <div class="menu">
          <p class="title">Main</p>

          <ul>
            <router-link to="/homepage" class="rout">
              <li>
                <a href="#"
                  ><i class="bi bi-house-door"></i>
                  <span class="text">Home Page</span>
                </a>
              </li>
            </router-link>
            <router-link to="/showfoods" class="rout">
              <li>
                <a href="#">
                  <i class="bi bi-egg-fill"></i>
                  <span class="text">Food</span>
                </a>
              </li>
            </router-link>
            <router-link to="/showdrink" class="rout">
              <li class="active">
                <a href="#"
                  ><i class="bi bi-cup-straw"></i>
                  <span class="text">Drink</span>
                </a>
              </li>
            </router-link>
            <div v-if="dutyId == 'admin'">
              <router-link to="/manageproduct" class="rout">
                <li class="active">
                  <a href="#"
                    ><i class="bi bi-cup-straw"></i>
                    <span class="text">Manage Product</span>
                  </a>
                </li>
              </router-link>
            </div>
          </ul>
        </div>
        <!-- <div class="menu" ></div> -->
      </div>
      <div class="menu" v-if="memName === null">
        
      </div>
      
      <div class="menu" v-else>
         <!-- <div class="menu" ></div> -->
      <div class="menu-set">
        <p class="title">Setting</p>
          
        <ul>
          <router-link to="/setting" class="rout">
            <li>
              <a href="#"
                ><i class="bi bi-person"></i>
                <span class="text">Profile</span>
              </a>
            </li>
          </router-link>
        </ul>
      </div>
      </div>
      <div class="menu-acc">
      <div class="menu">
        <p class="title">Account</p>
        
        <ul v-if="memName === null">
          <router-link to="/login" class="rout">
            <li>
              <a href="#"
                ><i class="bi bi-box-arrow-in-right"></i>
                <span class="text">Login</span>
              </a>
            </li>
          </router-link>
        </ul>
        <ul v-else>
          <!-- <router-link to="/login" class="rout"> -->
          <li>
            <a href="#" @click="memlogout"
              ><i class="bi bi-box-arrow-left"></i>
              <span class="text text-danger">Logout</span>
            </a>
          </li>
          <!-- </router-link> -->
        </ul>
        </div>
      </div>
    </div>
    <div class="nav-top">
      <div class="inside-top">
        <!-- icon-list-menu -->
        <div class="toggle-menu" @click="toggleSideBar">
          <i class="list bi bi-list"></i>
        </div>
        <!-- search -->
        <div class="search-top">
          <div class="search-inside">
            <div>Food</div>
            <div class="logo">
              <div class="logo-img">
                <div>
                  <router-link to="/" class="rout">
                    <a href="#"><img src="../assets/logo.jpg" alt="#" /></a>
                  </router-link>
                </div>
              </div>
            </div>
            <div>Shop</div>

            <!-- <form class="search-form">
                <div class="text-search">
                  <input type="text" class="form-control" v-model="stext" />
                </div>
                <div>
                  <button class="btn btn-primary" @click="searchProduct()"><i class="bi bi-search"></i></button>
                </div>
              </form> -->
          </div>
          <!-- logo -->

          <div class="cart">
            <div class="cart-in">
              <ul>
                <router-link to="/cartdetail" class="rout">
                  <li>
                    <a href="#"
                      ><i class="cart-img bi bi-cart2"></i
                      ><span>Cart ({{ cartCount }})</span></a>
                  </li>
                </router-link>
              </ul>

              <div></div>
            </div>
          </div>
        </div>
      </div>

      <div class="data-main">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
  
  <script>
import axios from "axios";
import { EventBus } from "@/event-bus";
axios.defaults.withCredentials = true;
export default {
  data() {
    return {
      showSide: true,
      cartCount: 0,
      memEmail: null,
      memName: null,
      backendMessage: null,
      dutyId: null,
      imageExists:false,
    };
  },
  async mounted() {
    await this.chkSession();
    this.memName = sessionStorage.getItem("memName");
    this.dutyId = sessionStorage.getItem("dutyId");
    EventBus.on("cartUpdated",this.incrementCartCount)
    EventBus.on("loginok", () => {
      this.memName = sessionStorage.getItem("memName"); 
      this.dutyId = sessionStorage.getItem("dutyId");
      this.dutyId = sessionStorage.getItem("memEmail");
      this.checkImage();
    });
    this.$router.afterEach(() => {
      this.showSide = false;
    });
  },

  beforeUnmount() {
    EventBus.off("loginok");
  },
  beforeUnmountCart() {
    EventBus.off("cartUpdated", this.incrementCartCount);
  },
  methods: {
    toggleSideBar() {
      this.showSide = !this.showSide;
    },
    incrementCartCount(){
      this.cartCount += 1;
    },
    async chkSession() {
        await axios
          .get(`http://localhost:3000/members/getss`)
          .then((res) => {
            if (res.data.email) {
              // ตั้งค่าเมื่อผู้ใช้ล็อกอินแล้ว
              this.memEmail = res.data.email;
              this.memName = res.data.name;
              this.dutyId = res.data.duty;
              this.checkImage(); // ตรวจสอบรูปภาพเมื่อผู้ใช้ล็อกอิน
            } else {
              // รีเซ็ตค่าหากยังไม่ได้ล็อกอิน
              this.memEmail = null;
              this.memName = null;
              this.dutyId = null;
              this.imageExists = false; // ซ่อนรูปภาพโปรไฟล์
            }
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
    async memlogout() {
      const cf = window.confirm("ต้องการออกจากระบบ?");
      EventBus.emit("memlogout");
      if (cf) {
        try {
          const response = await axios.get(
            `http://localhost:3000/members/logout`
          );
          this.backendMessage = response.data.messagelogout;
          if (this.backendMessage == "success") {
            sessionStorage.clear();
            this.memName = null;
            this.imageExists = false;
            this.$router.push("/").then(()=>{
              window.location.reload();
            });
          }
        } catch (err) {
          console.log(err);
        }
      }
    },
  },
};
</script>
  
  <style></style>
  