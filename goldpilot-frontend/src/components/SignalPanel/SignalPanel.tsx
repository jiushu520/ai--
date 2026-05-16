import { formatMoney } from '@/utils/format';
import type { Signal, DailyStats } from '@/types';

interface SignalPanelProps {
  signals: Signal[];
  stats: DailyStats;
}

/**
 * 信号面板组件 - 显示今日信号统计和历史
 */
export function SignalPanel({ signals, stats }: SignalPanelProps) {
  const { signalCount, winRate, netProfit } = stats;

  return (
    <div className="bg-paper border border-line rounded-lg shadow-panel p-[13px]">
      {/* 标题栏 */}
      <div className="flex items-center justify-between gap-2 mb-2.5 pb-2 border-b border-line">
        <strong className="text-sm">今日信号表现</strong>
      </div>

      {/* 统计数据 */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        {/* 信号数 */}
        <div className="flex flex-col items-center justify-center p-3 bg-[#f8fafc] rounded border border-line">
          <span className="text-2xl font-extrabold tabular-nums text-ink">{signalCount}</span>
          <span className="text-xs text-muted">信号数</span>
        </div>

        {/* 胜率 */}
        <div className="flex flex-col items-center justify-center p-3 bg-[#f8fafc] rounded border border-line">
          <span className="text-2xl font-extrabold tabular-nums text-ink">{winRate.toFixed(0)}%</span>
          <span className="text-xs text-muted">胜率</span>
        </div>

        {/* 盈利 */}
        <div className="flex flex-col items-center justify-center p-3 bg-[#f8fafc] rounded border border-line">
          <span className={`text-2xl font-extrabold tabular-nums ${
            netProfit >= 0 ? 'text-green-500' : 'text-red-500'
          }`}>
            {netProfit >= 0 ? '+' : ''}{formatMoney(netProfit)}
          </span>
          <span className="text-xs text-muted">盈利</span>
        </div>
      </div>

      {/* 信号记录 */}
      <div className="border-t border-line pt-3">
        <div className="text-xs text-muted mb-2">今日信号记录:</div>
        <div className="space-y-2 max-h-[200px] overflow-y-auto">
          {signals.length === 0 ? (
            <div className="text-sm text-muted text-center py-4">暂无信号记录</div>
          ) : (
            signals.map((signal) => (
              <div
                key={signal.id}
                className="grid grid-cols-[48px_1fr] gap-2 p-2 bg-[#f8fafc] rounded border border-line text-sm leading-relaxed"
              >
                <div className="text-blue font-bold tabular-nums">
                  {new Date(signal.timestamp).toLocaleTimeString('zh-CN', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </div>
                <div>
                  <span className={signal.direction === 'long' ? 'text-green-500' : 'text-red-500'}>
                    {signal.direction === 'long' ? '做多' : '做空'}
                  </span>
                  {' → '}
                  <span className={
                    signal.status === 'profit' ? 'text-green-500' :
                    signal.status === 'loss' ? 'text-red-500' :
                    'text-blue-500'
                  }>
                    {signal.status === 'profit' ? '止盈' :
                     signal.status === 'loss' ? '亏损' : '持仓中'}
                  </span>
                  {signal.profit !== undefined && (
                    <span className={`ml-1 ${signal.profit >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                      ({signal.profit >= 0 ? '+' : ''}{formatMoney(signal.profit)})
                    </span>
                  )}
                  {signal.status === 'profit' && <span className="ml-1">🟢</span>}
                  {signal.status === 'loss' && <span className="ml-1">🔴</span>}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
