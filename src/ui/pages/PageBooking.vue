<script lang="ts" setup>
import Booking from '@/ui/components/booking/Booking.vue'
</script>

<template>
  <div class="page">
    <div class="content">
      <div :class="$style.root">
        <Booking />
      </div>
    </div>
  </div>
</template>

<style lang="stylus" module>
.root {
  margin-bottom 32px
}
</style>
