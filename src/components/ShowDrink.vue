<template>
    <div class="">
        <div class="text-danger">เมนูเครื่องดื่มของเรา</div>
        <div class="">
            <input type="text" v-model="stext" class="form-control">
        </div>
        <div class="searchbtn">
            <button class="btn btn-primary" @click="searchProduct()">ค้นหา</button>
        </div>
    </div>
    <div class="row">
        <div v-for="(fd,foodId) in foods" :key="foodId" class="">
            <div class="mt-5" style="width: 18rem;background: #EEEEEE;">
                <img :src="`http://localhost:3000/img_fd/${ fd.foodId }.jpg`" class="card-img-top pp-2" style=" height:250px;" alt="">
                <div class="card-body">
                    <h5 class="card-title">{{ fd.foodName }}</h5>
                    <p class="card-text">{{ fd.description }} - {{ fd.price }} Baht</p>
                    <button class="btn btn-primary" @click="addToCart(fd.foodId, fd.price)">Add to cart</button>
                </div>
              </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import { EventBus } from '@/event-bus'
export default {
    name: 'ShowDrink',
    data(){
        return{
            foods: [],
            stext:''
        }
    },
    mounted(){
        axios.get(`http://localhost:3000/getdrink`)
        .then(res=>{
            this.foods = res.data;
        })
        .catch(err => {
            console.log(err)
        })
    },
    methods:{
        searchProduct(){
            axios.get(`http://localhost:3000/products/search/${this.stext}`)
            .then(res=>{
                console.log(this.stext);
                this.foods = res.data;
            })
            .catch(err => {
                console.log(err)
            })
        },
        async addToCart(foodId, foodPrice){
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
            if(this.memEmail == null)
            {
                alert("ต้อง Login เข้าระบบก่อน")
                return false //ถ้ายังไม่ Login บอกให้ Login
            }
            await this.chkCart() // ถ้า Login แล้วให้ตรวจสอบว่ามี Cart หรือยัง
            if(this.cartId == null)
            {
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
        async chkCart()
        {
            console.log('chkCart')
             await axios.get(`http://localhost:3000/carts/chkcart`)
                .then(res => {
                    console.log("Cart"+res.data)
                    this.cartId = res.data.id
                })
                .catch(err => {
                    console.error(err);
                });
        },
    }
}
</script>

<style>

</style>