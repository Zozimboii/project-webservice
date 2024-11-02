<template>
   <div class="register-container" >
    <div class="box-warn" >
    <form @submit.prevent="handleSubmit()" >
        <h3>login now</h3>
        <div class="text-label"><label for="memName">Email</label></div>
        <div class="inside-box"><i class="ic bi bi-person-fill"></i><input type="text" id="loginname" v-model="loginname" autocomplete="off" required autofocus placeholder="Enter your email"></div>
        <div class="text-label"><label for="memName">Password</label></div>
        <div class="inside-box"><i class="ic bi bi-lock-fill"></i><input type="password" id="password" v-model="password" required autofocus placeholder="Enter your password"></div>
        
        <!-- <input type="text" id="loginname" v-model="loginname" autocomplete="off" required autofocus placeholder="Enter your email"> -->
        <!-- <input type="password" id="password" v-model="password" required autofocus placeholder="Enter your password"> -->

        <input type="submit" name="submit" value="login now" class="register-btn">
        <p>don't have an account? 
          <router-link to="/register"><a href="#">register now</a></router-link>
        </p>
    </form></div>
    <div class="warn-container">
    <div class="warn">
        <p v-if="backendMessage=='success'" class="alert alert-success">เข้าระบบสำเร็จ-{{ backendMessage }}</p>
        <p v-else-if="backendMessage=='fail'" class="alert alert-danger">เข้าระบบไม่สำเร็จ-{{ backendMessage }}</p>
      </div>
    </div>
  </div>
  
</template>
 
<script>
import { EventBus } from '@/event-bus';
import axios from 'axios'
export default {
  name:'TheLogin',
  data(){
    return{
      loginname:null,
      password:null,
      backendMessage:null,


    }
  },
  async mounted(){
    if(sessionStorage.getItem('memEmail') != null){
      this.$router.push('/manageproduct')
    }
  },
  methods:{
    async handleSubmit(){
      let members = {
        loginname:this.loginname,
        password:this.password
      }
      try{
        const response = await axios.post(`http://localhost:3000/members/login`,members)
        this.backendMessage = response.data.messagelogin;
        if(this.backendMessage == 'success'){
          const role = response.data.role
          await this.chkSession()
          EventBus.emit('loginok')

          sessionStorage.setItem('userRole',role)
          
          if(role === 'admin'){
            setTimeout(()=>{
              this.$router.push('/').then(() => {
                window.location.reload();
              });
            },500)
          }else{
            setTimeout(() => {
            this.$router.push('/').then(()=>{
              window.location.reload();
            });
          },500)
          }
        }
      }
      catch(err){
        console.log(err)
      }
    },
    async chkSession(){
      await axios.get(`http://localhost:3000/members/getss`)
      .then(res=>{
        console.log(res.data)
        this.memEmail=res.data.email
        this.memName=res.data.name
        this.dutyId=res.data.duty
        sessionStorage.setItem('memName',res.data.name)
        sessionStorage.setItem('dutyId',res.data.duty)
      })
      .catch(err=>{
        console.error(err)
      })
    }
  }
}
</script>

<style>

</style>