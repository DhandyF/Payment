<template>
  <div class="breadcrumb">
    <p class="breadcrumb__number breadcrumb__number--bg--orange">1</p>
    <p class="breadcrumb__label">Delivery</p>
    <img class="breadcrumb__arrow" src="@/assets/images/keyboard_arrow_right.png" alt="next">
    <p
      class="breadcrumb__number"
      :class="state >= 2 ? 'breadcrumb__number--bg--orange' : ''"
    >
      2
    </p>
    <p class="breadcrumb__label">Payment</p>
    <img class="breadcrumb__arrow" src="@/assets/images/keyboard_arrow_right.png" alt="next">
    <p
      class="breadcrumb__number"
      :class="state >= 3 ? 'breadcrumb__number--bg--orange' : ''"
    >
      3
    </p>
    <p class="breadcrumb__label">Finish</p>
  </div>
</template>

<script>
export default {
  name: 'Breadcrumb',
  props: {
    state: Number
  }
}
</script>
