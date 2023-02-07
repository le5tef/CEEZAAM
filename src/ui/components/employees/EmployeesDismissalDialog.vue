<script lang="ts" setup>
import Modal from '@/ui/components/ModalBase.vue'
import { useEmployeesStore } from '@/store/employees'
import { useDialogStore } from '@/store/dialog'

const employeesStore = useEmployeesStore()
const dialogStore = useDialogStore()
const dialogName = 'EmployeesDismissal'

async function dismiss() {
  if (!employeesStore.selectedEmployeeId) {
    throw Error('Employee must be selected')
  }
  await employeesStore.employeeDismiss(employeesStore.selectedEmployeeId)
  dialogStore.closeDialog(dialogName)
}
</script>

<template>
  <Modal :width="612" :name="dialogName">
    <template #title>
      <div :class="['heading', 'font-18']">Увольнение сотрудника</div>
    </template>
    <template #content>
      <div class="d-flex flex-column">
        <div v-if="employeesStore.selectedEmployee" class="pa-2 mb-4">
          Вы уверены, что
          {{ employeesStore.selectedEmployee.user.first_name }} больше не работает в компании?
          Действие нельзя будет отменить.
        </div>
        <div :class="['d-flex', 'justify-end', $style.actions]">
          <button
            :class="[$style.button, $style.outlined]"
            @click="dialogStore.closeDialog('EmployeesDismissal')"
          >
            Отмена
          </button>
          <button :class="[$style.button, $style.submit]" @click="dismiss">Уволить</button>
        </div>
      </div>
    </template>
  </Modal>
</template>

<style lang="stylus" module>

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
