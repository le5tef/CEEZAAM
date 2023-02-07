<script lang="ts" setup>
import { ref } from 'vue'
import { Search } from '@element-plus/icons-vue'
import EmployeeCard from '@/ui/components/employees/EmployeesCard.vue'
import { useEmployeesStore } from '@/store/employees'
import { useDialogStore } from '@/store/dialog'
import { useUiStore } from '@/store/ui'
import type { CompanyEmployeeWithUserSchema } from '@/client'

const employeesStore = useEmployeesStore()
const dialogStore = useDialogStore()

const showNotWorking = ref(false)
const uiStore = useUiStore()
// const selectedSaloon = ref('Аэропорт')

function pickEmployee(employee: CompanyEmployeeWithUserSchema) {
  employeesStore.setSelectedEmployee(employee)
  dialogStore.openDialog('EmployeesCard')
}
</script>

<template>
  <div :class="uiStore.isMobileWidth ? 'px-4' : ''">
    <div :class="[$style.header]">
      <div :class="[$style.label, 'd-flex', 'flex-column', 'align-start']">
        <div class="mb-1 ml-1">Имя</div>
        <el-input :class="$style.input">
          <template #prefix>
            <el-icon class="el-input__icon">
              <search />
            </el-icon>
          </template>
        </el-input>
      </div>
      <div :class="[$style.label, 'd-flex', 'flex-column', 'align-start']">
        <!--        <div class="mb-1 ml-1">Салон</div>-->
        <!--        <el-select v-model="selectedSaloon" :class="$style.select" size="large">-->
        <!--          <el-option v-for="(saloon,id) in employeesStore.saloons" :key="id" :label="saloon" :value="saloon"/>-->
        <!--        </el-select>-->
      </div>
      <div :class="$style.spacer"></div>

      <el-checkbox v-model="showNotWorking" :class="$style.check_box"
        >Отображать отсутсвующих
      </el-checkbox>

      <button
        :class="[$style.button, $style.submit]"
        @click="dialogStore.openDialog('EmployeesAddEmployee')"
      >
        Добавить сотрудника
      </button>
    </div>
    <el-row :gutter="uiStore.isMobileWidth ? 0 : 24">
      <el-col
        v-for="(employee, id) in showNotWorking
          ? employeesStore.employees
          : employeesStore.worksEmployees"
        :key="id"
        :xl="3"
        :lg="4"
        :md="6"
        :sm="8"
        :span="24"
        :class="['mb-4', uiStore.isMobileWidth ? 'd-flex justify-center' : '']"
      >
        <EmployeeCard :employee="employee" @click="pickEmployee(employee)" />
      </el-col>
    </el-row>
  </div>
</template>

<style lang="stylus" module>
.card
  background #FFFFFF
  box-shadow 0 0 8px rgba(26, 14, 62, 0.25)
  border-radius 8px
  height 264px
  padding 22px 0

  &__avatar
    height 120px
    width 120px
    border-radius 8px

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
  @media (max-width: $tabletHorWidth)
    width 100%
    margin 0 0 16px 0

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
