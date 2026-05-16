import { useState, useEffect } from 'react';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import { Header } from '@/components/Header';
import { PriceCard } from '@/components/PriceCard';
import { Chart } from '@/components/Chart';
import { AccountCard } from '@/components/AccountCard';
import { SignalPanel } from '@/components/SignalPanel';
import { EventList } from '@/components/EventList';
import { DecisionCard } from '@/components/DecisionCard';
import { createDefaultPriceData } from '@/types/price';
import { createDefaultAccountData } from '@/types/account';
import { createDefaultCandles } from '@/types/chart';
import { createDefaultSignals, createDefaultDailyStats } from '@/types/signal';
import { createDefaultEvents, createDefaultFlashes } from '@/types/event';
import { createDefaultDecisionData } from '@/types/decision';

function App() {
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
  const [flashes, setFlashes] = useState(createDefaultFlashes());

  // 决策数据
  const decisionData = createDefaultDecisionData();

  // 模拟价格更新
  useEffect(() => {
    const timer = setInterval(() => {
      setPriceData((prev) => {
        const change = (Math.random() - 0.5) * 5;
        const newPrice = prev.price + change;
        return {
          ...prev,
          price: newPrice,
          change: prev.change + change * 0.1,
          changePct: ((prev.change + change * 0.1) / prev.price) * 100,
          high: Math.max(prev.high, newPrice),
          low: Math.min(prev.low, newPrice),
          timestamp: new Date(),
        };
      });
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  return (
    <ConfigProvider locale={zhCN}>
      <div className="min-h-screen bg-bg">
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
