<script lang="ts" setup>
import { ref } from 'vue'
import type { FormInstance } from 'element-plus'
import { useSettingsStore } from '@/store/settings'

const settingsStore = useSettingsStore()
const socialMediaRef = ref<FormInstance>()
</script>

<template>
  <div>
    <div :class="['heading', 'font-18']">Социальные сети</div>
    <el-form
      ref="socialMediaRef"
      :model="settingsStore.temp.socialMedia"
      label-position="top"
      @submit.prevent
    >
      <el-row :gutter="32">
        <el-col :md="6" :sm="12" :span="24" :xs="24">
          <el-form-item label="Facebook">
            <el-input v-model="settingsStore.temp.socialMedia.fb" size="large" />
          </el-form-item>
        </el-col>
        <el-col :md="6" :sm="12" :span="24" :xs="24">
          <el-form-item label="VK">
            <el-input v-model="settingsStore.temp.socialMedia.vk" size="large" />
          </el-form-item>
        </el-col>
        <el-col :md="6" :sm="12" :span="24" :xs="24">
          <el-form-item label="Instagram">
            <el-input v-model="settingsStore.temp.socialMedia.ig" size="large" />
          </el-form-item>
        </el-col>
        <el-col :md="6" :sm="12" :span="24" :xs="24">
          <el-form-item label="WhatsApp">
            <el-input v-model="settingsStore.temp.socialMedia.wa" size="large" />
          </el-form-item>
        </el-col>
        <el-col :md="6" :sm="12" :span="24" :xs="24">
          <el-form-item label="Telegram">
            <el-input v-model="settingsStore.temp.socialMedia.tg" size="large" />
          </el-form-item>
        </el-col>
        <el-col :md="6" :sm="12" :span="24" :xs="24">
          <el-form-item label="Viber">
            <el-input v-model="settingsStore.temp.socialMedia.vb" size="large" />
          </el-form-item>
        </el-col>
        <el-col :md="6" :sm="12" :span="24" :xs="24">
          <el-form-item label="TikTok">
            <el-input v-model="settingsStore.temp.socialMedia.tt" size="large" />
          </el-form-item>
        </el-col>
        <el-col :md="6" :sm="12" :span="24" :xs="24">
          <el-form-item label="Другая">
            <el-input v-model="settingsStore.temp.socialMedia.another" size="large" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<style lang="stylus" scoped>
:deep(.el-form-item__label)
  color $cTextMuted
  font-weight 400 !important
  font-size 12px !important
  line-height 16px !important

:deep(.el-checkbox__label)
  word-wrap break-word
  width 100%

:deep(.el-button + .el-button)
  margin-left 0

:deep(.el-tabs__item)
  color: $cTextMuted
  font-weight: 700;
  font-size: 14px;
  line-height: 24px;
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
