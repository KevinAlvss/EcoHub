import { api } from "../axios";
import {
  LoginModelRequest,
  LoginModelResponse,
} from "../models/auth/LoginModel";

export class AuthService {
  async login(loginModel: LoginModelRequest): Promise<LoginModelResponse> {
    const response = await api.post<LoginModelResponse>("login", loginModel);
    return response.data;
  }
}
