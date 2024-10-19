<template>
  <div class="register-container">
    <form action="">
        <h3>register now</h3>
        <input type="text" name="name" required placeholder="enter your name">
        <input type="email" name="email" required placeholder="enter your email">
        <input type="password" name="password" required placeholder="enter your password">
        <input type="password" name="cpassword" required placeholder="confirm your password">
        <select name="user_type">
            <option value="user">user</option>
            <option value="user">admin</option>
        </select>
        <input type="submit" name="submit" value="register now" class="register-btn">
        <p>already have an account? <router-link to="/login"><a href="#">login now</a></router-link></p>
    </form>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>