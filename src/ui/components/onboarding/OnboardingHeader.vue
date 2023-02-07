<script lang="ts" setup>
import { computed, type PropType } from 'vue'
import type { OnboardingStep } from '@/ui/pages/PageOnboarding.vue'

const props = defineProps({
  step: { type: Object as PropType<OnboardingStep>, required: true },
  stepsCount: { type: Number, required: true },
})
const textProgress = computed(() => `Шаг ${props.step.index}/${props.stepsCount}`)
</script>

<template>
  <div :class="$style.root">
    <el-icon :class="$style.icon" :size="60" color="#9D94A8">
      <component :is="props.step.icon" />
    </el-icon>
    <div :class="$style.main">
      <div :class="$style.progress" v-text="textProgress" />
      <div :class="$style.heading" v-text="props.step.text" />
    </div>
  </div>
</template>

<style lang="stylus" module>
.root
  display flex
  flex-direction row
  padding-top 84.5px
  padding-bottom 44px
  @media (max-width: $tabletHorWidth)
    padding-top 44.5px
  @media (max-width: $tabletVerWidth)
    padding-bottom 24px
    flex-direction column
    padding-top 36.5px

.icon
  color $cTextMuted
  margin-right 15px

.main
  display flex
  flex-direction column
  justify-content space-between
  font-weight 700

.progress
  color $cTextMuted
  font-family Verdana
  font-size 18px
  line-height 24px


.heading
  color $cTextMuted
  font-size 26px
  line-height 36px
</style>
