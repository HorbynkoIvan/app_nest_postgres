import { useState } from "react";

type Return = {
  showParentIdField: () => void;
  isShowedParentIdField: boolean;
};

export const useShowParentIdField = (): Return => {
  const [isShowedParentIdField, setShowed] = useState(false);

  return {
    showParentIdField: () => setShowed(true),
    isShowedParentIdField,
  };
};
