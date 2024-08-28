<template>
  <div class="h-full flex flex-col">
    <div class="grow px-6 py-14">
      <div class="mb-10 flex items-center justify-center">
        <img :src="config.logo" alt="logo" class="h-11 w-auto" />
        <div class="ml-4 text-4xl font-bold">{{ config.title }}</div>
      </div>
      <div class="mx-auto w-80">
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
              placeholder="用户名"
              prefix-icon="User"
              autocomplete="off"
            />
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              v-model="formData.password"
              placeholder="密码"
              prefix-icon="Lock"
              show-password
              autocomplete="off"
            />
          </el-form-item>
          <el-form-item>
            <el-button
              class="w-full"
              size="large"
              type="primary"
              :loading="loading"
              @click="handleSubmit"
              >确定</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import config from '@/config'
import { useUserStore } from '@/store/user'
import { ApiError } from '@/utils/request'
import Footer from '@/layouts/components/Footer/index.vue'
import { FormInstance, FormRules } from 'element-plus'

const userStore = useUserStore()
const router = useRouter()

const formRef = ref<FormInstance>()
const loading = ref(false)

// 15150020157
const formData = reactive({
  username: '',
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

const handleSubmit = () => {
  if (!formRef.value) return

  formRef.value.validate(valid => {
    if (valid) {
      loading.value = true
      userStore
        .login(formData)
        .then(() => {
          ElMessage.success('登录成功')
          router.push('/')
        })
        .finally(() => {
          loading.value = false
        })
    }
  })
}
</script>
