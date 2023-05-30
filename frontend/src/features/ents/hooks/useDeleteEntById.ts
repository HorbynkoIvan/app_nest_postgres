import { useMutation } from "@apollo/client";
import { DELETE_ENT_MUTATION, GET_ENTS_QUERY } from "../graphql";
import { useNavigate } from "react-router-dom";

type Return = {
  deleteEntById: (id: number) => Promise<void>;
};

export const useDeleteEntById = (): Return => {
  const navigate = useNavigate();

  const [deleteEnt] = useMutation(DELETE_ENT_MUTATION, {
    onCompleted: () => {
      navigate("/ents");
    },
  });

  const deleteEntById = async (id: number) => {
    try {
      await deleteEnt({ variables: { id: Number(id) }, refetchQueries: [GET_ENTS_QUERY] });
    } catch (error) {
      throw new Error(String(error));
    }
  };

  return { deleteEntById };
};
