import clientAxios from "../config/axios";
import { typeUser } from "../types";
export const config = (token: string) => {
  return {
    headers: {
      "Content-type": "application/json",

      Authorization: `Bearer ${token}`,
    },
  };
};

export const getToken = () => localStorage.getItem("lavadora-token") as string || "";

export const fetchProfile = async() => {
  try {
    const response = await clientAxios.get("/auth/", config(getToken()));
    if (response.status === 200) {
      const data:typeUser = response.data;
      return data;
    }
    return new Error("Usuario no encontrado");
  } catch (error) {
    console.log(error)
  }
};
