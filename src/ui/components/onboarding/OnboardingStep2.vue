<script lang="ts" setup>
import { computed, ref } from 'vue'
import router from '@/router'
import { ROUTES_PATHS } from '@/constants'
import { useOnboardingStore } from '@/store/onboarding'
import { useCompanyStore } from '@/store/company'
import { buildMediaUrl } from '@/utils/mediaUrl'
import type { CompanyColorsSettings } from '@/entities/settings/company_colors'
import SettingsColors from '@/ui/components/settings/SettingsColors.vue'

const src = ref<string | null>(null)

const formData = ref<CompanyColorsSettings>({
  logo: null,
  primary_color: '#404DBF',
  accent_color: '#BF40B7',
})

const onboardingStore = useOnboardingStore()
const companyStore = useCompanyStore()

if (!onboardingStore.firstStepFinished) {
  router.replace(ROUTES_PATHS.ONBOARDING_STEP_1)
} else {
  if (companyStore.currentCompany) {
    onboardingStore.updateCompany({
      type: companyStore.currentCompany.type,
      title: companyStore.currentCompany.title,
    })
  }
  if (companyStore.currentCompanyOffice) {
    onboardingStore.updateOffice({
      workplaces_count: companyStore.currentCompanyOffice?.workplaces_count,
    })
  }
}

async function submit() {
  onboardingStore.updateCompany({
    logo: formData.value.logo,
    primary_color: formData.value.primary_color,
    accent_color: formData.value.accent_color,
  })
  await onboardingStore.saveCompany()
  await onboardingStore.saveOffice()
  await router.push(ROUTES_PATHS.ONBOARDING_STEP_3)
}

function goToPreviousPage() {
  router.push(ROUTES_PATHS.ONBOARDING_STEP_1)
}

const currentCompanyLogo = computed(() =>
  companyStore.currentCompany?.logo ? buildMediaUrl(companyStore.currentCompany.logo) : undefined
)

if (companyStore.currentCompany) {
  src.value = companyStore.currentCompany.logo
  formData.value.primary_color = companyStore.currentCompany.primary_color
  formData.value.accent_color = companyStore.currentCompany.accent_color
}
</script>

<template>
  <div :class="$style.root">
    <SettingsColors
      v-model="formData"
      :current-logo-src="currentCompanyLogo"
      :custom-save="true"
      @submit="submit"
    >
      <template #actions>
        <button :class="[$style.submit, $style.button]" @click="submit">Далее</button>
        <button :class="[$style.outlined, $style.button]" @click="goToPreviousPage()">Назад</button>
      </template>
    </SettingsColors>
  </div>
</template>

<style lang="stylus" scoped>
:deep(.vc-slider)
  width 100%
</style>
<style lang="stylus" module>
.root
  margin-top 24px

.template
  width 66%
  height 291px
  border-radius 4px
  overflow hidden
  display flex
  box-shadow 0 0 8px rgba(26, 14, 62, 0.25)

  &__menu
    width 20%
    height 100%

    &__logo
      display flex
      justify-content center
      align-items center
      height 30%

  &__box
    width 100%
    height 20%

  &__container
    width 80%
    padding 5%
    display flex
    justify-content space-between

  &__col
    width 50%
    height 100%
    display flex

  &__button
    width 65%
    height 15%
    @media (max-width $phoneWidth)
      width 100%

  &__small_button
    width 45%
    height 100%

  &__buttons
    height 10%
    width 75%
    display flex
    justify-content space-between
    @media (max-width $phoneWidth)
      width 100%
  @media (max-width $tabletVerWidth)
    width 100%
    max-height 230px
    min-height 140px

.heading
  font-size 18px
  line-height 24px
  font-family Verdana
  font-weight 700
  color $cText
  margin-bottom 16px

.input
  margin-top 16px

.button
  cursor pointer
  margin 0 24px 16px 0
  padding 0 20px
  width 180px
  height 50px
  font-family 'Verdana'
  font-style normal
  font-weight 700
  font-size 14px
  line-height 24px
  border-radius: 8px
  flex: none
  order: 0
  flex-grow: 0
  @media (max-width: $tabletVerWidth)
    width 100%
    margin 0 0 16px 0

.outlined
  border 1px solid $cPrimary
  color $cPrimary
  background: white

.submit
  border none
  color white
  background: $cPrimary
</style>
