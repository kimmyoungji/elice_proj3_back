import { useNavigate } from "react-router-dom";
import { useCalendarContext } from "./Calendar";
import Image from "./Image";
import classes from "./album.module.css";
type MealType = "아침" | "점심" | "저녁" | "간식";

interface DummyAlbumArrType {
  date: string;
  dateArr: [MealType, number, string][];
}

const DUMMYAlbumArr: DummyAlbumArrType[] = [
  {
    date: "01",
    dateArr: [
      ["아침", 400, "https://source.unsplash.com/random/110x110"],
      ["점심", 350, "https://source.unsplash.com/random/110x110"],
    ],
  },
  {
    date: "06",
    dateArr: [
      ["아침", 400, "https://source.unsplash.com/random/110x110"],
      ["점심", 350, "https://source.unsplash.com/random/110x110"],
      ["저녁", 250, "https://source.unsplash.com/random/110x110"],
    ],
  },
  {
    date: "07",
    dateArr: [
      ["아침", 400, "https://source.unsplash.com/random/110x110"],
      ["점심", 350, "https://source.unsplash.com/random/110x110"],
      ["저녁", 250, "https://source.unsplash.com/random/110x110"],
      ["간식", 250, "https://source.unsplash.com/random/110x110"],
    ],
  },
];

//현재 연도와 월 가져오기

const Album = () => {
  const { thisYear, thisMonth } = useCalendarContext();
  const navigate = useNavigate();

  const onClickCards = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const clickedId = (e.target as HTMLDivElement).id;
    console.log(clickedId);
    navigate(`/record/${thisYear}-${thisMonth}-${clickedId}`);
  };

  const getMealsNumber: {
    [key in MealType]: number;
  } = {
    아침: 1,
    점심: 2,
    저녁: 3,
    간식: 4,
  };

  return (
    <div>
      {DUMMYAlbumArr.map((day, idx) => (
        <div key={`album-${idx}`} className={classes.date}>
          <div
            className={`b-regular`}
          >{`${thisYear}.${thisMonth}.${day.date}`}</div>
          <div className={classes.cards} onClick={onClickCards}>
            {day.dateArr.map((arr, idx) => (
              <div className={classes["meal-img"]}>
                <Image src={arr[2]} />
                <div
                  className={classes["meal-card"]}
                  key={`date-${idx}`}
                  id={`${day.date}/${getMealsNumber[arr[0]]}`}
                >
                  <div className={`b-regular`}>{arr[0]}</div>
                  <div className={`${classes["meal-cal"]} b-medium`}>
                    {arr[1]} kcal
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Album;
