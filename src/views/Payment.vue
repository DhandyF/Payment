<template>
  <div class="container">
    <div class="content">
      <Breadcrumb :state=2></Breadcrumb>
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
          <div class="transaction__form transaction__form--wrap">
            <button 
              @click="changeShipment('GO-SEND')"
              class="btn btn__flex"
              :class="shipment === 'GO-SEND' ? 'btn--outline--green btn__selected' : ''"
            >
              <p class="label label--medium label--small" :class="shipment === 'GO-SEND' ? 'label--black' : ''">GO-SEND</p>
              <p class="label label--semibold" :class="shipment === 'GO-SEND' ? 'label--black' : ''">{{ Number(goSendFee).toLocaleString() }}</p>
            </button>
            <button
              @click="changeShipment('JNE')"
              class="btn btn__flex"
              :class="shipment === 'JNE' ? 'btn--outline--green btn__selected' : ''"
            >
              <p class="label label--medium label--small" :class="shipment === 'JNE' ? 'label--black' : ''">JNE</p>
              <p class="label label--semibold" :class="shipment === 'JNE' ? 'label--black' : ''">{{ Number(jneFee).toLocaleString() }}</p>
            </button>
            <button
              @click="changeShipment('Personal Courier')"
              class="btn btn__flex"
              :class="shipment === 'Personal Courier' ? 'btn--outline--green btn__selected' : ''"
            >
              <p class="label label--medium label--small" :class="shipment === 'Personal Courier' ? 'label--black' : ''">Personal Courier</p>
              <p class="label label--semibold" :class="shipment === 'Personal Courier' ? 'label--black' : ''">{{ Number(pcFee).toLocaleString() }}</p>
            </button>
          </div>
          <div class="transaction__header">
            <div class="header">
              <h1 class="header__title header__title--big header__title--orange">Payment</h1>
            </div>
          </div>
          <div class="transaction__form transaction__form--wrap">
            <button
              @click="changePayment('e-Wallet')"
              class="btn btn__flex"
              :class="payment === 'e-Wallet' ? 'btn--outline--green btn__selected' : ''"
            >
              <p class="label label--medium label--small" :class="payment === 'e-Wallet' ? 'label--black' : ''">e-Wallet</p>
              <p class="label label--semibold" :class="payment === 'e-Wallet' ? 'label--black' : ''">{{ Number(1500000).toLocaleString() }} left</p>
            </button>
            <button
              @click="changePayment('Bank Transfer')"
              class="btn btn--left"
              :class="payment === 'Bank Transfer' ? 'btn--outline--green btn__selected' : ''"
            >
              <p class="label label--medium label--szmedium"  :class="payment === 'Bank Transfer' ? 'label--black' : ''">Bank Transfer</p>
            </button>
            <button
              @click="changePayment('Virtual Account')"
              class="btn btn--left"
              :class="payment === 'Virtual Account' ? 'btn--outline--green btn__selected' : ''"
            >
              <p class="label label--medium label--szmedium"  :class="payment === 'Virtual Account' ? 'label--black' : ''">Virtual Account</p>
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
              <p class="price">{{ Number(user.dsFee).toLocaleString() }}</p>
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
            <button class="btn btn--big btn--orange" @click="formValidator">Pay with {{ payment }}</button>
          </div>
        </div>
      </div>
    </div>
    <!-- Popup Modal -->
    <div id="modal" class="modal">
      <div class="modal__content">
        <span class="modal__close" @click="closeModal">&times;</span>
        <div class="modal__body">
          <p class="modal__warning">!</p>
          <p v-for="msg in errMsg" :key="msg" class="label--medium label--orange">&bull; {{ msg }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Breadcrumb from '../components/Breadcrumb.vue'

export default {
  components: {
    Breadcrumb
  },
  data() {
    return {
      user: {},
      shipment: '',
      shipmentFee: 0,
      payment: '',
      goSendFee: 15000,
      jneFee: 9000,
      pcFee: 29000,
      delEstimation: '',
      errMsg: []
    }
  },
  created() {
    window.addEventListener('beforeunload', this.storeToLocal)
    this.loadData()
  },
  beforeDestroy() {
    window.removeEventListener('beforeunload', this.storeToLocal)
  },
  computed: {
    costTotal() {
      return this.user.costGoods + this.user.dsFee + this.shipmentFee
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
      if (localStorage.getItem('userPayment')) {
        try {
          let userPayment = JSON.parse(localStorage.getItem('userPayment'))

          this.shipment = userPayment.shipment
          this.shipmentFee = userPayment.shipmentFee
          this.payment = userPayment.payment
          this.delEstimation = userPayment.delEstimation
        } catch (err) {
          localStorage.removeItem('userPayment')
        }
      }
    },
    storeToLocal() {
      let userPayment = {
        shipment: this.shipment,
        shipmentFee: this.shipmentFee,
        payment: this.payment,
        delEstimation: this.delEstimation,
        costTotal: this.costTotal
      }
      localStorage.setItem('userData', JSON.stringify(this.user))
      localStorage.setItem('userPayment', JSON.stringify(userPayment))
    },
    backToDelivery() {
      this.storeToLocal()
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
    },
    checkShipment() {
      let errMsg = []

      if (this.shipment == '') errMsg.push('Shipment required')

      return errMsg
    },
    checkPayment() {
      let errMsg = []

      if (this.payment == '') errMsg.push('Payment required')

      return errMsg
    },
    showModal(errMsg) {
      let modal = document.getElementById('modal')

      this.errMsg = errMsg

      modal.style.display = 'block'

      window.onclick = function(event) {
        if (event.target == modal) {
          modal.style.display = 'none'
        }
      }
    },
    closeModal() {
      let modal = document.getElementById('modal')
      modal.style.display = 'none'
    },
    formValidator() {
      let errMsg = []

      if (this.checkShipment().length != 0) errMsg.push(this.checkShipment()[0])
      if (this.checkPayment().length != 0) errMsg.push(this.checkPayment()[0])

      console.log(errMsg);
      if (errMsg.length > 0) {
        this.showModal(errMsg)
      } else {
        this.goToFinish()
      }
    },
    goToFinish() {
      this.storeToLocal()
      this.$router.push('/finish')
    }
  },
}
</script>
