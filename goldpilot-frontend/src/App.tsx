import { useState, useEffect } from 'react';
import { ConfigProvider, message } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import { Header } from '@/components/Header';
import { PriceCard } from '@/components/PriceCard';
import { Chart } from '@/components/Chart';
import { AccountCard } from '@/components/AccountCard';
import { SignalPanel } from '@/components/SignalPanel';
import { EventList } from '@/components/EventList';
import { DecisionCard } from '@/components/DecisionCard';
import { api } from '@/services/api';
import { useWebSocket } from '@/hooks/useWebSocket';
import { createDefaultPriceData } from '@/types/price';
import { createDefaultAccountData } from '@/types/account';
import { createDefaultCandles } from '@/types/chart';
import { createDefaultSignals, createDefaultDailyStats } from '@/types/signal';
import { createDefaultEvents, createDefaultFlashes } from '@/types/event';
import { createDefaultDecisionData } from '@/types/decision';

function App() {
  // WebSocket连接
  const {
    connected: wsConnected,
    priceData: wsPriceData,
    subscribePrice,
  } = useWebSocket();

  // 连接状态
  const [apiConnected, setApiConnected] = useState(false);
  const [loading, setLoading] = useState(true);

  // 价格数据
  const [priceData, setPriceData] = useState(createDefaultPriceData());

  // 账户数据
  const [accountData, setAccountData] = useState(createDefaultAccountData());

  // K线数据
  const [candles, setCandles] = useState(createDefaultCandles());
  const [period, setPeriod] = useState('1m');

  // 信号数据
  const [signals, setSignals] = useState(createDefaultSignals());
  const [stats, setStats] = useState(createDefaultDailyStats());

  // 事件数据
  const [events] = useState(createDefaultEvents());
  const [flashes] = useState(createDefaultFlashes());

  // 决策数据
  const decisionData = createDefaultDecisionData();

  // 加载实时数据
  const loadRealTimeData = async () => {
    try {
      setLoading(true);

      // 并行获取所有数据
      const [priceRes, candlesRes, signalsRes, statsRes, accountRes] = await Promise.all([
        api.getPrice(),
        api.getCandles(period, 100),
        api.getSignals(),
        api.getTodayStats(),
        api.getAccount(),
      ]);

      // 更新价格数据
      if (priceRes) {
        setPriceData(priceRes);
      }

      // 更新K线数据
      if (candlesRes) {
        setCandles(candlesRes);
      }

      // 更新信号数据
      if (signalsRes) {
        setSignals(signalsRes);
      }

      // 更新统计数据
      if (statsRes) {
        setStats(statsRes);
      }

      // 更新账户数据
      if (accountRes) {
        setAccountData(accountRes);
      }

      setApiConnected(true);
      console.log('✅ Real-time data loaded successfully');

      // 订阅WebSocket价格更新
      if (wsConnected) {
        subscribePrice();
      }
    } catch (error) {
      console.error('❌ Failed to load real-time data:', error);
      message.error('无法连接到服务器，使用模拟数据');
      setApiConnected(false);
    } finally {
      setLoading(false);
    }
  };

  // 初始化时加载数据
  useEffect(() => {
    loadRealTimeData();
  }, []);

  // WebSocket价格更新时更新本地状态
  useEffect(() => {
    if (wsPriceData) {
      setPriceData(wsPriceData);
    }
  }, [wsPriceData]);

  // 定时刷新价格数据（如果WebSocket未连接）
  useEffect(() => {
    if (!wsConnected) {
      const timer = setInterval(async () => {
        try {
          const price = await api.getPrice();
          setPriceData(price);
        } catch (error) {
          console.error('❌ Failed to refresh price:', error);
        }
      }, 3000);

      return () => clearInterval(timer);
    }
  }, [wsConnected]);

  // 周期变化时重新加载K线数据
  useEffect(() => {
    const loadCandles = async () => {
      try {
        const candles = await api.getCandles(period, 100);
        setCandles(candles);
      } catch (error) {
        console.error('❌ Failed to load candles:', error);
      }
    };

    loadCandles();
  }, [period]);

  // 连接状态显示
  const showConnectionStatus = !apiConnected && !loading;

  return (
    <ConfigProvider locale={zhCN}>
      <div className="min-h-screen bg-bg">
        {/* 连接状态指示 */}
        {showConnectionStatus && (
          <div className="fixed top-4 right-4 z-50 bg-amber-soft border border-amber text-amber px-4 py-2 rounded shadow-lg">
            ⚠️ 使用模拟数据 - 无法连接到后端服务器
          </div>
        )}

        {/* WebSocket连接状态 */}
        {wsConnected && (
          <div className="fixed top-4 left-4 z-50 bg-green-soft border border-green px-4 py-2 rounded shadow-lg flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green shadow-[0_0_0_5px_rgba(15,159,110,0.3)]"></span>
            实时连接已启用
          </div>
        )}

        {loading && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-solid border-blue border-t-transparent mb-4"></div>
              <p className="text-muted">正在连接服务器...</p>
            </div>
          </div>
        )}

        {/* 顶部导航栏 */}
        <Header />

        {/* 主内容区 */}
        <main className="p-[14px]">
          <div className="max-w-[1800px] mx-auto grid grid-cols-1 lg:grid-cols-[minmax(720px,1.05fr)_minmax(500px,0.95fr)] gap-[14px]">
            {/* 左侧区域 */}
            <section className="flex flex-col gap-3">
              {/* 今日决策卡片 */}
              <DecisionCard
                headline={decisionData.headline}
                summary={decisionData.summary}
                eventCountdown={decisionData.eventCountdown}
                aiReason={decisionData.aiReason}
              />

              {/* K线图卡片 */}
              <Chart
                candles={candles}
                signals={signals}
                period={period}
                onPeriodChange={setPeriod}
              />
            </section>

            {/* 右侧区域 */}
            <section className="flex flex-col gap-3">
              {/* 价格卡片 */}
              <div className="bg-paper border border-line rounded-lg shadow-panel p-3">
                <PriceCard data={priceData} />
              </div>

              {/* 信号面板 */}
              <SignalPanel signals={signals} stats={stats} />

              {/* 账户卡片 */}
              <AccountCard data={accountData} />

              {/* 事件列表 */}
              <EventList events={events} flashes={flashes} />
            </section>
          </div>
        </main>
      </div>
    </ConfigProvider>
  );
}

export default App;
