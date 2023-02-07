<script lang="ts" setup>
import { computed, ref } from 'vue'
import { ROUTES_PATHS } from '@/constants'
import { Logger } from '@/utils'
import { AuthService } from '@/services'
import { useRoute } from 'vue-router'
import { useUserStore } from '@/store/user'
import { Message } from '@element-plus/icons-vue'

const userStore = useUserStore()
const route = useRoute()
const logger = new Logger({ prefix: 'AuthSetNewPassword.vue' })
const isLoading = ref(false)
const dataSent = ref(false)
const stateDefault = Object.freeze({
  password: '',
  passwordCopy: '',
})
const state = ref<typeof stateDefault>({ ...stateDefault })
const passwordIsValid = computed(() => AuthService.validatePassword(state.value.password))
const passwordCopyIsValid = computed(() => state.value.password === state.value.passwordCopy)
const isValid = computed(() => passwordIsValid.value && passwordCopyIsValid.value)

async function submit() {
  if (!isValid.value) return
  const token = route.params.token
  if (!token || typeof token !== 'string') return

  logger.log('submit')
  isLoading.value = true
  await userStore.recoverSetPassword(token, state.value.password, state.value.passwordCopy)
  dataSent.value = true
  isLoading.value = false
}
</script>

<template>
  <div>
    <div class="sz-auth__heading">Восстановление доступа</div>
    <template v-if="dataSent">
      <div>
        Пароль успешно изменен, вы можете
        <router-link class="no-reset" :to="ROUTES_PATHS.AUTH_LOGIN">авторизоваться</router-link>
      </div>
      <el-icon :class="$style.icon" :size="78" color="#9D94A8">
        <Message />
      </el-icon>
    </template>
    <template v-else>
      <el-form label-position="top" @submit.prevent>
        <el-form-item label="Пароль">
          <el-input v-model="state.password" type="password" @keyup.enter="submit" />
          <span class="text-muted"> Используйте верхний и нижний регистры </span>
        </el-form-item>
        <el-form-item label="Повторите пароль">
          <el-input v-model="state.passwordCopy" type="password" @keyup.enter="submit" />
        </el-form-item>
        <el-button
          :disabled="!isValid || isLoading"
          :loading="isLoading"
          type="primary"
          @click="submit"
        >
          Сменить пароль
        </el-button>
      </el-form>
    </template>
  </div>
</template>

<style lang="stylus" module>
.icon
  margin-top 32px
</style>
