import { useState } from "react"; 
import frontApi from "../api/frontApi";
import { Employee } from "../types/types";

export const useEmployeesServices = () => {
  const [ employees, setEmployees ] = useState<Employee[]>([]);

  const getEmployees = async (token) => {

    if (!token) return
    
    try {
      const response = await frontApi.get("/api/employees", {
        headers: {
          "x-token": token,
        },
      });
      setEmployees(response?.data?.users);

    } catch (error) {

      console.log(error);

    }
  };

  return {
    employees,
    getEmployees,
  };
};
