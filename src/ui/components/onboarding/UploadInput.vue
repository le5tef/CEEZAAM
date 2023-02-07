<script lang="ts" setup>
import { defineProps, ref } from 'vue'
import { Upload } from '@element-plus/icons-vue'

const emit = defineEmits(['change', 'update'])
const drag = ref<boolean>(false)
const props = defineProps({
  fullWidthSize: { type: Boolean, default: true },
  acceptableExtensions: { type: String, default: '' },
})
const fileEl = ref<HTMLInputElement>()
const handleFile = () => {
  drag.value = false
  if (fileEl.value && fileEl.value.files && fileEl.value.files.length > 0) {
    const [file] = fileEl.value.files
    if (file) {
      emit('change', file)
    } else {
      emit('change', null)
    }
  }
}
</script>
<template>
  <div :class="props.fullWidthSize ? 'w-full' : ''">
    <div :class="[$style.upload, { [$style['upload--drag']]: drag }, 'position-relative']">
      <input
        ref="fileEl"
        :accept="acceptableExtensions"
        :class="$style.input"
        type="file"
        @change="handleFile"
        @dragleave="drag = false"
        @dragover="drag = true"
      />
      <slot>
        <div :class="$style.empty_file">
          <el-icon :size="15" color="#5277F1">
            <Upload></Upload>
          </el-icon>
          <div :class="$style.upload__header">Выберите файл</div>
          <div :class="$style.upload__description">или перетащите сюда</div>
        </div>
      </slot>
    </div>
  </div>
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
