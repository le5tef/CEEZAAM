<script lang="ts" setup>
import type { Phone } from '@/store/settings'
import { useSettingsStore } from '@/store/settings'
import { DeleteFilled, Plus } from '@element-plus/icons-vue'
import { ref } from 'vue'
import type { FormInstance } from 'element-plus'

const phoneAndEmailRef = ref<FormInstance>()

const settingsStore = useSettingsStore()

const phoneAndEmailForm = Object.freeze({
  phones: [
    {
      phone: '',
      additional: '',
      description: '',
      isHidden: false,
    } as Phone,
  ],
  saloonEmail: '',
  reportEmail: '',
})
const phoneAndEmail = ref({ ...phoneAndEmailForm })

function addPhone() {
  phoneAndEmail.value.phones.push({
    phone: '',
    additional: '',
    description: '',
    isHidden: false,
  })
}

function removePhone(id: number) {
  phoneAndEmail.value.phones = phoneAndEmail.value.phones.filter((x, index) => {
    return index !== id
  })
}

function setIsHidden(id: number) {
  phoneAndEmail.value.phones[id].isHidden = !phoneAndEmail.value.phones[id].isHidden
}
</script>

<template>
  <div>
    <div :class="['heading', 'font-18']">Телефон и email</div>
    <div :class="$style.description">
      Скрытые номера не отображаются публично для ваших клиентов
    </div>
    <el-form ref="phoneAndEmailRef" :model="settingsStore.temp.contacts" label-position="top">
      <el-row v-for="(phone, id) in settingsStore.temp.contacts.phones" :key="id" :gutter="24">
        <el-col :lg="6" :md="12" :sm="12" :span="24" :xs="24">
          <el-form-item label="Телефон" prop="phone">
            <el-input v-model="phone.phone" size="large" :type="phone.isHidden ? 'password' : ''" />
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="12" :sm="12" :span="24" :xs="24">
          <el-form-item label="Добавочный" prop="additional">
            <el-input v-model="phone.additional" size="large" />
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="12" :sm="12" :span="24" :xs="24">
          <el-form-item label="Описание" prop="description">
            <el-input v-model="phone.description" size="large" />
          </el-form-item>
        </el-col>

        <el-col :lg="6" :md="12" :sm="12" :span="24" :xs="24" :class="$style.phoneActions">
          <el-button text @click="setIsHidden(id)">
            {{ !phone.isHidden ? 'Скрыть телефон' : 'Расскрыть телефон' }}
          </el-button>
          <el-button text @click="addPhone">
            <el-icon>
              <Plus />
            </el-icon>
          </el-button>
          <el-button
            v-if="settingsStore.temp.contacts.phones.length > 1"
            text
            @click="removePhone(id)"
          >
            <el-icon>
              <DeleteFilled />
            </el-icon>
          </el-button>
        </el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col :lg="12" :sm="12">
          <el-form-item label="Email салона" prop="description">
            <el-input v-model="settingsStore.temp.contacts.saloonEmail" size="large" />
          </el-form-item>
        </el-col>
        <el-col :lg="12" :sm="12">
          <el-form-item label="Email для отчётов" prop="description">
            <el-input v-model="settingsStore.temp.contacts.reportEmail" size="large" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
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
