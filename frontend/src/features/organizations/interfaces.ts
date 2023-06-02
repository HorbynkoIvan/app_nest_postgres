export enum OrganizationStatus {
  ACTIVE = "active",
  LIMITED = "limited",
  HIDDEN = "hidden",
}

type SubOrganization = {
  id: number;
  title: string;
  status: OrganizationStatus;
  image: string;
  createDate: Date;
};

type OrganizationUser = {
  id: number;
  username: string;
  status: string;
  role: string;
  email: string;
  dateCreate: Date; // ToDO rename to createDate
};

export type OrganizationType = {
  id: number;
  title: string;
  description: string;
  status: OrganizationStatus;
  image: string;
  parent: SubOrganization;
  subOrganizations: SubOrganization[];
  users: OrganizationUser[];
  createDate: Date;
};
