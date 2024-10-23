<template>
  <div class="register-container">
    <form @submit.prevent="handleSubmit()">
        <h3>register now</h3>
        <input v-model="memName" type="text" id="memName" required placeholder="Enter your name">
        <input v-model="memEmail" type="email" id="memEmail" placeholder="Enter your email">
        <input v-model="password" type="password" id="password" required placeholder="Enter your password">
        <p v-if="errorMessage" style="color:red;">{{ errorMessage }}</p>
        <input v-model="confirmPassword" type="password" name="cpassword" required placeholder="Confirm your password">
        <!-- <select name="user_type">
            <option value="user">user</option>
            <option value="user">admin</option>
        </select> -->
        <input type="submit" name="submit" value="register now" class="register-btn">
        <p v-if="backendMessage=='success'" class="alert alert-success mt-3">ลงทะเบียนสำเร็จ-{{ backendMessage }}</p>
        <p v-else-if="backendMessage=='fail'" class="alert alert-danger mt-3">ลงทะเบียนผิดพลาด-{{ backendMessage }}</p>
        <p>Already have an account? <router-link to="/login"><a href="#">login now</a></router-link></p>
        
    </form>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name:'TheRegister',
  data(){
    return{
      memEmail:null,
      memName:null,
      password:null,
      backendMessage:null,
      confirmPassword:null,
      errorMessage:null
    }
  },
  methods:{
    async handleSubmit(){
      if(this.password !== this.confirmPassword){
        this.errorMessage = "Passwords do not match.";
        return;
      }
      let members = {
        memEmail:this.memEmail,
        memName:this.memName,
        password:this.password
      }
      try{
        const response = await axios.post(`http://127.0.0.1:3000/members`,members)
        this.backendMessage = response.data.messageregister;
        this.errorMessage = null;
        if(this.backendMessage === 'success'){
          this.$router.push('/login');
        }
         
      }catch(err){
        console.log(err)
      }
    }
  }
}
</script>

<style>

</style>