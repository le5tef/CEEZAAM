<script setup lang="ts">
import Modal from '@/ui/components/ModalBase.vue'
import { useEmployeesStore } from '@/store/employees'
import { onBeforeUnmount, ref } from 'vue'
import { useDialogStore } from '@/store/dialog'

const dialogStore = useDialogStore()
const employeesStore = useEmployeesStore()

const motivationTypes = ref([
  'Запись на визит',
  'Продажа абонемента',
  'Продажа сертификата',
  'Продажа товаров',
  'Клиент доволен визитом',
])

const currencyTypes = ref(['RUB', 'USD'])

const rewardTypes = ref(['Процент от продажи', 'Деньгами'])

const employeeTypes = ref(['Администраторы', 'Мастера', 'Указать сотрудника(ов)'])

const stateDefault = Object.freeze({
  motivationType: 'Запись на визит' as string,
  reward: 'Процент от продажи' as string,
  sum: '' as string,
  currency: 'RUB' as string,
  employeeType: 'Администраторы' as string,
  selectedEmployees: [] as string[],
})

const state = ref<typeof stateDefault>({ ...stateDefault })
onBeforeUnmount(() => {
  state.value = stateDefault
})
const closeDialog = () => {
  state.value = stateDefault
  dialogStore.closeDialog('EmployeesAddMotivation')
}
</script>

<template>
  <Modal :width="612" name="EmployeesAddMotivation">
    <template #title>
      <div :class="['heading', 'font-18']">Новая мотивация</div>
    </template>
    <template #content>
      <div>
        <el-form label-position="top" @submit.prevent>
          <el-form-item label="Цель">
            <el-select v-model="state.motivationType">
              <el-option
                v-for="(motivation, id) in motivationTypes"
                :key="id"
                :label="motivation"
                :value="motivation"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="Награда">
            <el-radio-group v-model="state.reward">
              <el-radio-button v-for="(reward, id) in rewardTypes" :key="id" :label="reward"
                >{{ reward }}
              </el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="Сумма">
            <el-input v-model="state.sum" placeholder="Введите сумму" class="input-with-select">
              <template v-if="state.reward === rewardTypes[1]" #append>
                <el-select v-model="state.currency" placeholder="Select">
                  <el-option
                    v-for="(currency, id) in currencyTypes"
                    :key="id"
                    :label="currency"
                    :value="currency"
                  />
                </el-select>
              </template>
              <template v-else #append> %</template>
            </el-input>
          </el-form-item>
          <el-form-item label="К кому применяется">
            <el-radio-group v-model="state.employeeType">
              <el-radio-button v-for="(type, id) in employeeTypes" :key="id" :label="type"
                >{{ type }}
              </el-radio-button>
            </el-radio-group>
            <el-tabs>
              <el-tab-pane></el-tab-pane>
            </el-tabs>
          </el-form-item>
          <el-form-item v-if="state.employeeType === employeeTypes[2]" label="Сотрудники">
            <el-select-v2
              v-model="state.selectedEmployees"
              collapse-tags
              collapse-tags-tooltip
              style="width: 100%"
              filterable
              :options="employeesStore.employeesNames"
              placeholder="Выберите сотрудников"
              multiple
            />
          </el-form-item>
          <div :class="$style.actions">
            <button :class="[$style.button, $style.outlined]" @click="closeDialog">Отмена</button>
            <button :class="[$style.button, $style.submit]">Сохранить</button>
          </div>
        </el-form>
      </div>
    </template>
  </Modal>
</template>

<style lang="stylus" scoped>
:deep(.el-form-item__label)
  color $cTextMuted
  font-weight 400 !important
  font-size 12px !important
  line-height 16px !important
</style>

<style module lang="stylus">

.space
  margin: 0 4px

.shift
  display flex
  align-items center
  margin-bottom 16px

.button
  cursor pointer
  margin-right 4px
  padding 13px 16px 13px 16px
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
  color $cPrimary
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

.actions
  display flex
  flex-direction row
  justify-content right
  @media (max-width $tabletVerWidth)
    flex-direction column
</style>
