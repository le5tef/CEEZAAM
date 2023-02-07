<script lang="ts" setup>
import { defineProps, ref } from 'vue'
import { Close, Upload } from '@element-plus/icons-vue'
import UploadInput from '@/ui/components/onboarding/UploadInput.vue'

const props = defineProps({
  closable: { type: Boolean, default: false },
})

const src = ref<string | null>(null)
const fileName = ref<string | null>(null)
const handleImage = (file: File | null) => {
  if (file) {
    fileName.value = file.name
    src.value = URL.createObjectURL(file)
  } else {
    src.value = null
  }
}
const removeFile = () => {
  src.value = null
}
</script>
<template>
  <UploadInput @change="handleImage">
    <template v-if="src">
      <div class="w-full h-full d-flex justify-center align-center">
        <div>{{ fileName }}</div>
        <el-button
          v-if="props.closable"
          circle
          class="top-right position-absolute"
          text
          @click="removeFile()"
        >
          <el-icon>
            <Close />
          </el-icon>
        </el-button>
      </div>
    </template>
    <div v-else :class="$style.empty_file">
      <el-icon :size="15" color="#5277F1">
        <Upload></Upload>
      </el-icon>
      <div :class="$style.upload__header">Выберите файл</div>
      <div :class="$style.upload__description">или перетащите сюда</div>
    </div>
  </UploadInput>
</template>

<style lang="stylus" module>
.input
  top 0
  right 0
  bottom 0
  left 0
  position: absolute
  opacity 0
  cursor pointer

.preview
  max-width 300px
  min-height 200px


.upload
  position relative
  width 100%
  border: 1px dashed $cTextMuted
  border-radius 4px
  height 104px
  line-height 100%

  .empty_file
    padding 24px 56px 16px 56px
    display flex
    flex-direction column
    justify-content center
    align-items center
    height 100%

  &--drag
    background #eeeeee

  &__header
    color: #5277F1
    text-decoration underline
    font-size 14px

  &__description
    color: $cTextMuted
    font-size 12px
  @media (max-width: $tabletVerWidth)
    height 73px
</style>
