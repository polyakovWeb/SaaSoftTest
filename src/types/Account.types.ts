export interface AccountI {
  id: number;
  tags: Tag[] | null; // example: [{text: tag 1}, {text: "tag 2"}];
  accountType: AccountTypeEnum | null;
  login: string | null;
  password: string | null;
}

export type Tag = {
  text: string;
};

export enum AccountTypeEnum {
  ldap = "LDAP",
  local = "Локальная",
}
