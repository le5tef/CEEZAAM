<script lang="ts" setup>
import Modal from '@/ui/components/ModalBase.vue'
import { useEmployeesStore } from '@/store/employees'
import { onBeforeUnmount, ref } from 'vue'
import { useDialogStore } from '@/store/dialog'
import type { FormInstance, FormRules } from 'element-plus'

const dialogStore = useDialogStore()
const employeesStore = useEmployeesStore()
const scheduleTypes = ['Произвольный', '2/2', '5/2']

const stateDefault = Object.freeze({
  name: '' as string,
  schedule: '' as string,
  days: [] as string[],
  shift: '' as string,
})

const formRef = ref<FormInstance>()

const rules = ref<FormRules>({
  name: [
    {
      required: true,
      message: 'Выберите администратора',
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

const state = ref<typeof stateDefault>({ ...stateDefault })
onBeforeUnmount(() => {
  state.value = stateDefault
})
const closeDialog = () => {
  state.value = stateDefault
  dialogStore.closeDialog('EmployeesAddAdministrator')
}
const submit = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  const form_valid = await formEl.validate()
  if (form_valid && formRef.value) {
    await formRef.value.validate(async (valid) => {
      if (!valid) return
      //todo: добавление администратора
      console.log('Всё супер, красава')
    })
  }
}
</script>

<template>
  <Modal :width="612" name="EmployeesAddAdministrator">
    <template #title>
      <div :class="['heading', 'font-18']">Добавить администратора</div>
    </template>
    <template #content>
      <div>
        <el-form ref="formRef" :model="state" :rules="rules" label-position="top" @submit.prevent>
          <el-form-item label="Администратор" prop="name">
            <el-select v-model="state.name">
              <el-option
                v-for="(master, id) in employeesStore.masters"
                :key="id"
                :label="master.user.first_name"
                :value="master.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="График" prop="shift">
            <el-radio-group v-model="state.shift" class="d-flex align-start flex-column">
              <el-radio v-for="(shift, id) in scheduleTypes" :key="id" :label="shift"
                >{{ shift }}
              </el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="Даты работы" prop="days"></el-form-item>
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
