import { useState } from "react";
import frontApi from "../api/frontApi";
import { LoginFormData, RegisterFormData } from "../types/types";

export const useAuthService = () => {

  const [data, setData] = useState<any>(null);

  const registerService = async (formData: RegisterFormData) => {

    try {

      await frontApi.post("api/auth/register", {
        name: formData.name,
        lName: formData.lastName,
        role: formData.userType,
        email: formData.email,
        password: formData.password,
      });
      loginService(formData);

    } catch (error) {

      console.log(error);

    }

  };

  const loginService = async (formData: LoginFormData) => {

    try {

      const response = await frontApi.post("api/auth/login", {
        email: formData.email,
        password: formData.password,
      });
      setData(response?.data);

    } catch (error) {

      console.log(error);
    }

  };

  return {
    data,
    registerService,
    loginService,
  };
};
