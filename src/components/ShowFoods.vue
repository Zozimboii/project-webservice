<template>
    <div class="food-container">
        <div class="food-box">
            <div class="food-text">เมนูอาหารของเรา</div>
            <div class="food-search">

                <input type="text" v-model="stext" class="form-control">
                <button class="food-btn" @click="searchProduct()"><i class="sear bi bi-search"></i></button>
            </div>
        </div>
        <div class="food-head">
            <div v-for="(fd, foodId) in foods" :key="foodId" class="food-items">
                <div class="food-items2">
                    <img :src="`http://localhost:3000/img_fd/${fd.foodId}.jpg`" class="food-img" alt="">
                </div>
                <div class="food-card">
                    <div class="in-title">

                        <h5 class="food-card-title">{{ fd.foodName }}</h5>
                        <div class="in-btn">
                            {{ fd.price }} Baht
                            <button class="btn btn-primary" @click="addToCart(fd.foodId, fd.price)">Add to cart</button>
                        </div>
                    </div>
                    <div class="in-text">
                        <p class="food-card-text">{{ fd.description }}</p>

                    </div>


                </div>
            </div>
        </div>
    </div>
    <div class="food-cart">
        <div class="cart-text">
            Cart
        </div>
        <div class="cart-big-box" v-for="(fd, foodId) in foods" :key="foodId">
            <div class="cart-mid-box">
                <div class="cart-cancel">
                    
                    <i class="bi bi-x-lg"></i>
                </div>
                <div class="cart-sm-box">
                    <div class="cart-show-name">
                        <h5 class="cart-card-name">{{ fd.foodName }}</h5>

                    </div>
                    <div class="cart-show-price">
                        <h5 class="cart-card-price">จำนวน X {{ fd.price }}</h5>
                    </div>
                </div>
                <div class="cart-img">

                    <img :src="`http://localhost:3000/img_fd/${fd.foodId}.jpg`" class="cart-img-in"  alt="">
                </div>
            </div>
        </div>
        <div class="cart-sum-btn">
            <div class="text-sum">
                ราคาทั้งหมด
            </div>
            <div class="sum-pay-watch-btn">

                <div class="sum-watch-btn">
    
                    <a>ดูตระกร้า <i class="bi bi-arrow-right"></i></a>
                </div>
                <div class="sum-pay-btn">
                <a>จ่ายเลย <i class="bi bi-arrow-right"></i></a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import { EventBus } from '@/event-bus'
export default {
    name: 'ShowFoods',
    data() {
        return {
            foods: [],
            stext: ''
        }
    },
    mounted() {
        axios.get(`http://localhost:3000/getfoods`)
            .then(res => {
                this.foods = res.data;
            })
            .catch(err => {
                console.log(err)
            })
    },
    methods: {
        searchProduct() {
            axios.get(`http://localhost:3000/products/search/${this.stext}`)
                .then(res => {
                    console.log(this.stext);
                    this.foods = res.data;
                })
                .catch(err => {
                    console.log(err)
                })
        },
        async addToCart(foodId, foodPrice) {
            console.log('chkLogin');
            await this.chkSession(); // ตรวจสอบว่า Login แล้วหรือยัง

            if (this.memEmail == null) {
                alert("ต้อง Login เข้าระบบก่อน");
                return false; // ถ้ายังไม่ Login ให้แจ้งให้ Login
            }

            await this.chkCart(); // ถ้า Login แล้วให้ตรวจสอบว่ามี Cart หรือยัง

            if (this.cartId == null) {
                await this.addCart(); // ถ้ายังไม่มีให้สร้างตะกร้า
            }

            await this.addCartDtl(foodId, foodPrice); // ถ้ามีตะกร้าแล้วให้เอาสินค้าใส่ตะกร้า
            EventBus.emit("cartUpdated"); // แจ้งว่าอัปเดตตะกร้า
        },
        async addCart() {
            console.log("addCart");
            let customer = {
                cusId: this.memEmail
            };
            try {
                const response = await axios.post(`http://localhost:3000/carts/addcart`, customer);
                this.backendMessage = response.data.messageAddCart;
                this.cartId = response.data.messageAddCart; // สมมุติว่า response ส่ง cartId กลับมา
                console.log(response.data);
            } catch (err) {
                console.log(err);
            }
        },
        async addCartDtl(foodId, foodPrice) {
            console.log("addCartDtl");
            let cartdtl = {
                cartId: this.cartId,
                pdId: foodId,
                pdPrice: foodPrice
            };
            try {
                const response = await axios.post(`http://localhost:3000/carts/addcartdtl`, cartdtl);
                this.backendMessage = response.data.messageAddCartDtl;
                console.log(response.data);
            } catch (err) {
                console.log(err);
            }
        },
        async chkLogin() {
            console.log('chkLogin')
            await this.chkSession() //ตรวจสอบว่า Login แล้วหรือยัง
            if (this.memEmail == null) {
                alert("ต้อง Login เข้าระบบก่อน")
                return false //ถ้ายังไม่ Login บอกให้ Login
            }
            await this.chkCart() // ถ้า Login แล้วให้ตรวจสอบว่ามี Cart หรือยัง
            if (this.cartId == null) {
                // ถ้ายังไม่มีให้สร้างตะกร้า
            }
            // ถ้ามีตะกร้าแล้วให้เอาสินค้าใส่ตะกร้า
        },
        async chkSession() {
            await axios.get(`http://localhost:3000/members/getss`)
                .then(res => {
                    this.memEmail = res.data.email
                    console.log(this.memEmail)
                })
                .catch(err => {
                    console.error(err);
                });
        },
        async chkCart() {
            console.log('chkCart')
            await axios.get(`http://localhost:3000/carts/chkcart`)
                .then(res => {
                    console.log("Cart" + res.data)
                    this.cartId = res.data.id
                })
                .catch(err => {
                    console.error(err);
                });
        },

    }
}
</script>

<style></style>