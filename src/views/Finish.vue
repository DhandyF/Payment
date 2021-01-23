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
        <p class="breadcrumb__number breadcrumb__number--bg--orange">3</p>
        <p class="breadcrumb__label">Finish</p>
      </div>
      <div class="transaction">
        <div class="transaction__detail transaction__detail--center">
          <div class="transaction__header">
            <div class="header">
              <h1 class="header__title header__title--big header__title--orange">Thank you</h1>
            </div>
          </div>
          <div class="transaction__form">
            <div class="transaction__info transaction__info--center">
              <p class="label label--semibold label--black">Order ID: XXKYB</p>
              <p class="label">Your order will be delivered {{ payment.delEstimation }} with {{ payment.shipment }}</p>
              <div class="content__back content__back--center">
                <a href="#" @click="backToHomePage">
                  <img class="icon" src="@/assets/images/arrow_back.png" alt="back">
                  Go to homepage
                </a>
              </div>
            </div>
          </div>
        </div>
        <div class="summary">
          <div class="summary__header">
            <div class="header">
              <h3 class="header__title header__title--orange">Summary</h3>
              <p class="header__subtitle">{{ user.sumItems }} items purchased</p>
            </div>
          </div>
          <div class="summary__detail">
            <p class="label label--semibold label--black">Delivery estimation</p>
            <p class="summary__value">{{ payment.delEstimation + ' ' + 'by' + ' ' + payment.shipment }}</p>
          </div>
          <div class="summary__detail">
            <p class="label label--semibold label--black">Payment method</p>
            <p class="summary__value">{{ payment.payment }}</p>
          </div>
          <div class="summary__payment">
            <div class="summary__cost">
              <p class="label label--medium">Cost of goods</p>
              <p class="price">{{ Number(user.costGoods).toLocaleString() }}</p>
            </div>
            <div class="summary__cost">
              <p class="label label--medium">Dropshipping Fee</p>
              <p class="price">{{ Number(user.dsFee).toLocaleString() }}</p>
            </div>
            <div class="summary__cost">
              <p class="label label--medium"><strong>{{ payment.shipment }}</strong> shipment</p>
              <p class="price">{{ Number(payment.shipmentFee).toLocaleString() }}</p>
            </div>
            <div class="summary__cost">
              <p class="label label--big label--orange">Total</p>
              <p class="price price--big price--orange">{{ Number(payment.costTotal).toLocaleString() }}</p>
            </div>
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
      user: {},
      payment: {}
    }
  },
  created() {
    this.loadData()
  },
  methods: {
    loadData() {
      if (localStorage.getItem('userData')) {
        try {
          this.user = JSON.parse(localStorage.getItem('userData'))
          console.log(this.user);
        } catch (err) {
          localStorage.removeItem('userData')
        }
      }
      if (localStorage.getItem('userPayment')) {
        try {
          this.payment = JSON.parse(localStorage.getItem('userPayment'))
          console.log(this.payment);
        } catch (err) {
          localStorage.removeItem('userPayment')
        }
      }
    },
    backToHomePage() {
      localStorage.removeItem('userData')
      localStorage.removeItem('userPayment')
      this.$router.push('/')
    }
  },
}
</script>