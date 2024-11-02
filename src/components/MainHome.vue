<template>
  <!-- หน้า 1 -->
  <div class="main1-container">
  <div class="mainhome-container">
    <div class="mainhome-header">
      <div class="mainhome-box1"></div>
      <div class="mainhome-box2">
        <div class="mainhome-logo"></div>
        <div class="mainhome-title">
          <h1>FoodShop & ShopFood</h1>
        </div>
        <div class="mainhome-des">
          <p>
            ร้านอาหารไทยริมแม่น้ำเจ้าพระยาบรรยากาศดี มองเห็นวิวสะพานพระราม 8
            เปิดให้บริการตั้งแต่เวลา 11.00 - 00.00 น.ข้อมูลติดต่อ: 081 893 5552
          </p>
        </div>
        <div class="mainhome-btn" @click="scrollToMenu">
            
          <div class="left"></div>
          <div class="mid"><p>ดูเมนูยอดฮิต</p></div>
          <div class="right"><i class="bi bi-arrow-right"></i></div>
        </div>
      </div>
    </div>
  </div>

  <!-- หน้า 2 -->
  <div class="mainhome-container2" ref="mainhome2">
    <div class="mainhome-header2">
      <div class="mainhome-box11">
        <h1>เมนูยอดฮิตประจำร้าน</h1>
      </div>

      <div class="mainhome-sumbox">
        <div class="mainhome-suminbox">
          <div class="mainhome-box22">
            <div class="mainhome-inbox-text">
              <span>ข้าวผัดกุ้ง</span>
            </div>

            <img src="../assets/foodmain.jpg" alt="#" />
            <h1>80 บาท</h1>
          </div>
        </div>
        <div class="mainhome-suminbox">
          <div class="mainhome-box33">
            <div class="mainhome-inbox-text">
              <span>ปีกไก่ทอด</span>
            </div>
            <img src="../assets/Chicken-wings-fried.jpg" alt="#" />
            <h1>80 บาท</h1>
          </div>
        </div>
        <div class="mainhome-suminbox">
          <div class="mainhome-box22">
            <div class="mainhome-inbox-text">
              <span>ชานมไข่มุก</span>
            </div>
            <img src="../assets/drink1.jpg" alt="#" />
            <h1>40 บาท</h1>
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
export default {
    methods: {
    scrollToMenu() {
      const menuSection = this.$refs.mainhome2;
      if (menuSection) {
        menuSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }
  
};
</script>

<style></style>
