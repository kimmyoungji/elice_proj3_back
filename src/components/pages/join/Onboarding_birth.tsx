import { useEffect, useRef, useState } from "react";
import ButtonCommon from "../../UI/ButtonCommon";
import InputCommon from '@components/UI/InputCommon';
import './Onboarding.css';

const Onboarding_birth = () => {
    const [year, setYear] = useState('');
    const [month, setMonth] = useState('');
    const [date, setDate] = useState('');
    const [selectedBirth, setSelectedBirth] = useState<string | null>(null);

    const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setYear(e.target.value);
    };
    const handleMonthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMonth(e.target.value);
    };
    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDate(e.target.value);
    };

    return (
        <div>
            <h1 className="b-medium">생년월일을 입력해주세요</h1>
            <div style={{ marginTop: '30px' }}>
                <InputCommon
                    className={`button large r-large gray`}
                    value={year}
                    placeholder='년'
                    onChange={handleYearChange}
                />
            </div>
            <div style={{ marginTop: '15px' }}>
                <InputCommon
                    className={`button r-large gray`}
                    value={month}
                    placeholder='월'
                    onChange={handleMonthChange}
                />
            </div>
            <div style={{ marginTop: '15px' }}>
                <InputCommon
                    className={`button large r-large gray`}
                    value={date}
                    placeholder='일'
                    onChange={handleDateChange}
                />
            </div>
        </div>
    );
};

export default Onboarding_birth;