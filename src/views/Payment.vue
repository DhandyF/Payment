<template>
  <div class="container">
    <div class="content">
      <div class="breadcrumb">
        <p class="breadcrumb__number breadcrumb__number--bg--orange">1</p>
        <p class="breadcrumb__label">Delivery</p>
        <img class="breadcrumb__arrow" src="@/assets/images/keyboard_arrow_right.png" alt="next">
        <p class="breadcrumb__number breadcrumb__number--bg--orange">2</p>
        <p class="breadcrumb__label">Payment</p>
        <img class="breadcrumb__arrow" src="@/assets/images/keyboard_arrow_right.png" alt="next">
        <p class="breadcrumb__number">3</p>
        <p class="breadcrumb__label">Finish</p>
      </div>
      <div class="content__back">
        <a href="#" @click="backToDelivery">
          <img class="icon" src="@/assets/images/arrow_back.png" alt="back">
          Back to Delivery
        </a>
      </div>
      <div class="transaction">
        <div class="transaction__detail">
          <div class="transaction__header">
            <div class="header">
              <h1 class="header__title header__title--big header__title--orange">Shipment</h1>
            </div>
          </div>
          <div class="transaction__form">
            <button class="btn">GO-SEND</button>
            <button class="btn">JNE</button>
            <button class="btn">Personal Courier</button>
          </div>
          <div class="transaction__header transaction__header--mt">
            <div class="header">
              <h1 class="header__title header__title--big header__title--orange">Payment</h1>
            </div>
          </div>
          <div class="transaction__form">
            <button class="btn">e-Wallet</button>
            <button class="btn">Bank Transfer</button>
            <button class="btn">Virtual Account</button>
          </div>
        </div>
        <div class="summary">
          <div class="summary__header">
            <div class="header">
              <h3 class="header__title header__title--orange">Summary</h3>
              <p class="header__subtitle">{{ user.sumItems }} items purchased</p>
            </div>
          </div>
          <div class="summary__payment">
            <div class="summary__cost">
              <p class="label">Cost of goods</p>
              <p class="price">{{ Number(user.costGoods).toLocaleString() }}</p>
            </div>
            <div class="summary__cost">
              <p class="label">Dropshipping Fee</p>
              <p v-if="user.dsFee !== 0" class="price">{{ Number(user.dsFee).toLocaleString() }}</p>
              <p v-else class="price" >0</p>
            </div>
            <div class="summary__cost">
              <p class="label label--big label--orange">Total</p>
              <p class="price price--big price--orange">{{ Number(costTotal).toLocaleString() }}</p>
            </div>
            <button class="btn btn--big btn--orange">Continue to Payment</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {}
    }
  },
  created() {
    window.addEventListener('beforeunload', this.storeToLocal)
    this.loadData()
  },
  computed: {
    costTotal() {
      if (this.user.isDropshipper) {
        return this.user.costGoods + this.user.dsFee
      }
      return this.user.costGoods
    }
  },
  methods: {
    loadData() {
      if (localStorage.getItem('userData')) {
        try {
          this.user = JSON.parse(localStorage.getItem('userData'))
        } catch (err) {
          localStorage.removeItem('userData')
        }
      }
    },
    storeToLocal() {
      let userData = JSON.stringify(this.user)
      localStorage.setItem('userData', userData)
    },
    backToDelivery() {
      this.$router.push('/')
    }
  },
}
</script>
