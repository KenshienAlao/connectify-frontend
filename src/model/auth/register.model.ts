export type registerRequest = {
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

export type registerResponse = {
  message: string;
};

export const initRegisterRequest: registerRequest = {
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
