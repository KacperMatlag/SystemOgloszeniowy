import axios, { AxiosResponse } from "axios";

export default class ApiManager implements ApiRequests {
  private baseUrl;
  constructor() {
    this.baseUrl = "http://localhost:2137";
  }
  async customCall(path: string): Promise<AxiosResponse> {
    try {
      const response = await axios.get(path);
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async get(endpoint: string): Promise<AxiosResponse<any>> {
    try {
      const response = await axios.get(`${this.baseUrl}/${endpoint}`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async post(endpoint: string, data: any): Promise<AxiosResponse<any>> {
    try {
      const response = await axios.post(`${this.baseUrl}/${endpoint}`, data, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async patch(endpoint: string, data: any): Promise<AxiosResponse<any>> {
    try {
      const response = await axios.patch(`${this.baseUrl}/${endpoint}`, data);
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async dekete(endpoint: string, index: number): Promise<AxiosResponse<any>> {
    try {
      const response = await axios.delete(
        `${this.baseUrl}/${endpoint}/${index}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      return response as any;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

interface ApiRequests {
  get(endpoint: string, query?: string): Promise<AxiosResponse<any>>;
  post(endpoint: string, data: any): Promise<AxiosResponse<any>>;
  patch(endpoint: string, data: any): Promise<AxiosResponse<any>>;
  dekete(endpoint: string, index: number): Promise<AxiosResponse<any>>;
  customCall(path: string): Promise<AxiosResponse<any>>;
}
