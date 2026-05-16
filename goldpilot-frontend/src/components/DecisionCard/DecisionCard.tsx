interface DecisionCardProps {
  headline: string;
  summary: string;
  eventCountdown: string;
  aiReason: string;
}

/**
 * 决策卡片组件 - 显示今日决策建议
 */
export function DecisionCard({
  headline,
  summary,
  eventCountdown,
  aiReason,
}: DecisionCardProps) {
  return (
    <div className="bg-gradient-to-r from-blue-soft/50 to-transparent bg-paper border border-line rounded-lg shadow-panel p-3">
      <div className="pr-2.5 border-r border-line">
        {/* 决策标题 */}
        <div className="text-xs font-extrabold tracking-widest text-blue mb-1.5">
          TODAY DECISION
        </div>
        <h1 className="text-xl font-bold leading-tight mb-2 text-ink">
          {headline}
        </h1>
        <p className="text-sm text-muted leading-relaxed">
          {summary}
        </p>
      </div>

      {/* 决策信息 */}
      <div className="grid grid-cols-[0.9fr_0.9fr] gap-2.5 mt-3">
        {/* 事件倒计时 */}
        <div className="p-2.5 border border-line rounded bg-white/68">
          <strong className="block mb-1.5 text-sm">事件倒计时</strong>
          <p className="text-sm text-muted leading-relaxed">{eventCountdown}</p>
        </div>

        {/* AI解释 */}
        <div className="p-2.5 border border-line rounded bg-white/68">
          <strong className="block mb-1.5 text-sm">AI 解释</strong>
          <p className="text-sm text-muted leading-relaxed">{aiReason}</p>
        </div>
      </div>
    </div>
  );
}
