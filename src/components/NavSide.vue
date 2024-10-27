<template>
  <div class="container">
    <div class="sidebar" v-show="showSide">
      <div class="head">
        <!-- img user -->
        <div class="user-img">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="44"
            height="44"
            fill="currentColor"
            class="bi bi-person-circle"
            viewBox="0 0 16 16"
          >
            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
            <path
              fill-rule="evenodd"
              d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
            />
          </svg>
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
                  <span class="text">Food</span>
                </a>
              </li>
            </router-link>
            <router-link to="/homepage" class="rout">
              <li>
                <a href="#">
                  <i class="bi bi-egg-fill"></i>
                  <span class="text">Food</span>
                </a>
              </li>
            </router-link>
            <router-link to="/homepage" class="rout">
              <li class="active">
                <a href="#"
                  ><i class="bi bi-cup-straw"></i>
                  <span class="text">Food</span>
                </a>
              </li>
            </router-link>
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
                <router-link to="/" class="rout">
                  <li>
                    <a href="#"
                      ><i class="cart-img bi bi-cart2"></i
                      ><span>Cart (0)</span></a
                    >
                  </li>
                </router-link>
              </ul>

              <div></div>
            </div>
          </div>

          <!-- <div class="logo">
              <div class="logo-img">
                <div>
                  <router-link to="/" class="rout">
                  <a href="#"><img src="./assets/logo.jpg" alt=""></a>
                </router-link>
                </div>
              </div>
            </div> -->
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
      memName: null,
      backendMessage: null,
      dutyId: null,
    };
  },
  async mounted() {
    await this.chkSession();
    this.memName = sessionStorage.getItem("memName");
    // test
    this.dutyId = sessionStorage.getItem("dutyId");
// 
    EventBus.on("loginok", () => {
      this.memName = sessionStorage.getItem("memName");
      // 
      this.dutyId = sessionStorage.getItem("dutyId");
      // 
    });
    this.$router.afterEach(() => {
      this.showSide = false;
    });
  },

  beforeUnmount() {
    EventBus.off("loginok");
  },

  methods: {
    toggleSideBar() {
      this.showSide = !this.showSide;
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
            this.$router.push("/");
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
  