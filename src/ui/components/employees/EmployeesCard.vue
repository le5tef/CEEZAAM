<script setup lang="ts">
import type { PropType } from 'vue'
import { computed, defineProps } from 'vue'
import type { CompanyEmployeeWithUserSchema } from '@/client'
import { buildMediaUrl } from '@/utils/mediaUrl'
import { roleReadable } from '@/services/CompanyService'
import { useCompanyStore } from '@/store/company'

const props = defineProps({
  employee: {
    type: Object as PropType<CompanyEmployeeWithUserSchema>,
    required: true,
  },
})

const companyStore = useCompanyStore()

const officeName = computed(() =>
  props.employee.attached_office_id
    ? companyStore.findOfficeNameById(props.employee.attached_office_id)
    : ''
)

const role = computed(() => roleReadable(props.employee.role))
</script>

<template>
  <div class="d-flex flex-column align-center w-full h-full" :class="$style.card">
    <div :class="$style.avatar_wrapper">
      <img
        v-if="employee.avatar"
        :class="[$style.card__avatar, 'mb-1']"
        :src="buildMediaUrl(employee.avatar)"
        alt=""
      />
      <div v-else :class="[$style.card__empty_avatar, 'mb-1']">
        {{ employee.user.first_name?.slice(0, 1) }}
      </div>
      <div v-if="employee.active_dayoff" :class="$style.missing">не работает</div>
    </div>
    <div :class="[$style.heading, 'mb-1']">{{ employee.user.first_name }}</div>
    <div class="mb-1">{{ role }}</div>
    <div :class="[$style.description, 'mb-1']">{{ employee.description }}</div>
    <div>{{ officeName }}</div>
  </div>
</template>

<style lang="stylus" module>
.card
  background #FFFFFF
  box-shadow 0 0 8px rgba(26, 14, 62, 0.25)
  border-radius 8px
  max-width 200px
  max-height 264px
  padding 22px 20px
  cursor: pointer

  &__avatar
    height 120px
    width 120px
    border-radius 8px
    object-fit cover

  &__empty_avatar
    border-radius 8px
    min-height 120px
    min-width 120px
    background $cAccent
    color white
    display flex
    align-items center
    justify-content center
    font-size 30px

.avatar_wrapper
  position relative

.missing
  white-space: nowrap;
  display flex
  position absolute
  background white
  bottom 15px
  padding 2px
  border-radius 4px
  left 50%
  transform translateX(-50%)

.heading
  font-weight 700
  font-size 14px
  line-height 24px
  text-align center

.description
  font-weight 400
  font-size 14px
  line-height 24px
  color $cTextMuted

.button
  cursor pointer
  padding 13px 12px 13px 12px
  width 220px
  height 50px
  word-break break-all
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
    margin 8px 0 8px 0

.submit
  border none
  color white
  background: $cPrimary

.check_box
  margin-right 16px !important
  @media (max-width: $tabletVerWidth)
    width 100%
    margin 0 0 16px 0 !important

.header
  display flex
  margin-bottom 16px
  align-items center
  @media (max-width $tabletHorWidth)
    flex-direction column
    justify-content center

.label
  font-weight 400
  font-size 12px
  line-height 16px
  color $cTextMuted
  margin-right 16px
  @media (max-width $tabletHorWidth)
    margin-right 0
    margin-bottom 16px
    width 100% !important

.spacer
  flex-grow 2

.select
  height 40px
  @media (max-width $tabletHorWidth)
    width 100% !important

.input
  height 40px
  @media (max-width $tabletHorWidth)
    width 100% !important
</style>
