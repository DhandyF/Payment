<template>
  <div class="container">
    <div class="content">
      <Breadcrumb :state=1></Breadcrumb>
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
              <input v-model="user.isDropshipper" type="checkbox" id="checkbox_dropshipper">
              <label for="checkbox_dropshipper">Send as dropshipper</label>
            </div>
          </div>
          <div class="transaction__form">
            <div class="transaction__info">
              <!-- Input email -->
              <div class="form__container">
                <input 
                  v-model="user.email"
                  class="form form__input"
                  :class="isValidEmail ? 'form__input--green' : user.email !== null ? 'form__input--orange' : ''"
                  type="email"
                  id="email"
                  placeholder="Email"
                  required
                >
                <p v-show="isValidEmail" class="icon__input icon--green">&#10004;</p>
                <p v-if="!isValidEmail && user.email != null" class="icon__input icon--orange">&#10006;</p>
              </div>
              <p
                class="label label--small guide guide--orange"
                v-if="user.email !== null && !isValidEmail"
              >
                Incorrect email<br>(Example: example@gmail.com)
              </p>

              <!-- Input phone number -->
              <div class="form__container">
                <input 
                  v-model="user.phoneNumber"
                  class="form form__input" :class="isValidPhone ? 'form__input--green' : user.phoneNumber !== null ? 'form__input--orange' : ''"
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder="Phone Number"
                  required
                >
                <p v-show="isValidPhone" class="icon__input icon--green">&#10004;</p>
                <p v-if="!isValidPhone && user.phoneNumber != null" class="icon__input icon--orange">&#10006;</p>
              </div>
              <p
                class="label label--small guide guide--orange"
                v-if="user.phoneNumber !== null && !isValidPhone"
              >
                <span v-if="user.phoneNumber.length <= 20">Incorrect phone number</span>
                <span v-else>Phone number is too long</span> <br> (Example: (+62)123456789 or 08123456789)
              </p>

              <!-- Input address -->
              <div class="form__container">
                <textarea
                  v-model="user.address"
                  class="form form__textarea"
                  :class="user.address.length > 0 ? 'form__input--green' : addressFocus ? 'form__input--orange' : ''"
                  name="address"
                  id="address"
                  cols="30"
                  rows="10"
                  placeholder="Delivery Address"
                  maxlength="120"
                  required
                ></textarea>
                <p v-show="user.address.length !== 0" class="icon__input icon--green">&#10004;</p>
                <p v-if="user.address.length == 0 && addressFocus" class="icon__input icon--orange">&#10006;</p>
              </div>
                <p class="label label--small guide">{{ 120 - user.address.length }} character left</p>
                <p
                  class="label label--small guide guide--orange"
                  v-if="user.address.length == 0 && addressFocus"
                >
                  Address required
                </p>
            </div>
            
            <!-- Form Dropshipper -->
            <div class="transaction__dropshipper">
              <!-- Dropshipper name -->
              <div class="form__container">
                <input
                  v-model="user.dsName"
                  :disabled="!user.isDropshipper"
                  class="form form__input"
                  :class="user.dsName.length > 0 ? 'form__input--green' : dsNameFocus && user.isDropshipper ? 'form__input--orange' : ''"
                  type="text"
                  id="dropshipper_name"
                  placeholder="Dropshipper name"
                >
                <p v-show="user.dsName.length !== 0" class="icon__input icon--green">&#10004;</p>
                <p v-if="user.dsName.length == 0 && dsNameFocus && user.isDropshipper" class="icon__input icon--orange">&#10006;</p>
              </div>
              <p
                class="label label--small guide guide--orange"
                v-if="user.dsName.length == 0 && dsNameFocus && user.isDropshipper"
              >
                Dropshipper name required
              </p>

              <!-- Dropshipper phone number -->
              <div class="form__container">
                <input
                  v-model="user.dsPhoneNumber"
                  :disabled="!user.isDropshipper"
                  class="form form__input"
                  :class="isValidDSPhone ? 'form__input--green' : user.dsPhoneNumber !== null ? 'form__input--orange' : ''"
                  type="text"
                  id="dropsphipper_phone"
                  placeholder="Dropshipper phone number"
                >
                <p v-show="isValidDSPhone" class="icon__input icon--green">&#10004;</p>
                <p v-if="!isValidDSPhone && user.dsPhoneNumber != null" class="icon__input icon--orange">&#10006;</p>
              </div>
              <p
                class="label label--small guide guide--orange"
                v-if="user.dsPhoneNumber !== null && !isValidDSPhone"
              >
                <span v-if="user.dsPhoneNumber.length <= 20">Incorrect phone number</span>
                <span v-else>Phone number is too long</span> <br> (Example: (+62)123456789 or 08123456789)
              </p>
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
              <p class="label label--big label--orange">Total</p>
              <p class="price price--big price--orange">{{ Number(costTotal).toLocaleString() }}</p>
            </div>
            <button class="btn btn--big btn--orange" @click="formValidator">Continue to Payment</button>
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
      user: {
        isDropshipper: false,
        email: null,
        phoneNumber: null,
        address: '',
        dsName: '',
        dsPhoneNumber: null,
        sumItems: 10,
        costGoods: 500000,
        dsFee: 0
      },
      dsFee: 5900,
      addressFocus: false,
      dsNameFocus: false,
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
  watch: {
    'user.isDropshipper': function() {
      if (!this.user.isDropshipper) {
        this.user.dsName = ""
        this.user.dsPhoneNumber = null
        this.user.dsFee = 0
        this.dsNameFocus = false
      } else {
        this.user.dsFee = this.dsFee
      }
    },
    'user.address': function() {
      if (this.user.address.length > 0) {
        this.addressFocus = true
      }
    },
    'user.dsName': function() {
      if (this.user.dsName.length > 0) {
        this.dsNameFocus = true
      }
    }
  },
  computed: {
    isValidEmail() {
      return this.emailValidator(this.user.email)
    },
    isValidPhone() {
      return this.phoneValidator(this.user.phoneNumber)
    },
    isValidDSPhone() {
      return this.phoneValidator(this.user.dsPhoneNumber)
    },
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
      localStorage.setItem('userData', JSON.stringify(this.user))
    },
    emailValidator(email) {
      let pattern = new RegExp("^[\\w.-]+@([\\w-]+\\.)+[\\w-]{2,4}$")
      return  pattern.test(email)
    },
    phoneValidator(phone) {
      let pattern = new RegExp("^(([(]{1}[+]{1}[0-9]{1,4}[)]{1})|[0]){1}[-0-9]{5,19}$")
      return pattern.test(phone)
    },
    checkEmail() {
      let errMsg = []
      
      if (this.user.email == null) {
        errMsg.push('Email required')
      } else {
        if (!this.emailValidator(this.user.email)) errMsg.push('Incorrect email')
      }

      return errMsg
    },
    checkPhone() {
      let errMsg = []

      if (this.user.phoneNumber == null) {
        errMsg.push('Phone number required')
      } else {
        if (!this.phoneValidator(this.user.phoneNumber)) errMsg.push('Incorrect phone number')
      }

      return errMsg
    },
    checkAddress() {
      let errMsg = []

      if (this.user.address == '') errMsg.push('Address required')

      return errMsg
    },
    checkDSName() {
      let errMsg = []

      if (this.user.isDropshipper && this.user.dsName == '') errMsg.push('Dropshipper name required')

      return errMsg
    },
    checkDSPhone() {
      let errMsg = []

      if (this.user.isDropshipper) {
        if (this.user.dsPhoneNumber == null) {
          errMsg.push('Dropshipper phone number required')
        } else {
          if (!this.phoneValidator(this.user.dsPhoneNumber)) errMsg.push('Incorrect dropshipper phone number')
        }
      }

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

      if (this.checkEmail().length != 0) errMsg.push(this.checkEmail()[0])
      if (this.checkPhone().length != 0) errMsg.push(this.checkPhone()[0])
      if (this.checkAddress().length != 0) errMsg.push(this.checkAddress()[0])
      if (this.checkDSName().length != 0) errMsg.push(this.checkDSName()[0])
      if (this.checkDSPhone().length != 0) errMsg.push(this.checkDSPhone()[0])

      console.log(errMsg);
      if (errMsg.length > 0) {
        this.showModal(errMsg)
      } else {
        this.goToPayment()
      }
    },
    goToPayment() {
      this.storeToLocal()
      this.$router.push('/payment')
    }
  },
}
</script>
