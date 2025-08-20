import React, { useState } from "react";
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

import m01 from "../../static/image/jpg/m01.jpg";
import l01 from "../../static/image/jpg/l01.jpg";
import d01 from "../../static/image/jpg/d01.jpg";
import s01 from "../../static/image/jpg/s01.jpg";

 interface Meal {
  name: string;
  image: string; // vì import ảnh từ jpg -> webpack trả về string (url)
}

 interface MealDay {
  date: string;
  meals: Meal[];
}

 const fakeMeals: MealDay[] = [
  {
    date: "05.21",
    meals: [
      { name: "Morning", image: m01 },
      { name: "Lunch", image: l01 },
      { name: "Dinner", image: d01 },
      { name: "Snack", image: s01 },
    ],
  },
  {
    date: "05.22",
    meals: [
      { name: "Morning", image: m01 },
      { name: "Lunch", image: l01 },
      { name: "Dinner", image: d01 },
      { name: "Snack", image: s01 },
    ],
  },
  // ... copy các ngày khác tương tự
];


const MyPage: React.FC = () => {
  const initialItemsToShow = 2;
  const [itemsToShow, setItemsToShow] = useState<number>(initialItemsToShow);

  const fakePercentage: number = Math.floor(Math.random() * 101);

  const handleLoadMore = () => {
    setItemsToShow((prevItems) => prevItems + initialItemsToShow);
  };

  return (
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
          {_.map(fakeMeals.slice(0, itemsToShow), (d: MealDay, idx: number) =>
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
  );
};

export default MyPage;
