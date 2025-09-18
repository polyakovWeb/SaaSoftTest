<script setup lang="ts">
import AccountRow from "@/components/AccountRow.vue";
import { useAccountsStore } from "@/stores/Accounts";
import EmptyDataMessage from "./EmptyDataMessage.vue";

const { accounts } = useAccountsStore();
</script>

<template>
  <div class="form">
    <header class="form__header">
      <p class="form__title">Метки</p>
      <p class="form__title">Тип записи</p>
      <p class="form__title">Логин</p>
      <p class="form__title">Пароль</p>
    </header>
    <div class="form__data">
      <AccountRow
        v-if="accounts.length"
        v-for="accountData in accounts"
        :accountData
      />
      <EmptyDataMessage v-else />
    </div>
  </div>
</template>

<style scoped>
.form__title {
  color: gray;
}

.form__data {
  display: grid;
  gap: 10px;
}

.form__header {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 25%)) 1fr 1fr 40px;
  gap: 10px;
}
</style>
