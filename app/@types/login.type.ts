export type LoginModel = {
  email: string;
  password: string;
};

export type LoginResponse = {
  name: string;
  email: string;
  token: string;
  uid: string;
};

export type RegisterModel = {
  name: string;
  email: string;
  password: string;
};

export type RegisterResponse = {
  name: string;
  email: string;
};
