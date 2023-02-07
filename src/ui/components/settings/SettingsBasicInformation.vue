<script lang="ts" setup>
import { ref } from 'vue'
import { useSettingsStore } from '@/store/settings'
import ActionButtons from '@/ui/components/settings/ActionButtons.vue'
import SpecsForm from '@/ui/components/settings/SpecsForm.vue'
import AddressForm from '@/ui/components/settings/AddressForm.vue'
import PhoneAndEmailForm from '@/ui/components/settings/PhoneAndEmailForm.vue'
import SocialMediaForm from '@/ui/components/settings/SocialMediaForm.vue'
import ClientsTypes from '@/ui/components/settings/ClientsCategories.vue'

const settingsStore = useSettingsStore()
const activeTab = ref('first')

const address = ref(null)
const phoneAndEmail = ref(null)
const socialMedia = ref(null)
const specs = ref(null)
const clientsTypes = ref(null)

function submitContacts() {
  settingsStore.saveContacts()
}

function resetContacts() {
  settingsStore.resetContacts()
}

function submitPeculiarities() {
  settingsStore.saveFeatures()
}

function resetPeculiarities() {
  settingsStore.resetSpecs()
}

function submitClientsTypes() {
  // settingsStore.saveClientsTypes()
}

function resetClientsTypes() {
  // settingsStore.resetClientsTypes()
}
</script>

<template>
  <div>
    <el-tabs v-model="activeTab">
      <el-tab-pane label="Контактная информация" name="first">
        <div :class="$style.wrapper">
          <AddressForm ref="address" />
          <el-divider />
          <PhoneAndEmailForm ref="phoneAndEmail" />
          <el-divider />
          <SocialMediaForm ref="socialMedia" />
        </div>
        <ActionButtons @reset="resetContacts" @submit="submitContacts" />
      </el-tab-pane>
      <el-tab-pane label="Особенности салона" name="second">
        <div :class="$style.wrapper">
          <SpecsForm ref="specs" />
        </div>
        <ActionButtons @reset="resetPeculiarities" @submit="submitPeculiarities" />
      </el-tab-pane>
      <el-tab-pane label="Категории клиентов" name="third">
        <div :class="$style.wrapper">
          <ClientsTypes ref="clientsTypes" />
        </div>
        <ActionButtons @reset="resetClientsTypes" @submit="submitClientsTypes" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<style lang="stylus" scoped>
:deep(.el-form-item__label)
  color $cTextMuted
  font-weight 400 !important
  font-size 12px !important
  line-height 16px !important

:deep(.el-checkbox__label)
  word-wrap break-word
  width 100%

:deep(.el-button + .el-button)
  margin-left 0

:deep(.el-tabs__item)
  color: $cTextMuted
  font-weight: 700;
  font-size: 14px;
  line-height: 24px;
</style>

<style lang="stylus" module>
.wrapper
  padding 24px
  margin-top 24px
  background white
  overflow auto
  box-shadow 0 0 8px 0 rgba(26, 14, 62, 0.25)
  border-radius 8px

.phoneActions
  display flex !important
  justify-content left
  align-items center
  @media (max-width $tabletVerWidth)
    margin-bottom 24px


.description
  font-family: 'Verdana';
  font-style normal
  font-weight 400
  font-size 12px
  line-height 16px
  color $cTextMuted
  margin-bottom 24px
</style>
