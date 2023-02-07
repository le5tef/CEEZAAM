<script lang="ts" setup>
import { defineProps } from 'vue'
import { Message, Phone } from '@element-plus/icons-vue'
import { CommunicationWaysEnum } from '@/enums'
import WhatsAppLogoSvg from '@/ui/components/Icons/WhatsAppLogoSvg.vue'
import TelegramLogoSvg from '@/ui/components/Icons/TelegramLogoSvg.vue'
import type { IClientCommunicationWay } from '@/entities/clients'

defineProps({
  clientContacts: { type: Object, required: true },
})
const href = (type: string, messenger: string | null) => {
  if (type === CommunicationWaysEnum.CALLS) return 'tel:'
  if (messenger === CommunicationWaysEnum.TELEGRAM) return 'https://t.me/+'
  if (messenger === CommunicationWaysEnum.WHATSAPP) return 'https://wa.me/'
}
const communicateButtonText = (communicationWay: IClientCommunicationWay) => {
  return [
    CommunicationWaysEnum.SMS,
    CommunicationWaysEnum.TELEGRAM,
    CommunicationWaysEnum.WHATSAPP,
  ].includes(communicationWay.channel)
    ? 'Написать'
    : 'Позвонить'
}
</script>

<template>
  <el-dropdown-menu v-if="clientContacts">
    <el-dropdown-item
      v-for="(communicationWay, id) in clientContacts.allowCommunicationWays"
      :key="id"
    >
      <a
        :class="[
          $style.button,
          'w-full',
          clientContacts.allowCommunicationWays.includes(communicationWay)
            ? 'text-accent'
            : 'a-disabled',
        ]"
        :href="href(communicationWay, communicationWay.channel) + `${clientContacts.phone}`"
        target="_blank"
      >
        <el-icon v-if="communicationWay.channel === CommunicationWaysEnum.CALLS" :size="22">
          <Phone class="text-accent" />
        </el-icon>
        <el-icon v-if="communicationWay.channel === CommunicationWaysEnum.SMS" :size="22">
          <Message class="text-accent" />
        </el-icon>
        <WhatsAppLogoSvg
          v-else-if="communicationWay.channel === CommunicationWaysEnum.WHATSAPP"
          class="mr-1 text-accent"
          style="height: 21px; width: 21px"
        />
        <TelegramLogoSvg
          v-else-if="communicationWay.channel === CommunicationWaysEnum.TELEGRAM"
          class="mr-1 text-accent"
          style="height: 21px; width: 21px"
        />
        <div class="text-accent">
          {{ communicateButtonText(communicationWay) }}
        </div>
      </a>
    </el-dropdown-item>
  </el-dropdown-menu>
</template>

<style lang="stylus" module>
.button
  display flex
  align-items center
  cursor pointer !important
  width 100% !important
  padding 0 20px !important
  font-family 'Verdana' !important
  font-style normal !important
  font-weight 700 !important
  font-size 14px
  line-height 24px
  border-radius: 8px
  flex: none
  order: 0
  flex-grow: 0
  border none !important
  color $cAccent !important
  @media (max-width: $tabletVerWidth)
    width 100%
    margin 0 0 16px 0

.outlined
  border 1px solid $cPrimary !important
  color $cPrimary !important
  background: white

.submit
  border none
  color white
  background: $cPrimary
</style>
