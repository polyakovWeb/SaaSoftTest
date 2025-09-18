<script setup lang="ts">
import { InfoFilled } from "@element-plus/icons-vue";

defineProps<{ message: string }>();
</script>

<template>
  <div class="info-message">
    <el-icon>
      <InfoFilled />
    </el-icon>
    <span>
      {{ message }}
    </span>
  </div>
</template>

<style scoped>
.info-message {
  display: flex;
  align-items: center;
  gap: 10px;
  background-color: #e6f2ff;
  padding: 10px;
  border-radius: 4px;
  color: #409eff;
  margin-bottom: 10px;
}
</style>
