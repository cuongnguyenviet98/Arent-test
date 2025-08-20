import React, { useEffect, useState } from "react";
import "./styles.scss";
import ScrollToTopButton from "../../components/scrollToTopButton";
import MyRecommend1 from "../../static/image/jpg/MyRecommend-1.jpg";
import MyRecommend2 from "../../static/image/jpg/MyRecommend-2.jpg";
import MyRecommend3 from "../../static/image/jpg/MyRecommend-3.jpg";
import Chart from "../../components/chart";
import _ from "lodash";
import type { DiaryItem, ExerciseItem } from "./type";
import { useGlobalLoading } from "../../hooks/useGlobalLoading";
import GlobalLoading from "../../components/globalLoading";
import { getExerciseApi } from "../../api/getExercise";
import { getDiaryApi } from "../../api/getDiary";

const MyRecord: React.FC = () => {
  const initialItemsToShow = 8;
  const currentDate = new Date();
  const [itemsToShow, setItemsToShow] = useState<number>(initialItemsToShow);

  const [exercise, setExercise] = useState<ExerciseItem[]>();
  const [diary, setDiary] = useState<DiaryItem[]>();

  const { loading, showLoading, hideLoading } = useGlobalLoading();

  const handleLoadMore = () => {
    setItemsToShow((prevItems) => prevItems + initialItemsToShow);
  };

  const renderDetailOption = (
    srcImg: string,
    title: string,
    noteTitle: string
  ) => (
    <div className="item-option">
      <img src={srcImg} alt={title} />
      <div className="text-option">
        <p className="title">{title}</p>
        <span className="note-title">{noteTitle}</span>
      </div>
    </div>
  );

  const renderTitle = (title: string): string => {
    return `${title} ${currentDate.getFullYear()}.${
      currentDate.getMonth() + 1
    }.${currentDate.getDate()}`;
  };

  useEffect(() => {
    const getExercise = async () => {
      showLoading();
      const results = await Promise.allSettled([
        getExerciseApi(),
        getDiaryApi(),
      ]);

      results.forEach((result, index) => {
        if (result.status === "fulfilled") {
          if (index === 0) {
            setExercise(result.value as ExerciseItem[]);
          } else {
            setDiary(result.value as DiaryItem[]);
          }
        } else {
          console.error(`API ${index} failed:`, result.reason);
        }
        hideLoading();
      });
    };
    getExercise();
  }, []);

  return (
    <>
      <GlobalLoading spinning={loading} />
      <div className="my-record">
        <div className="detail-option">
          {renderDetailOption(
            MyRecommend1,
            "BODY RECORD",
            "自分のカラダの記録"
          )}
          {renderDetailOption(MyRecommend2, "MY EXERCISE", "自分の運動の記録")}
          {renderDetailOption(MyRecommend3, "MY DIARY", "自分の日記")}
        </div>

        <div className="body-record-chart">
          <Chart title={renderTitle("BODY RECORD")} />
        </div>

        <div className="my-exercise">
          <p className="title">{renderTitle("MY EXERCISE")}</p>
          <div className="my-exercise-content">
            {_.map(exercise as ExerciseItem[], (d, idx) => (
              <div key={idx} className="content">
                <div className="content-left">
                  <div className="title">&#8226; {d.title}</div>
                  <div className="kcal">{d.kcal}</div>
                </div>
                <div className="content-right">{d.time}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="my-diary">
          <div className="big-title">MY DIARY</div>
          <div className="diary-box">
            {_.map((diary as DiaryItem[])?.slice(0, itemsToShow), (d, idx) => (
              <div key={idx} className="diary-content">
                <p className="date">{d.date}</p>
                <p className="time">{d.time}</p>
                <p className="title">{d.title}</p>
                <p className="note">{d.note}</p>
              </div>
            ))}
          </div>
          <div className="button-box">
            <button className="more-button" onClick={handleLoadMore}>
              記録をもっと見る
            </button>
          </div>
        </div>

        <ScrollToTopButton className="scroll-to-top-button" />
      </div>
    </>
  );
};

export default MyRecord;
