import api from "./api";

export const findMatch = async () => {
  const response = await api.post("/match/find");
  return response.data;
};