<template>
   <div class="register-container">
    <form @submit.prevent="handleSubmit()">
        <h3>login now</h3>
        <input type="text" id="loginname" v-model="loginname" autocomplete="off" required placeholder="Enter your email">
        <input type="password" id="password" v-model="password" required placeholder="Enter your password">
        <p v-if="backendMessage=='success'" class="alert alert-success">เข้าระบบสำเร็จ-{{ backendMessage }}</p>
        <p v-else-if="backendMessage=='fail'" class="alert alert-danger">เข้าระบบสำเร็จ-{{ backendMessage }}</p>
        <input type="submit" name="submit" value="login now" class="register-btn">
        <p>don't have an account? 
          <router-link to="/register"><a href="#">register now</a></router-link>
        </p>
    </form>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name:'TheLogin',
  data(){
    return{
      loginname:null,
      password:null,
      backendMessage:null
    }
  },
  methods:{
    async handleSubmit(){
      let members = {
        loginname:this.loginname,
        password:this.password
      }
      try{
        const response = await axios.post(`http://127.0.0.1:3000/members/login`,members)
        this.backendMessage = response.data.messagelogin;
        if(this.backendMessage == 'success'){
          const role = response.data.role
          if(role === 'admin'){
            setTimeout(()=>{
              this.$router.push('/manageproduct');
            },1500)
          }else{
            setTimeout(() => {
            this.$router.push('/homepage');
          },1500)
          }
        }
      }
      catch(err){
        console.log(err)
      }
    }
  }
}
</script>

<style>

</style>