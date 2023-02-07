<script lang="ts" setup>
import Services from '@/ui/components/services/Services.vue'
import ServicesCreateDialog from '@/ui/components/services/ServicesEditDialog.vue'
</script>

<template>
  <div class="page">
    <ServicesCreateDialog />
    <div class="content">
      <div :class="$style.root">
        <Services />
      </div>
    </div>
  </div>
</template>

<style lang="stylus" module>
.root {
  margin-bottom 32px
}
</style>
