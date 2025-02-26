export interface RegisterFormData {
    name: string;
    lastName: string;
    userType: string;
    email: string;
    password: string;
}
  
export interface LoginFormData {
    email: string;
    password: string;
}

export interface Employee {
    _id?: string;
    name?: string;
    lName?: string;
    role?: string;
    email?: string;
    password?: string;
    __v?: number;
}