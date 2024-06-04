import { AddOrUpdateHubRequest, GetHub } from "../models/hub/HubModel";
import { api } from "../axios";

export class HubService {
  async getAllHubs(): Promise<GetHub[]> {
    const response = await api.get<GetHub[]>("buscarPontosColeta");
    return response.data;
  }

  async getHubById(hubId: string): Promise<GetHub> {
    const response = await api.get<GetHub>(
      `api/v1/pontoColeta/PontoDeColeta?pontoId=${hubId}`
    );
    return response.data;
  }

  async getHubsByUser(userId: string): Promise<GetHub[]> {
    const response = await api.get<GetHub[]>(
      `buscarPorUsuario?usuarioId=${userId}`
    );
    return response.data;
  }

  async addNewHub(hub: AddOrUpdateHubRequest): Promise<any> {
    console.log(hub)
    const response = await api.post("api/v1/pontoColeta/PontoDeColeta", hub);
    return response.data;
  }

  async updateExistingHub(
    hub: AddOrUpdateHubRequest,
    hubId: string
  ): Promise<any> {
    const response = await api.put(
      `api/v1/pontoColeta/PontoDeColeta?pontoId=${hubId}`,
      hub
    );
    return response.data;
  }

  async deleteExistingHub(hubId: string): Promise<any> {
    const response = await api.delete(
      `api/v1/pontoColeta/PontoDeColeta?pontoId=${hubId}`
    );
    return response.data;
  }
}
