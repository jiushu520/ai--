import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { API_CONFIG } from '@/utils/constants';
import type { Candle, PriceData, Signal, Account, DailyStats } from '@/types';

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
  };
}

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
    const response = await this.client.get<ApiResponse<PriceData>>('/api/price');

    if (response.data.success && response.data.data) {
      return response.data.data;
    }

    throw new Error(response.data.error?.message || '获取价格失败');
  }

  /**
   * 获取K线数据
   */
  async getCandles(period: string = '1m', limit: number = 100): Promise<Candle[]> {
    const response = await this.client.get<ApiResponse<{ candles: Candle[] }>>('/api/candles', {
      params: { period, limit },
    });

    if (response.data.success && response.data.data?.candles) {
      return response.data.data.candles;
    }

    throw new Error(response.data.error?.message || '获取K线数据失败');
  }

  /**
   * 获取信号列表
   */
  async getSignals(date?: string): Promise<Signal[]> {
    const response = await this.client.get<ApiResponse<{ signals: Signal[] }>>('/api/signals', {
      params: date ? { date } : {},
    });

    if (response.data.success && response.data.data?.signals) {
      return response.data.data.signals;
    }

    throw new Error(response.data.error?.message || '获取信号列表失败');
  }

  /**
   * 获取今日统计
   */
  async getTodayStats(): Promise<DailyStats> {
    const response = await this.client.get<ApiResponse<DailyStats>>('/api/stats/today');

    if (response.data.success && response.data.data) {
      return response.data.data;
    }

    throw new Error(response.data.error?.message || '获取今日统计失败');
  }

  /**
   * 获取账户信息
   */
  async getAccount(): Promise<Account> {
    const response = await this.client.get<ApiResponse<Account>>('/api/account');

    if (response.data.success && response.data.data) {
      return response.data.data;
    }

    throw new Error(response.data.error?.message || '获取账户信息失败');
  }
}

// 导出单例
export const api = new ApiService();
