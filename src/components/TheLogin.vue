<template>
   <div class="register-container">
    <form action="">
        <h3>login now</h3>
        
        <input type="email" name="email" required placeholder="enter your email">
        <input type="password" name="password" required placeholder="enter your password">
        <input type="submit" name="submit" value="login now" class="register-btn">
        <p>don't have an account? 
          <router-link to="/register"><a href="#">register now</a></router-link>
        </p>
    </form>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>