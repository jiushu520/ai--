import { useState, useEffect } from 'react';
import { getTodayString } from '@/utils/format';

/**
 * 顶部导航栏组件
 */
export function Header() {
  const [currentDate, setCurrentDate] = useState(getTodayString());

  useEffect(() => {
    // 每秒更新一次时间
    const timer = setInterval(() => {
      setCurrentDate(getTodayString());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <header className="min-h-[64px] flex items-center justify-between gap-[18px] px-[18px] py-[10px] border-b border-line bg-paper shadow-[0_2px_10px_rgba(25,44,63,0.04)]">
      {/* 左侧品牌信息 */}
      <div className="flex items-center gap-3 min-w-0">
        <div className="flex flex-col min-w-0">
          <h1 className="text-[19px] font-extrabold tracking-wide whitespace-nowrap text-ink">
            GoldPilot 黄金交易决策驾驶舱
          </h1>
          <p className="text-xs text-muted whitespace-nowrap overflow-hidden text-ellipsis">
            面向金融客户服务团队的事件驱动型交易辅助首页
          </p>
        </div>
      </div>

      {/* 右侧日期和状态 */}
      <div className="flex items-center gap-2.5 whitespace-nowrap">
        {/* 演示模式标签 */}
        <span className="inline-flex items-center justify-center min-h-[22px] px-2 py-0.5 rounded-full border border-line bg-green-soft text-green text-xs whitespace-nowrap">
          演示模式
        </span>

        {/* 在线状态指示点 */}
        <span
          className="w-2 h-2 rounded-full bg-green shadow-[0_0_0_5px_rgba(15,159,110,0.1)]"
          aria-hidden="true"
        />

        {/* 当前日期 */}
        <span className="text-lg font-extrabold tabular-nums text-ink">
          {currentDate}
        </span>
      </div>
    </header>
  );
}
