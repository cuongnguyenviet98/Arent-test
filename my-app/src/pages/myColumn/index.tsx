import React, { useEffect, useState } from "react";
import "./styles.scss";
import ScrollToTopButton from "../../components/scrollToTopButton";
import _ from "lodash";
import type { ColumnData, ColumnItem } from "./type";
import { getColumnsApi } from "../../api/getColumns";
import { useGlobalLoading } from "../../hooks/useGlobalLoading";
import GlobalLoading from "../../components/globalLoading";

const MyColumn: React.FC = () => {
  const initialItemsToShow = 2;
  const [itemsToShow, setItemsToShow] = useState(initialItemsToShow);
  const [columns, setColumns] = useState<ColumnData[]>();

  const { loading, showLoading, hideLoading } = useGlobalLoading();

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

  useEffect(() => {
    const getColumns = async () => {
      showLoading();
      try {
        const reponse = await getColumnsApi();
        setColumns(reponse);
      } catch (error) {
        console.log(error);
      } finally {
        hideLoading();
      }
    };
    getColumns();
  }, []);

  return (
    <>
      <GlobalLoading spinning={loading} />
      <div className="my-column">
        <div className="column-option">
          {renderDetailOption("RECOMMENDED COLUMN", "オススメ")}
          {renderDetailOption("RECOMMENDED DIET", "ダイエット")}
          {renderDetailOption("RECOMMENDED BEAUTY", "美容")}
          {renderDetailOption("RECOMMENDED HEALTH", "健康")}
        </div>

        <div className="detail-column">
          {_.map(columns?.slice(0, itemsToShow), (d: ColumnData, i: number) =>
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
    </>
  );
};

export default MyColumn;
