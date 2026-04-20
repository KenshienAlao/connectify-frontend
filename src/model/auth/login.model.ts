export type loginRequest = {
  email: string;
  password: string;
};

export type loginResponse = {
  access_token: string;
  expired_in: string;
  user: {
    id: string;
    email: string;
    name: string;
    avatar: string;
  };
};

export const initloginRequest: loginRequest = {
  email: "",
  password: "",
};
