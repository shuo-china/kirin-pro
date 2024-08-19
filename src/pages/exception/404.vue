<template>
  <el-result title="404" sub-title="抱歉，您访问的页面不存在。">
    <template #icon>
      <QuestionFilled class="text-[var(--el-color-primary)]" />
    </template>
    <template #extra>
      <el-button type="primary" @click="toHome">返回首页</el-button>
    </template>
  </el-result>
</template>

<script setup lang="ts">
const router = useRouter()

const toHome = () => {
  router.push('/')
}
</script>
