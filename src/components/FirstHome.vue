<template>
  <MDBCarousel
    v-model="carousel4"
    :items="items4"
  />
</template>

<script>
  import { ref } from "vue";
  import { MDBCarousel } from "mdb-vue-ui-kit";
  export default {
    components: {
      MDBCarousel
    },
    setup() {
      const items4 = [
        {
          src: require('@/assets/homepage01.png'),
          alt: "..."
        },
        {
          src: require('@/assets/homepage02.png'),
          alt: "..."
        },
        {
          src: require('@/assets/homepage03.png'),
          alt: "..."
        }
      ];
      const carousel4 = ref(0);
      return {
        items4,
        carousel4
      };
    }
  };
</script>

<style>

</style>