export type UserType = {
  id: number;
  userName: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
};

export type AgencyType = {
  id: number;
  createDate: Date;
  description: string;
  editDate: Date;
  parentId: number;
  title: string;
  type: string;
};
