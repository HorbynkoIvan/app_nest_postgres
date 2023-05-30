export type EntType = {
  id: number;
  createDate: Date;
  description: string;
  editDate: Date;
  parent: EntType | null;
  title: string;
  type: string;
  creator: Creator;
  editor: Editor | null;
  dependents: EntType[] | null;
};

type Creator = {
  username: string;
  dateCreate: "string";
};

type Editor = {
  username: string;
  dateCreate: string;
};
