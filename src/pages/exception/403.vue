<template>
  <el-result title="403" sub-title="抱歉，您无权访问此页面。">
    <template #icon>
      <Lock class="text-[var(--el-color-warning)]" />
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
