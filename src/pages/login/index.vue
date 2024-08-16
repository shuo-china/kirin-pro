<template>
  <div>
    <el-form :model="form" label-width="auto" style="max-width: 600px">
      <el-form-item label="用户名">
        <el-input v-model="form.username" />
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="form.password" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSubmit">确定</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from "@/store/user";
import { ApiError } from "@/utils/request";

const userStore = useUserStore();
const router = useRouter();

const form = reactive({
  username: "15150020157",
  password: "1",
});

const handleSubmit = () => {
  userStore
    .login(form)
    .then(() => {
      router.push("/");
    })
    .catch((err) => {
      if (err instanceof ApiError) {
        ElMessage.error(err.data.message);
      }
    });
};
</script>

<style lang="scss" scoped></style>
