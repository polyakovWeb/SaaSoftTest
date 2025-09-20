<script setup lang="ts">
defineProps<{ errors?: string }>();
</script>
<template>
  <transition name="slide-fade">
    <div v-if="errors" class="error-message">
      {{ errors }}
    </div>
  </transition>
</template>
<style scoped>
.error-message {
  color: #f56c6c;
  font-size: 12px;
  margin-top: 2px;
  padding: 4px 8px;
  background-color: #fef0f0;
  border-radius: 4px;
  border: 1px solid #fbc4c4;
}

.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(-8px);
  opacity: 0;
}

.shake {
  animation: shake 0.5s;
}

@keyframes shake {
  0% {
    transform: translateX(0);
  }
  20% {
    transform: translateX(-2px);
  }
  40% {
    transform: translateX(2px);
  }
  60% {
    transform: translateX(-2px);
  }
  80% {
    transform: translateX(2px);
  }
  100% {
    transform: translateX(0);
  }
}

:deep(.el-input__wrapper) {
  transition: box-shadow 0.3s ease;
}

:deep(.el-input__wrapper.is-error) {
  box-shadow: 0 0 0 1px #f56c6c inset;
}

:deep(.el-select .el-input__wrapper.is-error) {
  box-shadow: 0 0 0 1px #f56c6c inset;
}
</style>
