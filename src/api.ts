import axios, { AxiosInstance, AxiosResponse } from "axios";

export class Api {
    private axiosInstance: AxiosInstance;
    constructor(private readonly apiBaseUrl: string) {
        console.info("🚀 ~ Api ~ constructor ~ apiBaseUrl:", apiBaseUrl)
        const baseURL = this.apiBaseUrl;
        this.axiosInstance = axios.create({baseURL});
    }

    getPicsumImage = async (): Promise<AxiosResponse<Blob>> => {
        return await this.axiosInstance.get('', {responseType: 'blob'})
    }
}