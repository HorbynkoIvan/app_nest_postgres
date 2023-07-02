export type OrganizationType = {
  id: number;
  title: string;
  description: string;
  status: any;
  image: string;
  url: string;
  creatorId: any;
  createDate: Date;
  creator: any;
  editorId: number;
  editDate: Date;
  editor: any;
  parentId: number;
  parent: any;
  subOrganizations: any;
  users: any;
  ents: any;
};

export type OrganizationsFilterInput = Partial<{
  id: number;
  title: string;
}>;
