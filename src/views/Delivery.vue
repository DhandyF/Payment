<template>
  <div class="container">
    <div class="content">
      <div class="content__back">
        Back to chart
      </div>
      <div class="transaction">
        <div class="transaction__detail">
          <div class="transaction__header">
            <h1 class="transaction__title">Delivery details</h1>
            <div class="checkbox">
              <input type="checkbox" id="checkbox_dropshipper">
              <label for="checkbox_dropshipper">Send as dropshipper</label>
            </div>
          </div>
          <div class="transaction__form">
            <div class="transaction__info">
              <input class="form form__input" type="email" id="email" placeholder="Email">
              <input class="form form__input" type="text" id="phone" placeholder="Phone Number">
              <textarea class="form form__textarea" name="address" id="address" cols="30" rows="10" placeholder="Delivery Address"></textarea>
            </div>
            <div class="transaction__dropshipper">
              <input class="form form__input" type="text" id="dropshipper_name" placeholder="Dropshipper name">
              <input class="form form__input" type="text" id="dropsphipper_phone" placeholder="Dropshipper phone number">
            </div>
          </div>
        </div>
        <div class="summary">
          <div class="summary__header">
            <h3 class="summary__title">Summary</h3>
            <p class="summary__items">10 items purchased</p>
          </div>
          <div class="summary__payment">
            <div class="summary__cost">
              <p class="label">Cost of goods</p>
              <p class="price">500,000</p>
            </div>
            <div class="summary__cost">
              <p class="label">Dropshipping Fee</p>
              <p class="price">5,900</p>
            </div>
            <div class="summary__cost">
              <p class="label label--big label--orange">Cost of goods</p>
              <p class="price price--big price--orange">500,000</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="stylus" scoped>

</style>
