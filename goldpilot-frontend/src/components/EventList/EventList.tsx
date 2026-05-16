import type { Event, Flash } from '@/types';

interface EventListProps {
  events: Event[];
  flashes: Flash[];
}

/**
 * 事件列表组件 - 显示重要事件和快讯
 */
export function EventList({ events, flashes }: EventListProps) {
  return (
    <div className="bg-paper border border-line rounded-lg shadow-panel p-[13px]">
      {/* 标题栏 */}
      <div className="flex items-center justify-between gap-2 mb-2.5 pb-2 border-b border-line">
        <strong className="text-sm">今日重要事件</strong>
        <span className="inline-flex items-center justify-center min-h-[22px] px-2 py-0.5 rounded-full border border-line bg-[#f8fafc] text-muted text-xs">
          北京时间
        </span>
      </div>

      {/* 重要事件列表 */}
      <div className="space-y-2 mb-4 max-h-[200px] overflow-y-auto pr-1">
        {events.map((event, index) => (
          <div
            key={index}
            className="grid grid-cols-[54px_1fr] gap-2.5 p-2 rounded border border-line bg-[#fbfcfe]"
          >
            <div className="text-xs font-bold tabular-nums text-muted">
              {event.time}
            </div>
            <div className="text-sm leading-[1.48]">
              {event.star} {event.text}
            </div>
          </div>
        ))}
      </div>

      {/* 市场快讯 */}
      <div className="border-t border-line pt-3">
        <div className="flex items-center justify-between gap-2 mb-2.5 pb-2 border-b border-line">
          <strong className="text-sm">市场快讯流</strong>
          <span className="inline-flex items-center justify-center min-h-[22px] px-2 py-0.5 rounded-full border border-line bg-red-soft text-red text-xs">
            {flashes.length} 条
          </span>
        </div>

        <div className="space-y-2 max-h-[200px] overflow-y-auto pr-1">
          {flashes.map((flash, index) => (
            <div
              key={index}
              className={`grid grid-cols-[54px_1fr] gap-2.5 p-2 rounded border ${
                flash.hot
                  ? 'border-red/30 bg-red-soft'
                  : 'border-line bg-[#fbfcfe]'
              }`}
            >
              <div className="text-xs font-bold tabular-nums text-muted">
                {flash.time}
              </div>
              <div className={`text-sm leading-[1.48] ${
                flash.hot ? 'text-red font-bold' : ''
              }`}>
                {flash.text}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
