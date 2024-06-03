import { api } from "../axios";
import {
  LoginModelRequest,
} from "../models/auth/LoginModel";

export class AuthService {
  async login(loginModel: LoginModelRequest): Promise<string> {
    const response = await api.post<string>("login", loginModel);
    return response.data;
  }
}
