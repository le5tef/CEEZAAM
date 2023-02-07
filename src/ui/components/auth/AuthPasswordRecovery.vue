<script lang="ts" setup>
import { computed, ref } from 'vue'
import { AuthService } from '@/services'
import { useUserStore } from '@/store/user'
import { Message } from '@element-plus/icons-vue'

const userStore = useUserStore()
const isLoading = ref(false)
const dataSent = ref(false)
const stateDefault = Object.freeze({
  login: '',
})
const state = ref<typeof stateDefault>({ ...stateDefault })
const isValid = computed(() => AuthService.validateLogin(state.value.login))

async function submit() {
  if (!isValid.value) return

  isLoading.value = true
  try {
    await userStore.recoverPassword(state.value.login)
    dataSent.value = true
    isLoading.value = false
  } catch {
    isLoading.value = false
  }
}
</script>

<template>
  <div>
    <div class="sz-auth__heading">Восстановление доступа</div>
    <template v-if="dataSent">
      <div>
        Вам на&nbsp;почту {{ state.login }} было отправлено письмо. Перейдите по&nbsp;ссылке
        из&nbsp;письма для восстановления доступа.
      </div>
      <el-icon :class="$style.icon" :size="78" color="#9D94A8">
        <Message />
      </el-icon>
    </template>
    <template v-else>
      <el-form label-position="top" @submit.prevent>
        <el-form-item label="Почта">
          <el-input v-model="state.login" autofocus type="email" @keyup.enter.prevent="submit" />
        </el-form-item>
        <el-button
          :disabled="!isValid || isLoading"
          :loading="isLoading"
          type="primary"
          @click="submit"
        >
          Продолжить
        </el-button>
      </el-form>
    </template>
  </div>
</template>

<style lang="stylus" module>
.icon
  margin-top 32px
</style>
