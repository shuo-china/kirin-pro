<template>
  <div class="flex flex-col items-center">
    <div class="mb-6 text-sm text-black/50">请使用微信扫一扫登录</div>
    <div class="box-content h-40 w-40 border border-black/20 border-solid">
      <iframe
        sandbox="allow-scripts allow-top-navigation allow-same-origin"
        scrolling="no"
        frameBorder="0"
        width="100%"
        height="100%"
        allowTransparency="true"
        :src="src"
      ></iframe>
    </div>
  </div>
</template>

<script setup lang="ts">
import config from '@/config'

interface Props {
  appid?: string
  redirectUri?: string
}

const props = withDefaults(defineProps<Props>(), {
  appid: config.wechat.appid,
  redirectUri: config.wechat.redirectUri
})

const src = computed(() => {
  const url =
    'https://open.weixin.qq.com/connect/qrconnect?appid=' +
    props.appid +
    '&redirect_uri=' +
    encodeURIComponent(props.redirectUri) +
    '&response_type=code&scope=snsapi_login&stylelite=1'

  return url
})
</script>
