<script lang="ts" setup>
import { useClientsStore } from '@/store/clients/clients'
import { SexEnum } from '@/enums'
import { sexReadable } from '@/services/clients'
import { distanceTypes } from '@/store/clients'

const clientsStore = useClientsStore()

const sexTypes = [
  { label: sexReadable(SexEnum.M), value: SexEnum.M },
  { label: sexReadable(SexEnum.F), value: SexEnum.F },
]
</script>

<template>
  <div>
    <div :class="$style.heading">Основная информация</div>

    <el-row :gutter="32">
      <el-col :md="6" :sm="12" :span="24" :xs="24">
        <el-form-item label="Имя" prop="general.firstName">
          <el-input v-model="clientsStore.temp.general.firstName" size="large" />
        </el-form-item>
      </el-col>
      <el-col :md="6" :sm="12" :span="24" :xs="24">
        <el-form-item label="Отчество">
          <el-input v-model="clientsStore.temp.general.patronymic" size="large" />
        </el-form-item>
      </el-col>
      <el-col :md="6" :sm="12" :span="24" :xs="24">
        <el-form-item label="Фамилия">
          <el-input v-model="clientsStore.temp.general.lastName" size="large" />
        </el-form-item>
      </el-col>
      <el-col :md="6" :sm="12" :span="24" :xs="24">
        <el-form-item label="Пол">
          <el-select v-model="clientsStore.temp.general.sex" size="large">
            <el-option
              v-for="{ label, value } in sexTypes"
              :key="value"
              :label="label"
              :value="value"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :md="6" :sm="12" :span="24" :xs="24">
        <el-form-item label="Дата рождения">
          <el-date-picker
            v-model="clientsStore.temp.general.birthDate"
            class="w-full"
            type="date"
            placeholder="Выберите день"
            size="large"
          />
        </el-form-item>
      </el-col>
      <el-col :md="6" :sm="12" :span="24" :xs="24">
        <el-form-item label="Близость к салону">
          <el-select v-model="clientsStore.temp.general.distanceFromSaloon" size="large">
            <el-option
              v-for="(type, id) in distanceTypes"
              :key="id"
              :label="type.label"
              :value="type.label"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :md="6" :sm="12" :span="24" :xs="24">
        <el-form-item label="Категория клиента">
          <el-select-v2
            v-if="clientsStore.ready"
            v-model="clientsStore.temp.general.categories"
            collapse-tags
            collapse-tags-tooltip
            style="width: 100%"
            value-key="value.id"
            filterable
            :options="clientsStore.categoriesOptions"
            multiple
          />
        </el-form-item>
      </el-col>
      <el-col :md="6" :sm="12" :span="24" :xs="24">
        <el-form-item label="Любимый мастер">
          <el-input v-model="clientsStore.temp.general.favoriteMaster" size="large" />
        </el-form-item>
      </el-col>
    </el-row>
  </div>
</template>

<style lang="stylus" scoped>
:deep(.el-select)
  width 100% !important
  height 40px

:deep(.el-input)
  width 100% !important
  height 40px

:deep(.el-select-v2__wrapper)
  width 100% !important
  min-height 40px

:deep(.el-form-item__label)
  color $cTextMuted
  font-weight 400 !important
  font-size 12px !important
  line-height 16px !important
</style>

<style lang="stylus" module>
.heading
  font-size 18px
  line-height 24px
  font-family Verdana
  font-weight 700
  color $cText
  margin-bottom 16px

.description
  font-family: 'Verdana';
  font-style normal
  font-weight 400
  font-size 12px
  line-height 16px
  color $cTextMuted
  margin-bottom 24px
</style>
