import meal_delete from '../../../assets/meal_delete.png';
import logoBox from '../../../assets/9gram_logo_box.png';
import record from '../../../styles/record/record.module.css';

const Record = () => {
  return (
    <>
      <div className={record.header}>하루식단</div>
      <div className={record.meal_container}>
        <div className={record.meal_header}> 오늘 날짜 </div>
        <div className={record.meal_content} style={{ backgroundImage: `url(${logoBox})` }}>
          <div className={record.meal_time}>아침</div>
          <img className={record.meal_deleteButton} src={meal_delete} alt='식단 삭제 버튼' />
        </div>

        <div className={record.meal_content} style={{ backgroundImage: `url(${logoBox})` }}>
          <div className={record.meal_time}>점심</div>
          <img className={record.meal_deleteButton} src={meal_delete} alt='식단 삭제 버튼' />
        </div>

        <div className={record.meal_content} style={{ backgroundImage: `url(${logoBox})` }}>
          <div className={record.meal_time}>저녁</div>
          <img className={record.meal_deleteButton} src={meal_delete} alt='식단 삭제 버튼' />
        </div>
      </div>
    </>
  );
};

export default Record;
