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
                               <span>
                                
                                   {{ fd.price }} Baht
                               </span> 
                                <button class="food-add" @click="addToCart(fd.foodId, fd.price)"><i class="bi bi-plus"></i></button>
                            </div>
                        </div>
                        <div class="in-text">
                            <p class="food-card-text">{{ fd.description }}</p>
                        </div>
                    </div>
                </div>
            </div>
         </div>
        <div class="food-cart" >
            <div class="cart-text">
                Cart
            </div>
            <div class="cart-show-pay2"  v-if="cartId=== null">
            <div class="basket">
                <i class="bi bi-basket-fill"></i>
            </div>
            <div class="basket-text">

                <span>ตะกร้าสินค้าว่าง</span>
            </div>
        </div>
        <div class="cart-show-pay" v-else>
            <div class="cart-big-box" v-for="(ctd, foodId) in cartDtl" :key="foodId" >
                <div class="cart-mid-box" v-if="ctd.qty>0">
                    <div class="cart-sm-box" >
                        <div class="cart-show-name">
                            <h5 class="cart-card-name">{{ ctd.foodName }}</h5>

                        </div>
                        <div class="cart-show-price">
                            <h5 class="cart-card-price"><input type="number" class="qty-input" v-model="ctd.qty" @change="updateQuantity(ctd)" min="0" /> X {{ ctd.price }} = {{ (ctd.price * ctd.qty).toLocaleString() }}</h5>
                        </div>
                    </div>
                    <div class="cart-img">

                        <img :src="`http://localhost:3000/img_fd/${ctd.pdId}.jpg`" class="cart-img-in"  alt="">
                    </div>
                </div>
            </div>
            <div class="cart-sum-btn">
                <div class="text-sum">
                    ราคาทั้งหมด {{ calculateTotalPrice().toLocaleString() }} Baht
                </div>
                <div class="sum-pay-watch-btn">
                    <div class="sum-pay-btn">
                    <div v-if="cartDtl.some(ctd => ctd.qty > 0)" @click="$router.push(`/cartshow/${cartId}`)">
                        <a>จ่ายเลย <i class="bi bi-arrow-right"></i></a>
                    </div>
                    </div>
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
                stext: '',
                cartDtl:[],
                cartId:null,
            }
        },
        mounted() {
            const savedCartId = sessionStorage.getItem('cartId');
            if (savedCartId) {
                this.cartId = savedCartId;
                this.getCartDtl();
            }
            if (this.cartId) {
                this.getCartDtl();
            }
            axios.get(`http://localhost:3000/getfoods`)
                .then(res => {
                    this.foods = res.data;
                })
                .catch(err => {
                    console.log(err)
                })
        },
        methods: {
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
                this.getCartDtl();
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

                    this.cartDtl = [];
                    this.getCartDtl(); 
                } catch (err) {
                    console.log(err);
                }
                sessionStorage.setItem('cartId', this.cartId);
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
            async updateQuantity(ctd) {
            // อัปเดตจำนวนสินค้าในตะกร้า
            let updatedCartDetail = {
                cartId: this.cartId,
                pdId: ctd.pdId,
                newQty: ctd.qty
            };
            try {
                const response = await axios.post(`http://localhost:3000/carts/updatecartdtl`, updatedCartDetail);
                console.log(response.data);
                this.getCartDtl(); // รีเฟรชตะกร้า
            } catch (err) {
                console.error(err);
            }
            EventBus.emit("cartUpdated");
            },
            calculateTotalPrice(){
                let total = 0;
                this.cartDtl.forEach(ctd => {
                    total += ctd.price * ctd.qty;
                });
                return total;
            },

        }
    }
    </script>

    <style></style>