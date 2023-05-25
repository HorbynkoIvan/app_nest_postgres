export type OrganizationType = {
  id: number;
  icon: string;
  name: string;
  type: string;
  admins: any;
  users: any;
  courses: any;
};

// export type OrganizationType = {
//   id: number;
//   icon: string;
//   name: string;
//   type: string;
//   description: string;
//   dateCreate: string;
//   parentId: number;
//   subOrganizations: any;
//   admins: any;
//   users: any;
// };

export type OrderDirection = "asc" | "desc";
