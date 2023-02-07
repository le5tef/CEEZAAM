<script lang="ts" setup>
import { ref } from 'vue'
import router from '@/router'
import { ROUTES_PATHS } from '@/constants'
import UploadInputFile from '@/ui/components/onboarding/UploadInputFile.vue'

const stateDefault = Object.freeze({
  test: '',
  checkList: [],
  crmUseAnswers: ['Не использую', 'Использую'],
  crmUse: 'Не использую',
  email: '',
  paymentWays: ['Наличные', 'Карты', 'Абонемент', 'Подарочный сертификат', 'Другое'],
})
const state = ref<typeof stateDefault>({ ...stateDefault })

function submit() {
  // emit('submit', state.value)
  // if(!isValid.value) return
  router.push(ROUTES_PATHS.ROOT)
}

function goToPreviousPage() {
  router.push(ROUTES_PATHS.ONBOARDING_STEP_3)
}

function goToNextPage() {
  router.push(ROUTES_PATHS.ROOT)
}
</script>

<template>
  <div>
    <el-row :class="$style.root" :gutter="24">
      <el-col :sm="12" :span="24">
        <div :class="['heading', 'font-18']">Уже работаете с crm?</div>
        <el-form label-position="top">
          <el-form-item label="Crm*">
            <el-select v-model="state.crmUse" :class="$style.input">
              <el-option
                v-for="option in state.crmUseAnswers"
                :key="option"
                :label="option"
                :value="option"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="Email*">
            <el-input v-model="state.email" size="large" />
          </el-form-item>
          <div :class="$style.description">
            Скачай наш <a>образец</a> клиентской базы и загрузи обратно
          </div>
          <el-form-item label="Клиентская база">
            <UploadInputFile />
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :sm="12" :span="24">
        <div :class="['heading', 'font-18']">Способы оплаты</div>
        <el-checkbox-group v-model="state.checkList" class="d-flex flex-column">
          <el-checkbox
            v-for="paymentWay in state.paymentWays"
            :key="paymentWay"
            :label="paymentWay"
            size="large"
          />
        </el-checkbox-group>
      </el-col>
    </el-row>
    <button :class="[$style.submit, $style.button]" @click="submit()">Далее</button>
    <button :class="[$style.outlined, $style.button]" @click="goToPreviousPage()">Назад</button>
    <button :class="[$style.outlined, $style.button]" @click="goToNextPage()">Заполню позже</button>
  </div>
</template>

<style lang="stylus" scoped>
:deep(.el-checkbox)
  margin-right 0
</style>

<style lang="stylus" module>
.root
  margin-bottom 40px

.input
  width 100%

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

.primary
  color $cPrimary !important
  font-weight 700
  font-family Verdana

.outlined
  border 1px solid $cPrimary
  color $cPrimary
  background: white

.submit
  border none
  color white
  background: $cPrimary

.description
  margin-bottom 16px
</style>
