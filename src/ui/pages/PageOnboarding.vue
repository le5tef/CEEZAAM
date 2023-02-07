<script lang="ts">
import { computed } from 'vue'
import OnboardingHeader from '@/ui/components/onboarding/OnboardingHeader.vue'
import { useRoute } from 'vue-router'

export interface OnboardingStep {
  index: number
  icon: string
  text: string
}

export default {
  components: { OnboardingHeader },
  setup() {
    const route = useRoute()
    const steps: OnboardingStep[] = [
      { index: 1, icon: 'Goods', text: 'О тебе и твоем салоне' },
      { index: 2, icon: 'PictureRounded', text: 'Твой бренд' },
      { index: 3, icon: 'User', text: 'Твои сотрудники' },
      { index: 4, icon: 'Star', text: 'Работа с клиентами' },
    ]
    const stepActiveIndex = computed(() => Number(route.path.split('/').pop()) || 1)
    const stepActive = computed(() => steps.find((s) => s.index === stepActiveIndex.value))

    return {
      stepActive,
      steps,
    }
  },
}
</script>

<template>
  <div class="page">
    <div class="container">
      <OnboardingHeader v-if="stepActive" :step="stepActive" :steps-count="steps.length" />
      <router-view v-slot="{ Component }">
        <transition mode="out-in">
          <component :is="Component" class="transition-basic" />
        </transition>
      </router-view>
    </div>
  </div>
</template>

<style lang="stylus" scoped>
:deep(.el-form-item__label)
  color $cTextMuted
  font-weight 400 !important
  font-size 12px !important
  line-height 16px !important
</style>
