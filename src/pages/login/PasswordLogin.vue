<template>
  <div class="mx-auto w-80">
    <div class="mb-6 text-center text-sm text-black/50">请输入用户名和密码登录</div>
    <el-form
      ref="formRef"
      :model="formData"
      :rules="rules"
      size="large"
      @keyup.enter="handleSubmit"
    >
      <el-form-item prop="username">
        <el-input
          v-model="formData.username"
          class="h-12"
          placeholder="用户名"
          prefix-icon="User"
          autocomplete="off"
        />
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          v-model="formData.password"
          class="h-12"
          placeholder="密码"
          prefix-icon="Lock"
          show-password
        />
      </el-form-item>
      <el-button
        class="h-12 w-full"
        size="large"
        type="primary"
        :loading="loading"
        @click="handleSubmit"
        >登录</el-button
      >
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { FormInstance, FormRules } from 'element-plus'
import { useUserStore } from '@/store/user'
import useRequest from '@/hooks/useRequest'

const router = useRouter()
const userStore = useUserStore()

const formRef = ref<FormInstance>()

const formData = reactive({
  username: '15150020157',
  password: ''
})

const rules: FormRules<typeof formData> = {
  username: {
    required: true,
    message: '请输入用户名'
  },
  password: {
    required: true,
    message: '请输入密码'
  }
}

const { runAsync, loading } = useRequest(userStore.login, { manual: true })

const handleSubmit = () => {
  if (!formRef.value) return

  formRef.value.validate(valid => {
    if (valid) {
      runAsync(formData).then(() => {
        ElMessage.success('登录成功')
        router.push('/')
      })
    }
  })
}
</script>

<style lang="scss" scoped>
:global(input:-webkit-autofill) {
  -webkit-box-shadow: 0 0 0px 1000px white inset;
}
</style>
