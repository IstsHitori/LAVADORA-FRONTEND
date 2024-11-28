import { StateCreator } from "zustand";
import { typeUser } from "../types";
import { fetchProfile, getToken } from "../helpers/fetchAPI";

export interface IAuthSlice {
  token: string;
  profile: typeUser;
  getProfile: () => Promise<void>;
  logoutSesion: () => void;
  setToken: (token: string) => void;
}

export const createAuthSlice: StateCreator<IAuthSlice> = (set) => ({
  token: getToken(),
  profile: {
    name: "",
    email: "",
    rol: "",
  },
  getProfile: async () => {
    const dataProfile = (await fetchProfile()) as typeUser;
    set(() => ({
      profile: dataProfile,
    }));
  },
  logoutSesion: () => {
    localStorage.removeItem("lavadora-token");
    set(() => ({ token: "" }));
  },
  setToken: (token: string) => {
    set(() => ({
      token,
    }));
  },
});
