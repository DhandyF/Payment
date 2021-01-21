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
            <button 
              @click="changeShipment('GO-SEND')"
              class="btn"
              :class="shipment === 'GO-SEND' ? 'btn--outline--green' : ''"
            >
              GO-SEND
            </button>
            <button
              @click="changeShipment('JNE')"
              class="btn"
              :class="shipment === 'JNE' ? 'btn--outline--green' : ''"
            >
              JNE
            </button>
            <button
              @click="changeShipment('Personal Courier')"
              class="btn"
              :class="shipment === 'Personal Courier' ? 'btn--outline--green' : ''"
            >
              Personal Courier
            </button>
          </div>
          <div class="transaction__header transaction__header--mt">
            <div class="header">
              <h1 class="header__title header__title--big header__title--orange">Payment</h1>
            </div>
          </div>
          <div class="transaction__form">
            <button
              @click="changePayment('e-Wallet')"
              class="btn"
              :class="payment === 'e-Wallet' ? 'btn--outline--green' : ''"
            >
              e-Wallet
            </button>
            <button
              @click="changePayment('Bank Transfer')"
              class="btn"
              :class="payment === 'Bank Transfer' ? 'btn--outline--green' : ''"
            >
              Bank Transfer
            </button>
            <button
              @click="changePayment('Virtual Account')"
              class="btn"
              :class="payment === 'Virtual Account' ? 'btn--outline--green' : ''"
            >
              Virtual Account
            </button>
          </div>
        </div>
        <div class="summary">
          <div class="summary__header">
            <div class="header">
              <h3 class="header__title header__title--orange">Summary</h3>
              <p class="header__subtitle">{{ user.sumItems }} items purchased</p>
            </div>
          </div>
          <div v-show="shipment !== ''" class="summary__detail">
            <p class="label label--black">Delivery estimation</p>
            <p class="summary__value">{{ delEstimation + ' ' + 'by' + ' ' + shipment }}</p>
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
              <p class="label"><strong>{{ shipment }}</strong> shipment</p>
              <p v-if="shipment !== ''" class="price">{{ Number(shipmentFee).toLocaleString() }}</p>
              <p v-else class="price" >0</p>
            </div>
            <div class="summary__cost">
              <p class="label label--big label--orange">Total</p>
              <p class="price price--big price--orange">{{ Number(costTotal).toLocaleString() }}</p>
            </div>
            <button class="btn btn--big btn--orange">Pay with {{ payment }}</button>
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
      shipment: "",
      shipmentFee: 0,
      payment: "",
      goSendFee: 15000,
      jneFee: 9000,
      pcFee: 29000,
      delEstimation: ""
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
    },
    changeShipment(value) {
      this.shipment = value
      if (value === 'GO-SEND') {
        this.shipmentFee = this.goSendFee
        this.delEstimation = 'today'
      }
      if (value === 'JNE') {
        this.shipmentFee = this.jneFee
        this.delEstimation = '2 days'
      }
      if (value === 'Personal Courier') {
        this.shipmentFee = this.pcFee
        this.delEstimation = '1 day'
      }
    },
    changePayment(value) {
      this.payment = value
    }
  },
}
</script>
