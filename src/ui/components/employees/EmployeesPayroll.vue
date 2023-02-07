<script lang="ts" setup>
import { computed, ref, watch } from 'vue'
// import {InfoFilled} from '@element-plus/icons-vue'
import { useUiStore } from '@/store'
// import {useDialogStore} from '@/store/dialog'
import { useEmployeesStore } from '@/store/employees'
import { roleReadable } from '@/services/CompanyService'

const uiStore = useUiStore()
// const dialogStore = useDialogStore()
const employeesStore = useEmployeesStore()

const employeeType = ref('Мастера')

watch(
  () => employeeType.value,
  (newValue: string) => {
    if (newValue === 'Мастера') employeesStore.setShowMasters(true)
    else employeesStore.setShowMasters(false)
  }
)

const columnWidth = computed(() => {
  if (uiStore.isMobileWidth) return 120
  if (uiStore.isDesktopWidth)
    if (uiStore.documentWidth > uiStore.xlDesktopBreakpoint) return 200
    else return 160
  if (!uiStore.isMobileWidth && !uiStore.isDesktopWidth) return 150
  return 120
})

const months = ref([
  'Январь',
  'Февраль',
  'Март',
  'Апрель',
  'Май',
  'Июнь',
  'Июль',
  'Август',
  'Сентябрь',
  'Октябрь',
  'Ноябрь',
  'Декабрь',
])

const selectedMonth = ref('Январь')

const currencyTypes = ref(['RUB', 'USD'])

const employees = computed(() => {
  return employeesStore.employees.map((x) => ({
    name: `${x.user.first_name} ${x.user.last_name}`,
    type: roleReadable(x.role),
    payroll: {
      currency: 'RUB',
      shiftsQuantity: 0,
      salaryPerShift: 0,
      award: 0,
      additionalAward: 0,
      forfeit: 0,
      total: 0,
    },
  }))
})
</script>
<template>
  <div :class="$style.wrapper">
    <div class="w-full">
      <div
        :class="
          uiStore.isMobileWidth ||
          uiStore.isMobileWidth ||
          (!uiStore.isMobileWidth && !uiStore.isDesktopWidth)
            ? 'flex-column'
            : 'mb-4'
        "
        class="d-flex align-center w-full"
      >
        <div :class="[$style.header]">
          <el-select v-model="selectedMonth" :class="[$style.select, 'w-full']" size="large">
            <el-option v-for="(month, id) in months" :key="id" :label="month" :value="month" />
          </el-select>
        </div>

        <div class="spacer"></div>
        <button :class="[$style.outlined, $style.button]">Выгрузить в excel</button>
        <button :class="[$style.submit, $style.button]">Сохранить изменения</button>
      </div>
    </div>

    <el-table :data="employees" style="width: 100%">
      <el-table-column :width="columnWidth" label="Сотрудник" prop="name" />
      <el-table-column :width="columnWidth" label="Должность" prop="type" />
      <el-table-column :width="columnWidth" label="Валюта" prop="payroll.currency">
        <template #default="scope">
          <el-select v-model="scope.row.payroll.currency" :default-first-option="true">
            <el-option
              v-for="(currency, id) in currencyTypes"
              :key="id"
              :label="currency"
              :value="currency"
            />
          </el-select>
        </template>
      </el-table-column>
      <el-table-column label="Кол-во смен" prop="payroll.shiftsQuantity" :width="columnWidth">
        <template #default="scope">
          <el-input v-model="scope.row.payroll.shiftsQuantity" type="number"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="Оклад за смену" prop="payroll.salaryPerShift" :width="columnWidth">
        <template #default="scope">
          <el-input v-model="scope.row.payroll.salaryPerShift" type="number"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="Премии" prop="payroll.award" width="100">
        <template #default="scope">
          <div class="d-flex align-center">
            <el-dropdown v-if="scope.row.payroll.award" placement="top">
              <el-icon class="text-muted">
                <InfoFilled />
              </el-icon>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item
                    >Суммарная премия {{ scope.row.payroll.award }}
                  </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
            <div class="ml-1">
              {{ scope.row.payroll.award }}
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column :width="columnWidth" label="Доп. премия" prop="payroll.additionalAward">
        <template #default="scope">
          <el-input v-model="scope.row.payroll.additionalAward" type="number"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="Депримирование" prop="payroll.forfeit" width="150">
        <template #default="scope">
          <el-input v-model="scope.row.payroll.forfeit" type="number"></el-input>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="Итого" prop="payroll.total" width="100">
        <template #default="scope">
          <div :class="$style.heading">{{ scope.row.payroll.total }}</div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<style lang="stylus" module>
.wrapper
  padding 16px
  box-shadow 0 0 8px rgba(26, 14, 62, 0.25)
  border-radius 8px
  background white

.button
  cursor pointer
  margin-left 24px
  height 32px
  word-break keep-all
  word-wrap break-word
  font-family 'Verdana'
  font-style normal
  font-weight 700
  font-size 14px
  line-height 24px
  border-radius: 8px
  flex: none
  color $cPrimary
  order: 0
  flex-grow: 0
  @media (max-width: $tabletHorWidth)
    width 100%
    margin 0 0 16px 0


.select
  @media (max-width: $tabletVerWidth)
    width 100%

.header
  display flex
  @media (max-width: $tabletHorWidth)
    width 100%
    margin-bottom 16px

.outlined
  border 1px solid $cPrimary
  color $cPrimary
  background: white

.submit
  border none
  color white
  background: $cPrimary
</style>
