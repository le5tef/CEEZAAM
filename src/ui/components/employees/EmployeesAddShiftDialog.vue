<script setup lang="ts">
import Modal from '@/ui/components/ModalBase.vue'
import { Close, Plus } from '@element-plus/icons-vue'
import { computed, ref } from 'vue'
import { useDialogStore } from '@/store/dialog'
import { useScheduleStore } from '@/store/schedule'
import { useCompanyStore } from '@/store/company'
import { ApiError } from '@/client'
import { reportError } from '@/utils'

const dialogStore = useDialogStore()
const scheduleStore = useScheduleStore()
const companyStore = useCompanyStore()
const type = ref<boolean>(false)
const shifts = computed<Shift[]>(() => [...(scheduleStore.shifts || []), ...tempShifts.value])

interface TempShift {
  time_from: string
  time_to: string
}

interface Shift extends TempShift {
  id?: string
}

const tempShifts = ref<TempShift[]>([])

function addShift() {
  tempShifts.value.push({ time_from: '00:00', time_to: '00:00' })
}

async function removeShift(shift: Shift) {
  if (!shift.id) {
    tempShifts.value = tempShifts.value.filter((x) => x !== shift)
  } else {
    await scheduleStore.deleteShift(shift.id)
    await scheduleStore.fetchShifts()
  }
}

async function save() {
  if (!companyStore.currentCompanyOffice) throw Error('Cannot save shifts, office not selected')
  for (const shift of tempShifts.value) {
    try {
      await scheduleStore.createShift({
        ...shift,
        office_id: companyStore.currentCompanyOffice.id,
      })
      tempShifts.value = tempShifts.value.filter((x) => x !== shift)
    } catch (error) {
      if (error instanceof ApiError) {
        reportError(error, {
          prefix: 'EmployeesAddShiftDialog: save()',
          name: error.body.error.msg,
          notify: true,
        })
      }
    }
  }
  await scheduleStore.fetchShifts()
}

const closeDialog = () => {
  dialogStore.closeDialog('EmployeesAddShift')
}
</script>

<template>
  <Modal :width="350" name="EmployeesAddShift">
    <template #title>
      <div :class="['heading', 'font-18']">Смены</div>
    </template>
    <template #content>
      <div>
        <div v-for="(shift, idx) in shifts" :key="idx" :class="[$style.shift]">
          <el-time-picker
            v-if="type"
            v-model="shift.time_from"
            :disabled="!!shift.id"
            placeholder="Выберите время"
          />
          <el-time-select
            v-else
            v-model="shift.time_from"
            :disabled="!!shift.id"
            start="08:30"
            step="00:15"
            end="18:30"
            placeholder="Выберите время"
          />
          <div :class="$style.space">-</div>
          <el-time-picker
            v-if="type"
            v-model="shift.time_to"
            :disabled="!!shift.id"
            placeholder="Выберите время"
          />
          <el-time-select
            v-else
            v-model="shift.time_to"
            :disabled="!!shift.id"
            start="08:30"
            step="00:15"
            end="18:30"
            placeholder="Выберите время"
          />
          <el-button text @click="removeShift(shift)">
            <el-icon>
              <close />
            </el-icon>
          </el-button>
        </div>
        <button :class="[$style.button, 'mb-4']" @click="addShift">
          <el-icon>
            <plus />
          </el-icon>
          Добавить смену
        </button>
        <div class="d-flex justify-end">
          <button :class="[$style.button, $style.outlined]" @click="closeDialog">Отмена</button>
          <button :class="[$style.button, $style.submit]" @click="save">Сохранить</button>
        </div>
      </div>
    </template>
  </Modal>
</template>

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
</style>
