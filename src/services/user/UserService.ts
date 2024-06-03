import { AddOrUpdateUserRequest, GetUser } from "../models/user/UserModel";
import { api } from "../axios";

export class UserService {
  async getAllUsers(): Promise<GetUser[]> {
    const response = await api.get<GetUser[]>("/buscarUsuarios");
    return response.data;
  }

  async getUserById(userId: string): Promise<GetUser> {
    const response = await api.get<GetUser>(
      `api/v1/usuario/Usuario?userId=${userId}`
    );
    return response.data;
  }

  async addNewUser(user: AddOrUpdateUserRequest): Promise<any> {
    const response = await api.post("api/v1/usuario/Usuario", user);
    return response.data;
  }

  async updateExistingUser(
    user: AddOrUpdateUserRequest,
    userId: string
  ): Promise<any> {
    const response = await api.put(
      `api/v1/usuario/Usuario?userId=${userId}`,
      user
    );
    return response.data;
  }

  async deleteExistingUser(userId: string): Promise<any> {
    const response = await api.delete(
      `api/v1/usuario/Usuario?userId=${userId}`
    );
    return response.data;
  }
}
