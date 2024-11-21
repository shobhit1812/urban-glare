interface User {
  _id: string;
  fullName: string;
  email: string;
  password: string;
  isAdmin: boolean;
  token: string;
}

export default User;
