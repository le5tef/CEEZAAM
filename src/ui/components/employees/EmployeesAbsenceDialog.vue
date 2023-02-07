<script lang="ts" setup>
import Modal from '@/ui/components/ModalBase.vue'
import { useDialogStore } from '@/store/dialog'
import { ref } from 'vue'
import { useEmployeesStore } from '@/store/employees'
import { EmployeeDayoffTypeEnum } from '@/client'

const dialogName = 'EmployeesAbsence'
const dialogStore = useDialogStore()
const employeeStore = useEmployeesStore()

const absenceDateStore = Object.freeze({
  startDate: null as Date | null,
  endDate: null as Date | null,
  indefinitely: false,
})
const absenceDate = ref<typeof absenceDateStore>({ ...absenceDateStore })

const closeDialog = () => {
  absenceDate.value = structuredClone(absenceDateStore)
  dialogStore.closeDialog(dialogName)
}

const save = async () => {
  const { startDate, endDate, indefinitely } = absenceDate.value
  const isValid = employeeStore.selectedEmployee && startDate && (endDate || indefinitely)
  if (!isValid) throw Error()
  await employeeStore.setEmployeeDayOff(employeeStore.selectedEmployee.id, {
    type: EmployeeDayoffTypeEnum.OTHER,
    date_from: startDate.toISOString(),
    date_to: indefinitely ? undefined : endDate?.toISOString(),
  })
  closeDialog()
}
</script>

<template>
  <Modal :width="612" :name="dialogName">
    <template #title>
      <div :class="['heading', 'font-18']">Отсутствие сотрудника</div>
    </template>
    <template #content>
      <div>
        <div>Отметьте период, в который сотрудник не будет работать</div>
        <div :class="$style.inputs">
          <el-date-picker
            v-model="absenceDate.startDate"
            :class="$style.input"
            placeholder="Выберите дату"
            size="large"
            type="date"
          />
          <div class="ml-4 mr-4">-</div>
          <el-date-picker
            v-model="absenceDate.endDate"
            :class="$style.input"
            placeholder="Выберите дату"
            size="large"
            type="date"
            :disabled="absenceDate.indefinitely"
          />
        </div>
        <el-checkbox v-model="absenceDate.indefinitely" class="mb-4">Бессрочно</el-checkbox>
        <div :class="$style.actions">
          <button :class="[$style.button, $style.outlined]" @click="closeDialog">Отмена</button>
          <button :class="[$style.button, $style.submit]" @click="save">Сохранить</button>
        </div>
      </div>
    </template>
  </Modal>
</template>

<style lang="stylus" module>

.inputs
  display flex
  margin 16px 0
  align-items center
  @media (max-width $tabletHorWidth)
    flex-direction column

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
