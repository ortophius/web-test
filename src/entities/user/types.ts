export type User = {
  role: UserRoles;
};

export enum UserRoles {
  admin = "admin",
  manager = "manager",
}
