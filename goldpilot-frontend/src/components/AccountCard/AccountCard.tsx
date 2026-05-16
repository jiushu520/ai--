import { formatMoney, getPriceColorClass } from '@/utils/format';
import type { Account } from '@/types';

interface AccountCardProps {
  data: Account;
}

/**
 * 账户卡片组件 - 显示账户交易情况
 */
export function AccountCard({ data }: AccountCardProps) {
  const {
    equity,
    freeMargin,
    positions,
    dailyPnl,
    riskUsed,
  } = data;

  // 计算持仓手数
  const totalLots = positions.reduce((sum, pos) => sum + pos.volume, 0);

  return (
    <div className="p-[13px] bg-paper border border-line rounded-lg shadow-panel">
      {/* 标题栏 */}
      <div className="flex items-center justify-between gap-2 mb-2.5 pb-2 border-b border-line">
        <strong className="text-sm">账号交易情况</strong>
        <span className="inline-flex items-center justify-center min-h-[22px] px-2 py-0.5 rounded-full border border-line bg-[#f8fafc] text-muted text-xs whitespace-nowrap">
          模拟账户
        </span>
      </div>

      {/* 账户信息网格 */}
      <div className="grid grid-cols-[repeat(5,_minmax(0,_1fr))] gap-2">
        {/* 账户净值 */}
        <div className="min-w-0 p-2.5 border border-line rounded bg-[#fbfcfe]">
          <span className="text-xs text-muted block">账户净值</span>
          <b className="block mt-1 text-base font-extrabold tabular-nums whitespace-nowrap overflow-hidden text-ellipsis">
            {formatMoney(equity)}
          </b>
        </div>

        {/* 可用保证金 */}
        <div className="min-w-0 p-2.5 border border-line rounded bg-[#fbfcfe]">
          <span className="text-xs text-muted block">可用保证金</span>
          <b className="block mt-1 text-base font-extrabold tabular-nums whitespace-nowrap overflow-hidden text-ellipsis">
            {formatMoney(freeMargin)}
          </b>
        </div>

        {/* 持仓手数 */}
        <div className="min-w-0 p-2.5 border border-line rounded bg-[#fbfcfe]">
          <span className="text-xs text-muted block">持仓手数</span>
          <b className="block mt-1 text-base font-extrabold tabular-nums whitespace-nowrap overflow-hidden text-ellipsis">
            {totalLots.toFixed(1)}
          </b>
        </div>

        {/* 今日盈亏 */}
        <div className="min-w-0 p-2.5 border border-line rounded bg-[#fbfcfe]">
          <span className="text-xs text-muted block">今日盈亏</span>
          <b className={`block mt-1 text-base font-extrabold tabular-nums whitespace-nowrap overflow-hidden text-ellipsis ${getPriceColorClass(dailyPnl)}`}>
            {dailyPnl >= 0 ? '+' : ''}{formatMoney(dailyPnl)}
          </b>
        </div>

        {/* 风险占用 */}
        <div className="min-w-0 p-2.5 border border-line rounded bg-[#fbfcfe]">
          <span className="text-xs text-muted block">风险占用</span>
          <b className={`block mt-1 text-base font-extrabold tabular-nums whitespace-nowrap overflow-hidden text-ellipsis ${
            riskUsed >= 70 ? 'text-red-500' : riskUsed >= 48 ? 'text-amber-500' : 'text-green-500'
          }`}>
            {riskUsed.toFixed(0)}%
          </b>
        </div>
      </div>
    </div>
  );
}
