import { MouseEvent, useState } from "react";
import { OrderDirection } from "../../../interfaces";

type Return = {
  orderDirection: OrderDirection;
  orderBy: string;
  handleRequestSort: (event: MouseEvent<unknown>, property: any) => void;
};

export const useSortTableHead = (): Return => {
  const [orderDirection, setOrder] = useState<OrderDirection>("asc");
  const [orderBy, setOrderBy] = useState("admin"); // column label

  const handleRequestSort = (event: MouseEvent<unknown>, property: any) => {
    const isAsc = orderBy === property && orderDirection === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  return {
    orderDirection,
    orderBy,
    handleRequestSort,
  };
};
