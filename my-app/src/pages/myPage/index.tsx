import React, { useEffect, useState } from "react";
import _ from "lodash";
import "./styles.scss";
import Chart from "../../components/chart";
import PieChart from "../../components/pieChart";
import {
  DinnerIcon,
  LunchIcon,
  MorningIcon,
  SnackIcon,
} from "../../static/image/svg";
import ScrollToTopButton from "../../components/scrollToTopButton";
import type { MealDay } from "./type";
import { getMealsApi } from "../../api/getMeals";
import { useGlobalLoading } from "../../hooks/useGlobalLoading";
import GlobalLoading from "../../components/globalLoading";

const MyPage: React.FC = () => {
  const initialItemsToShow = 2;
  const [itemsToShow, setItemsToShow] = useState<number>(initialItemsToShow);
  const [meals, setMeals] = useState<MealDay[]>();

  const { loading, showLoading, hideLoading } = useGlobalLoading();

  const fakePercentage: number = Math.floor(Math.random() * 101);

  const handleLoadMore = () => {
    setItemsToShow((prevItems) => prevItems + initialItemsToShow);
  };

  useEffect(() => {
    const getMeals = async () => {
      showLoading();
      try {
        const reponse = await getMealsApi();
        setMeals(reponse);
      } catch (error) {
        console.log(error);
      } finally {
        hideLoading();
      }
    };
    getMeals();
  }, []);

  return (
    <>
      <GlobalLoading spinning={loading} />
      <div className="my-page">
        <div className="top-my-page">
          <div className="left-my-page">
            <div className="chart-custom">
              <PieChart fakePercentage={fakePercentage} />
            </div>
          </div>
          <div className="right-my-page">
            <Chart isHideButton />
          </div>
        </div>

        <div className="bottom-my-page">
          <div className="meals">
            <img src={MorningIcon} alt="Morning Icon" />
            <img src={LunchIcon} alt="Lunch Icon" />
            <img src={DinnerIcon} alt="Dinner Icon" />
            <img src={SnackIcon} alt="Snack Icon" />
          </div>

          <div className="meals-content">
            {_.map(meals?.slice(0, itemsToShow), (d: MealDay, idx: number) =>
              _.map(d.meals, (item, subIdx) => (
                <div className="meal-item" key={`${idx}-${subIdx}`}>
                  <img src={item.image} alt={item.name} />
                  <span>{`${d.date}.${item.name}`}</span>
                </div>
              ))
            )}
          </div>

          <div className="button-box">
            <button className="more-button" onClick={handleLoadMore}>
              記録をもっと見る
            </button>
          </div>
        </div>

        <ScrollToTopButton />
      </div>
    </>
  );
};

export default MyPage;
