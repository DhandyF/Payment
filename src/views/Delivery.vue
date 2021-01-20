<template>
  <div class="container">
    <div class="content">
      <div class="breadcrumb">
        <p class="breadcrumb__number breadcrumb__number--bg--orange">1</p>
        <p class="breadcrumb__label">Delivery</p>
        <img class="breadcrumb__arrow" src="@/assets/images/keyboard_arrow_right.png" alt="next">
        <p class="breadcrumb__number">2</p>
        <p class="breadcrumb__label">Payment</p>
        <img class="breadcrumb__arrow" src="@/assets/images/keyboard_arrow_right.png" alt="next">
        <p class="breadcrumb__number">3</p>
        <p class="breadcrumb__label">Finish</p>
      </div>
      <div class="content__back">
        <a href="#">
          <img class="icon" src="@/assets/images/arrow_back.png" alt="back">
          Back to chart
        </a>
      </div>
      <div class="transaction">
        <div class="transaction__detail">
          <div class="transaction__header">
            <div class="header">
              <h1 class="header__title header__title--big header__title--orange">Delivery details</h1>
            </div>
            <div class="checkbox">
              <input v-model="isDropshipper" type="checkbox" id="checkbox_dropshipper">
              <label for="checkbox_dropshipper">Send as dropshipper</label>
            </div>
          </div>
          <div class="transaction__form">
            <div class="transaction__info">
              <input v-model="email" class="form form__input" :class="isValidEmail ? 'form__input--green' : email !== null ? 'form__input--orange' : ''" type="email" id="email" placeholder="Email" required>
              <p class="label label--small guide guide--orange" v-if="email !== null && !isValidEmail">Email required<br>(Example: example@gmail.com)</p>
              <input v-model="phoneNumber" class="form form__input" :class="isValidPhone ? 'form__input--green' : phoneNumber !== null ? 'form__input--orange' : ''" type="tel" id="phone" name="phone" placeholder="Phone Number" pattern="^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$" required>
              <p class="label label--small guide guide--orange" v-if="phoneNumber !== null && !isValidPhone">Phone number required<br> (Example: (+62)123456789 or 08123456789)</p>
              <textarea v-model="address" class="form form__textarea" name="address" id="address" cols="30" rows="10" placeholder="Delivery Address" maxlength="120" required></textarea>
              <p class="label label--small guide">{{ 120 - address.length }} character left</p>
            </div>
            <div class="transaction__dropshipper">
              <input v-model="dsName" :disabled="!isDropshipper" class="form form__input" type="text" id="dropshipper_name" placeholder="Dropshipper name">
              <input v-model="dsPhoneNumber" :disabled="!isDropshipper" class="form form__input" :class="isValidDSPhone ? 'form__input--green' : dsPhoneNumber !== null ? 'form__input--orange' : ''" type="text" id="dropsphipper_phone" placeholder="Dropshipper phone number">
              <p class="label label--small guide guide--orange" v-if="dsPhoneNumber !== null && !isValidDSPhone">Phone number required<br> (Example: (+62)123456789 or 08123456789)</p>
            </div>
          </div>
        </div>
        <div class="summary">
          <div class="summary__header">
            <div class="header">
              <h3 class="header__title header__title--orange">Summary</h3>
              <p class="header__subtitle">{{ sumItems }} items purchased</p>
            </div>
          </div>
          <div class="summary__payment">
            <div class="summary__cost">
              <p class="label">Cost of goods</p>
              <p class="price">{{ Number(costGoods).toLocaleString() }}</p>
            </div>
            <div class="summary__cost">
              <p class="label">Dropshipping Fee</p>
              <p v-if="isDropshipper" class="price">{{ Number(dsFee).toLocaleString() }}</p>
              <p v-else class="price" >0</p>
            </div>
            <div class="summary__cost">
              <p class="label label--big label--orange">Total</p>
              <p class="price price--big price--orange">{{ Number(costTotal).toLocaleString() }}</p>
            </div>
            <button class="btn">Continue to Payment</button>
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
      isDropshipper: false,
      email: null,
      phoneNumber: null,
      address: "",
      dsName: "",
      dsPhoneNumber: null,
      sumItems: 10,
      costGoods: 500000,
      dsFee: 5900
    }
  },
  watch: {
    isDropshipper: function() {
      if (!this.isDropshipper) {
        this.dsName = ""
        this.dsPhoneNumber = null
      }
    }
  },
  computed: {
    isValidEmail() {
      return this.emailValidator(this.email)
    },
    isValidPhone() {
      return this.phoneValidator(this.phoneNumber)
    },
    isValidDSPhone() {
      return this.phoneValidator(this.dsPhoneNumber)
    },
    costTotal() {
      if (this.isDropshipper) {
        return this.costGoods + this.dsFee
      }
      return this.costGoods
    }
  },
  methods: {
    emailValidator(email) {
      let pattern = new RegExp("^[\\w.-]+@([\\w-]+\\.)+[\\w-]{2,4}$")
      return  pattern.test(email)
    },
    phoneValidator(phone) {
      let pattern = new RegExp("^(([(]{1}[+]{1}[0-9]{1,4}[)]{1})|[0]){1}[-0-9]{5,19}$")
      return pattern.test(phone)
    }
  },
}
</script>
