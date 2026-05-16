import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { API_CONFIG, ApiResponse } from '@/utils/constants';
import type { Candle, PriceData, Signal, Account, DailyStats } from '@/types';

class ApiService {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: API_CONFIG.baseURL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // 请求拦截器
    this.client.interceptors.request.use(
      (config) => {
        console.log('[API Request]', config.method?.toUpperCase(), config.url);
        return config;
      },
      (error) => {
        console.error('[API Request Error]', error);
        return Promise.reject(error);
      }
    );

    // 响应拦截器
    this.client.interceptors.response.use(
      (response: AxiosResponse) => {
        console.log('[API Response]', response.status, response.config.url);
        return response;
      },
      (error) => {
        console.error('[API Response Error]', error.response?.status, error.config?.url);
        return Promise.reject(error);
      }
    );
  }

  /**
   * 获取实时价格
   */
  async getPrice(): Promise<PriceData> {
    const response = await this.client.get<PriceData>('/api/price');
    return response.data;
  }

  /**
   * 获取K线数据
   */
  async getCandles(period: string = '1m', limit: number = 100): Promise<Candle[]> {
    const response = await this.client.get<Candle[]>('/api/candles', {
      params: { period, limit },
    });
    return response.data;
  }

  /**
   * 获取信号列表
   */
  async getSignals(date?: string): Promise<Signal[]> {
    const response = await this.client.get<Signal[]>('/api/signals', {
      params: date ? { date } : {},
    });
    return response.data;
  }

  /**
   * 获取今日统计
   */
  async getTodayStats(): Promise<DailyStats> {
    const response = await this.client.get<DailyStats>('/api/stats/today');
    return response.data;
  }

  /**
   * 获取账户信息
   */
  async getAccount(): Promise<Account> {
    const response = await this.client.get<Account>('/api/account');
    return response.data;
  }
}

// 导出单例
export const api = new ApiService();
