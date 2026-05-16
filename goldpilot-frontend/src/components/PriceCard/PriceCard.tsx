import { formatNumber, getPriceColorClass } from '@/utils/format';
import type { PriceData } from '@/types';

interface PriceCardProps {
  data: PriceData;
}

/**
 * 价格卡片组件 - 显示现货黄金实时报价
 */
export function PriceCard({ data }: PriceCardProps) {
  const { price, change, changePct, high, low } = data;

  return (
    <div className="grid grid-cols-[1.2fr_repeat(4,_1fr)] gap-2">
      {/* 现货黄金价格 */}
      <div className="min-w-0 p-2 border border-line rounded bg-[#fbfcfe]">
        <span className="text-xs text-muted block">现货黄金 XAU/USD</span>
        <div className={`text-base font-extrabold tabular-nums mt-1 whitespace-nowrap overflow-hidden text-ellipsis ${getPriceColorClass(change)}`}>
          {formatNumber(price)}
        </div>
      </div>

      {/* 涨跌额 */}
      <div className="min-w-0 p-2 border border-line rounded bg-[#fbfcfe]">
        <span className="text-xs text-muted block">涨跌额</span>
        <div className={`text-base font-extrabold tabular-nums mt-1 whitespace-nowrap overflow-hidden text-ellipsis ${getPriceColorClass(change)}`}>
          {change >= 0 ? '+' : ''}{formatNumber(change)}
        </div>
      </div>

      {/* 涨跌幅 */}
      <div className="min-w-0 p-2 border border-line rounded bg-[#fbfcfe]">
        <span className="text-xs text-muted block">涨跌幅</span>
        <div className={`text-base font-extrabold tabular-nums mt-1 whitespace-nowrap overflow-hidden text-ellipsis ${getPriceColorClass(change)}`}>
          {changePct >= 0 ? '+' : ''}{formatNumber(changePct)}%
        </div>
      </div>

      {/* 最高价 */}
      <div className="min-w-0 p-2 border border-line rounded bg-[#fbfcfe]">
        <span className="text-xs text-muted block">最高</span>
        <div className="text-base font-extrabold tabular-nums mt-1 whitespace-nowrap overflow-hidden text-ellipsis">
          {formatNumber(high)}
        </div>
      </div>

      {/* 最低价 */}
      <div className="min-w-0 p-2 border border-line rounded bg-[#fbfcfe]">
        <span className="text-xs text-muted block">最低</span>
        <div className="text-base font-extrabold tabular-nums mt-1 whitespace-nowrap overflow-hidden text-ellipsis">
          {formatNumber(low)}
        </div>
      </div>
    </div>
  );
}
