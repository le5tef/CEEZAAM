<script lang="ts" setup>
import Modal from '@/ui/components/ModalBase.vue'
import { useEmployeesStore } from '@/store/employees'
import { computed, ref } from 'vue'
import { useDialogStore } from '@/store/dialog'
import { useScheduleStore } from '@/store/schedule'
import { daysOfWeek } from '@/services/ScheduleService/utils'
import type { Weekdays } from '@/client'
import type { FormInstance, FormRules } from 'element-plus'

const dialogStore = useDialogStore()
const employeesStore = useEmployeesStore()
const scheduleStore = useScheduleStore()

const stateDefault = Object.freeze({
  name: '' as string,
  shift: '' as string,
  days: [] as Weekdays[],
})

const state = ref<typeof stateDefault>({ ...stateDefault })
const dialogName = 'EmployeesAddMaster'
const shifts = computed(() => [{ pretty: 'Все смены', id: '' }, ...scheduleStore.prettyShifts])
const formRef = ref<FormInstance>()

const rules = ref<FormRules>({
  name: [
    {
      required: true,
      message: 'Выберите мастера',
      trigger: 'blur',
    },
  ],
  shift: [
    {
      required: true,
      message: 'Выберите смену',
      trigger: 'blur',
    },
  ],
  days: [
    {
      required: true,
      message: 'Выберите график ',
      trigger: 'blur',
    },
  ],
})

const closeDialog = () => {
  state.value = { ...stateDefault }
  dialogStore.closeDialog(dialogName)
}

async function submit(formEl: FormInstance | undefined) {
  if (!formEl) return
  const form_valid = await formEl.validate()
  if (form_valid && formRef.value) {
    await formRef.value.validate(async (valid) => {
      if (!valid) return
      await scheduleStore.addMasterSchedule({
        employeeId: state.value.name,
        weekdays: state.value.days,
        shiftId: state.value.shift,
        after: scheduleStore.dateFrom,
        before: null,
      })
      closeDialog()
      await scheduleStore.fetchSchedule()
    })
  }
}
</script>

<template>
  <Modal :name="dialogName" :width="612">
    <template #title>
      <div :class="['heading', 'font-18']">Добавить мастера</div>
    </template>
    <template #content>
      <div>
        <el-form ref="formRef" :model="state" :rules="rules" label-position="top" @submit.prevent>
          <el-form-item label="Мастер" prop="name">
            <el-select v-model="state.name" size="large">
              <el-option
                v-for="(master, id) in employeesStore.masters"
                :key="id"
                :label="master.user.first_name"
                :value="master.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="Смена" prop="shift">
            <el-select v-model="state.shift" size="large">
              <el-option
                v-for="(shift, id) in shifts"
                :key="id"
                :label="shift.pretty"
                :value="shift.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="График" prop="days">
            <el-checkbox-group v-model="state.days" class="d-flex flex-column align-start">
              <el-checkbox v-for="(day, id) in daysOfWeek" :key="id" :label="id"
                >{{ day }}
              </el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <div :class="$style.actions">
            <button :class="[$style.button, $style.outlined]" @click="closeDialog">Отмена</button>
            <button :class="[$style.button, $style.submit]" @click="submit(formRef)">
              Сохранить
            </button>
          </div>
        </el-form>
      </div>
    </template>
  </Modal>
</template>

<style lang="stylus" module>
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
