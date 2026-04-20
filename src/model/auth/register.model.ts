export type RegisterRequest = {
  name: {
    firstName: string;
    lastName: string;
  };
  birthday: {
    day: string;
    month: string;
    year: string;
  };
  gender: string;
  contactNumber: string;
  email: string;
  password: string;
};

export type RegisterResponse = {
  message: string;
};

export const initRegisterRequest: RegisterRequest = {
  name: {
    firstName: "",
    lastName: "",
  },
  birthday: {
    day: "",
    month: "",
    year: "",
  },
  gender: "",
  contactNumber: "",
  email: "",
  password: "",
};
