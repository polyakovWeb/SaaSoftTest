import { ref } from "vue";
import { defineStore } from "pinia";
import { AccountTypeEnum, type AccountI } from "@/types/Account.types";

export const useAccountsStore = defineStore("accounts", () => {
  // массив для аккаунтов, прошедших валидацию?
  const accounts = ref<AccountI[]>([
    {
      tags: [{ text: "администратор" }, { text: "полный доступ" }],
      accountType: AccountTypeEnum.local,
      login: "admin",
      password: "admin123",
    },
    {
      tags: [{ text: "сотрудник" }, { text: "ограниченный доступ" }],
      accountType: AccountTypeEnum.ldap,
      login: "ivanov.i",
      password: null,
    },
    {
      tags: [{ text: "пример1" }, { text: "Метка 2" }],
      accountType: AccountTypeEnum.local,
      login: "guest",
      password: "guest123",
    },
    {
      tags: [{ text: "бухгалтерия" }, { text: "финансы" }],
      accountType: AccountTypeEnum.ldap,
      login: "petrova.a",
      password: null,
    },

    // {
    //   tags: [{ text: "администратор" }, { text: "полный доступ" }],
    //   accountType: "Локальная",
    //   login: "admin",
    //   password: "admin123",
    // },
    // {
    //   tags: [{ text: "сотрудник" }, { text: "ограниченный доступ" }],
    //   accountType: "LDAP",
    //   login: "ivanov.i",
    //   password: null,
    // },
    // {
    //   tags: null,
    //   accountType: "Локальная",
    //   login: "guest",
    //   password: "guest123",
    // },
    // {
    //   tags: [{ text: "бухгалтерия" }, { text: "финансы" }],
    //   accountType: "LDAP",
    //   login: "petrova.a",
    //   password: null,
    // },
    // {
    //   tags: [{ text: "IT отдел" }, { text: "разработка" }, { text: "админ" }],
    //   accountType: "Локальная",
    //   login: "dev_user",
    //   password: "DevPass2024!",
    // },
  ]);
  // временный массив для аккаунтов?
  // сюда добавляются ещё не валидированные аккаунты для их заполнения в форме, после валидации - аккаунт удаляется из временного хранилища, добавляется в accounts и записывается в localStorage
  const tempAccounts = ref<AccountI[]>([]);

  function addNewEmptyAccount() {
    accounts.value.push({
      tags: null,
      accountType: null,
      login: null,
      password: null,
    });
  }

  function deleteAccount(index: number) {
    accounts.value.splice(index, 1);
  }

  return { accounts, tempAccounts, addNewEmptyAccount, deleteAccount };
});
