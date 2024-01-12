import classes from "./carlendartitle.module.css";

const CalendarTitle = () => {
  return (
    <div className={classes.title}>
      <div className={`b-regular ${classes["title-text"]}`}>
        <p>식단달력</p>
      </div>
      <div className={classes["title-line"]} />
    </div>
  );
};
export default CalendarTitle;
