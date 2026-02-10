import { useMemo } from "react";
import BaseCard from "@/components/card/BaseCard";
import { useColumnConfig } from "@/hooks/useBreakpoint";

// data: 卡片
// columnConfig: 斷點欄數 { lg: 3, xl: 4 }
// renderCard: 自訂渲染，預設 <BaseCard card={card} />
export default function MasonryCards({ data, columnConfig, renderCard }) {
  const columnCount = useColumnConfig(columnConfig);

  const masonryCols = useMemo(() => {
    const result = Array.from({ length: columnCount }, () => []);
    data.forEach((item, index) => {
      result[index % columnCount].push(item);
    });
    return result;
  }, [data, columnCount]);

  const renderItem = (card) =>
    renderCard ? renderCard(card) : <BaseCard card={card} />;

  return (
    <div className="row">
      {masonryCols.map((column, i) => (
        <div key={i} className="col-md-6 col-lg-4 col-xl-3">
          {column.map((card) => (
            <div key={card.id} className="mb-6">
              {renderItem(card)}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
