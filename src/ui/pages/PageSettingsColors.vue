<script lang="ts" setup>
import { computed } from 'vue'
import SettingsColors from '@/ui/components/settings/SettingsColors.vue'
import { useCompanyStore } from '@/store/company'
import { buildMediaUrl } from '@/utils/mediaUrl'
import { useSettingsStore } from '@/store/settings'
import type { CompanyColorsSettings } from '@/entities/settings'

const companyStore = useCompanyStore()
if (!companyStore.currentCompany) throw Error('Company not found')

const settingsStore = useSettingsStore()
settingsStore.resetTheming()

const currentCompanyLogo = computed(() =>
  companyStore.currentCompany?.logo ? buildMediaUrl(companyStore.currentCompany.logo) : undefined
)

const colorSettings = computed({
  get: (): CompanyColorsSettings => {
    return {
      primary_color: settingsStore.temp.theming.primary.hex,
      accent_color: settingsStore.temp.theming.accent.hex,
      logo: settingsStore.temp.theming.logo || null,
    }
  },
  set(data: CompanyColorsSettings) {
    settingsStore.temp.theming.primary.hex = data.primary_color
    settingsStore.temp.theming.accent.hex = data.accent_color
    settingsStore.temp.theming.logo = data.logo || undefined
  },
})
</script>

<template>
  <div>
    <div :class="$style.root">
      <SettingsColors v-model="colorSettings" :current-logo-src="currentCompanyLogo" />
    </div>
  </div>
</template>

<style lang="stylus" scoped>
:deep(.vc-slider)
  width 100%
</style>
<style lang="stylus" module>
.root
  padding 24px
  box-shadow 0 0 8px 0 rgba(26, 14, 62, 0.25)
  border-radius 8px
  background white

.upload_wrapper
  max-width 320px

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
