<script lang="ts" setup>
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useUiStore } from '@/store'
import { UI } from '@/constants'

const uiStore = useUiStore()
const renderingIsAllowed = ref(false)

watch(
  () => uiStore.isGlobalLoaderActive,
  () => {
    if (!uiStore.isGlobalLoaderActive) renderingIsAllowed.value = true
  },
  { immediate: true }
)

onMounted(() => {
  document.documentElement.classList.add(UI.CSS_CLASS_IS_FULLSCREEN)
})

onBeforeUnmount(() => {
  document.documentElement.classList.remove(UI.CSS_CLASS_IS_FULLSCREEN)
})
</script>

<template>
  <div :class="['page', $style.root]">
    <router-view v-slot="{ Component }">
      <transition mode="out-in">
        <component
          :is="Component"
          v-if="renderingIsAllowed"
          :class="['transition-basic', $style.scene]"
        />
      </transition>
    </router-view>
  </div>
</template>

<style lang="stylus" module>
.root
  background: linear-gradient(90deg, #FF6E00 0%, #BB00FF 89%) !important
  display flex
  flex-direction column
  justify-content center
  align-items center !important
  padding 16px 0
  text-align center


  @media (max-width: $authFormWidth)
    padding 0

.scene
  transition()
  transition-duration 500ms

.scene
  width-between-property 'padding-top' 320 24 768 64 true true
  width-between-property 'padding-right' 320 16 768 32 true true
  width-between-property 'padding-bottom' 320 24 768 64 true true
  width-between-property 'padding-left' 320 16 768 32 true true
  width $authFormWidth
  max-width 100%
  background-color white
  border-radius 20px

  @media (max-width: $authFormWidth)
    border-radius 0
</style>
