<template>
  <div class="min-h-full flex flex-col">
    <div class="bg-image fixed inset-0 bg-cover bg-center bg-no-repeat -z-1"></div>
    <div class="grow pt-24">
      <div class="mb-6 flex flex-col items-center justify-center">
        <img :src="config.logo" alt="logo" class="h-14 w-auto" />
        <div class="mt-6 text-4xl text-white font-bold">{{ config.title }}</div>
      </div>
      <div class="flex justify-center">
        <el-card class="w-[580px]" body-class="p-10!">
          <WechatLogin v-if="loginType === 'wechat'" />
          <PasswordLogin v-if="loginType === 'password'" />
          <div class="mt-10 flex flex-col items-center text-sm">
            <div class="text-sm text-black/50">其他登录方式</div>
            <el-button size="large" class="mt-2 w-[160px]" @click="changeLoginType">{{
              loginType === 'password' ? '扫码登录' : '密码登录'
            }}</el-button>
          </div>
        </el-card>
      </div>
    </div>
    <Footer class="text-white" />
  </div>
</template>

<script setup lang="ts">
import config from '@/config'
import PasswordLogin from './PasswordLogin.vue'
import WechatLogin from './WeChatLogin.vue'
import Footer from '@/layouts/components/Footer/index.vue'

const loginType = ref<'password' | 'wechat'>('password')

const changeLoginType = () => {
  if (loginType.value === 'password') {
    loginType.value = 'wechat'
  } else {
    loginType.value = 'password'
  }
}
</script>

<style lang="scss" scoped>
.bg-image {
  background-image: url(/login-bg.jpg);
}
</style>
