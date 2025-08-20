import React, { useState } from "react";
import "./styles.scss";
import ScrollToTopButton from "../../components/scrollToTopButton";
import _ from "lodash";

// fakeColumns.ts
// import Column1 from "../../assets/column-1.jpg";
import Column1 from "../../static/image/jpg/column-1.jpg";
import Column2 from "../../static/image/jpg/column-2.jpg";
import Column3 from"../../static/image/jpg/column-3.jpg";
import Column4 from"../../static/image/jpg/column-4.jpg";

interface ColumnItem {
  time: string;
  image: string;
  title: string;
  subTitle: string;
}

 interface ColumnData {
  date: string;
  column: ColumnItem[];
}

 const fakeColumns: ColumnData[] = [
  {
    date: "2021.05.17",
    column: [
      {
        time: "23:25",
        image: Column1,
        title: "#魚料理  #和食  #DHA",
        subTitle: "魚を食べて頭もカラダも元気に！知っておきたい魚を食べるメリ…",
      },
      {
        time: "23:25",
        image: Column2,
        title: "#魚料理  #和食  #DHA",
        subTitle: "魚を食べて頭もカラダも元気に！知っておきたい魚を食べるメリ…",
      },
      {
        time: "23:25",
        image: Column3,
        title: "#魚料理  #和食  #DHA",
        subTitle: "魚を食べて頭もカラダも元気に！知っておきたい魚を食べるメリ…",
      },
      {
        time: "23:25",
        image: Column4,
        title: "#魚料理  #和食  #DHA",
        subTitle: "魚を食べて頭もカラダも元気に！知っておきたい魚を食べるメリ…",
      },
    ],
  },
];


const MyColumn: React.FC = () => {
  const initialItemsToShow = 2;
  const [itemsToShow, setItemsToShow] = useState(initialItemsToShow);

  const handleLoadMore = () => {
    setItemsToShow((prev) => prev + initialItemsToShow);
  };

  const renderDetailOption = (title: string, subTitle: string) => (
    <div className="item-option" key={title}>
      <p className="title">{title}</p>
      <p className="sub-border" />
      <p className="sub-title">{subTitle}</p>
    </div>
  );

  return (
    <div className="my-column">
      <div className="column-option">
        {renderDetailOption("RECOMMENDED COLUMN", "オススメ")}
        {renderDetailOption("RECOMMENDED DIET", "ダイエット")}
        {renderDetailOption("RECOMMENDED BEAUTY", "美容")}
        {renderDetailOption("RECOMMENDED HEALTH", "健康")}
      </div>

      <div className="detail-column">
        {_.map(fakeColumns.slice(0, itemsToShow), (d: ColumnData, i: number) =>
          _.map(d.column, (item: ColumnItem, j: number) => (
            <div className="column-item" key={`${i}-${j}`}>
              <div className="img-box">
                <img src={item.image} alt={item.title} />
                <span>{`${d.date} ${item.time}`}</span>
              </div>
              <p className="sub-title">{item.subTitle}</p>
              <p className="title">{item.title}</p>
            </div>
          ))
        )}
      </div>

      <div className="button-box">
        <button className="more-button" onClick={handleLoadMore}>
          記録をもっと見る
        </button>
      </div>

      <ScrollToTopButton className="scroll-to-top-button" />
    </div>
  );
};

export default MyColumn;
