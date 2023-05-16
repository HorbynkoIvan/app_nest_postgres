import { MouseEvent, useState } from "react";

interface ReturnInterface {
  collapseId: string;
  handleCollapse: (event: MouseEvent<HTMLElement>) => void;
}

export const useMenuCollapse = (): ReturnInterface => {
  const [collapseId, setCollapseId] = useState<string>("");

  const handleCollapse = ({ currentTarget }: MouseEvent<HTMLElement>) => {
    const id = currentTarget.id;
    collapseId === id ? setCollapseId("") : setCollapseId(id);
  };

  return {
    collapseId,
    handleCollapse,
  };
};
