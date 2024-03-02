import axios, { AxiosResponse } from "axios";

export default class ApiManager implements ApiRequests {
  private baseUrl;
  constructor() {
    this.baseUrl = "http://localhost:2137";
  }

  async getData<T>(endpoint: string): Promise<AxiosResponse<T>> {
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

  async postData<T>(endpoint: string, data: any): Promise<AxiosResponse<T>> {
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

  async patchData<T>(endpoint: string, data: any): Promise<AxiosResponse<T>> {
    try {
      const response = await axios.patch(`${this.baseUrl}/${endpoint}`, data, {
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

  async deleteData<T>(
    endpoint: string,
    index: number
  ): Promise<AxiosResponse<T>> {
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
  getData<T>(endpoint: string, query?: string): Promise<AxiosResponse<T>>;
  postData<T>(endpoint: string, data: any): Promise<AxiosResponse<T>>;
  patchData<T>(endpoint: string, data: any): Promise<AxiosResponse<T>>;
  deleteData<T>(endpoint: string, index: number): Promise<AxiosResponse<T>>;
}
