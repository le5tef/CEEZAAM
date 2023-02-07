<script setup lang="ts">
import { computed, defineProps, onBeforeMount } from 'vue'
import { useDialogStore } from '@/store/dialog'

const dialogStore = useDialogStore()

const props = defineProps({
  name: { type: String, required: true },
  width: { type: Number, required: true },
  fullscreen: { type: Boolean, required: false, default: false },
})

const isActive = computed({
  get() {
    return dialogStore.allOpen.includes(props.name)
  },
  set(val) {
    if (val) dialogStore.openDialog(props.name)
    else dialogStore.closeDialog(props.name)
  },
})

const close = () => dialogStore.closeDialog(props.name)

onBeforeMount(() => {
  if (isActive.value) close()
})
</script>

<template>
  <el-dialog
    v-model="isActive"
    align-center
    :width="props.width"
    :fullscreen="fullscreen"
    :class="[fullscreen ? $style.dialog__fullscreen : $style.dialog]"
  >
    <template #header>
      <slot name="title"></slot>
    </template>
    <slot name="content"></slot>
  </el-dialog>
</template>

<style lang="stylus" module>
.dialog
  border-radius 8px !important

  &__fullscreen
    border-radius none
</style>
