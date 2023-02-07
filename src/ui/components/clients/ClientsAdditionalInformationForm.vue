<script lang="ts" setup>
import { useClientsStore } from '@/store/clients/clients'
import { howDidYYouKnowTypes } from '@/services/clients/utils'
const clientsStore = useClientsStore()
</script>

<template>
  <div>
    <div :class="['heading', 'font-18']">Дополнительная информация</div>
    <el-row :gutter="32">
      <el-col :md="6" :sm="12" :span="24" :xs="24">
        <el-form-item label="Откуда узнали">
          <el-select v-model="clientsStore.temp.additional.howDidYouKnow" size="large">
            <el-option
              v-for="(type, id) in howDidYYouKnowTypes"
              :key="id"
              :label="type"
              :value="type"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :md="6" :sm="12" :span="24" :xs="24">
        <el-form-item label="Противопоказания">
          <el-input v-model="clientsStore.temp.additional.contraindications" size="large" />
        </el-form-item>
      </el-col>
      <el-col :md="6" :sm="12" :span="24" :xs="24">
        <el-form-item label="Интересы">
          <el-input v-model="clientsStore.temp.additional.interests" size="large" />
        </el-form-item>
      </el-col>
      <el-col :md="6" :sm="12" :span="24" :xs="24">
        <el-form-item label="Комментарий">
          <el-input v-model="clientsStore.temp.additional.description" size="large" />
        </el-form-item>
      </el-col>
    </el-row>
  </div>
</template>

<style lang="stylus" scoped>
:deep(.el-select)
  width 100% !important
</style>

<style lang="stylus" module>
.description
  font-family: 'Verdana';
  font-style normal
  font-weight 400
  font-size 12px
  line-height 16px
  color $cTextMuted
  margin-bottom 24px
</style>
