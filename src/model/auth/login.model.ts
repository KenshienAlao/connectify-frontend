export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginResponse = {
  message: string;
  access_token: string;
  expired_in: string;
  user: {
    id: string;
    email: string;
    name: string;
    avatar: string;
  };
};

export const initloginRequest: LoginRequest = {
  email: "",
  password: "",
};
