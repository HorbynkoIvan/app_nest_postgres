import { LoginStatus, UserStatus } from "../enums";
import { OrganizationType } from "./organization";

export type UserType = {
  id: number;
  username: string;
  status: UserStatus;
  email: string;
  loginType: LoginStatus;
  password: string;
  createDate: Date;
  profile: UserProfileType;
  organizations: OrganizationType[];
};

export type UsersOutput = {
  users: UserType[];
  totalCount: number;
};

export type UsersFilterInput = Partial<{
  username: string;
  id: number;
  loginTypes: LoginStatus[];
  status: UserStatus | null;
  organizationId: number;
}>;

export type UserProfileType = {
  id: number;
  firstName: string;
  lastName: string;
};
