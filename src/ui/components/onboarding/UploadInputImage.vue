<script lang="ts" setup>
import { computed, defineEmits, defineProps, ref } from 'vue'
import { Close, Upload } from '@element-plus/icons-vue'
import UploadInput from '@/ui/components/onboarding/UploadInput.vue'

const src = ref<string | null>(null)
const props = defineProps({
  color: { type: String, required: false, default: '' },
  closable: { type: Boolean, default: false },
  currentSrc: { type: String, required: false, default: null },
  fullWidthSize: { type: Boolean, default: true },
  acceptableExtensions: { type: String, default: '' },
})

const emit = defineEmits(['change', 'update'])
const handleImage = (file: File | null) => {
  if (file) {
    src.value = URL.createObjectURL(file)
    emit('change', file)
  } else {
    src.value = null
    emit('change', null)
  }
}

const removeFile = () => {
  src.value = null
  emit('change', null)
}
const background = computed(() => ({ backgroundColor: props.color }))
</script>
<template>
  <UploadInput
    :acceptable-extensions="props.acceptableExtensions"
    :full-width-size="props.fullWidthSize"
    @change="handleImage"
  >
    <template v-if="src || currentSrc">
      <div :style="background" class="w-full h-full d-flex justify-center align-center">
        <img :src="src || currentSrc" alt="" />
        <el-button
          v-if="closable"
          :class="['top-right', 'position-absolute', $style['close-button']]"
          circle
          size="small"
          text
          @click="removeFile()"
        >
          <el-icon :size="10">
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

.close-button
  border 1px solid #D4C7DB !important
  background #FFFFFF !important


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

.empty_file
  padding 24px 56px 16px 56px
  display flex !important
  flex-direction column !important
  justify-content center !important
  align-items center !important
  height 100%
</style>
