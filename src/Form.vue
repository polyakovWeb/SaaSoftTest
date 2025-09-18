<script setup lang="ts">
import { Plus } from "@element-plus/icons-vue";
import InfoMessage from "@/components/InfoMessage.vue";
import AccountsGridTable from "./components/AccountsGridTable.vue";
import { useAccountsStore } from "./stores/Accounts";

const { addNewEmptyAccount } = useAccountsStore();
</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <h1>Учётные записи</h1>
        <el-button :icon="Plus" @click="addNewEmptyAccount()" />
      </el-header>
      <el-main>
        <InfoMessage
          message='Для указания нескольких меток для одной пары логин/пароль используйте
      разделитель " ; " (точка с запятой).'
        />
        <AccountsGridTable />
      </el-main>
    </el-container>
  </div>
</template>

<style scoped>
.el-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0px 8px 10px 0px rgba(123, 188, 255, 0.4);
  font-size: 14px;
}
</style>
