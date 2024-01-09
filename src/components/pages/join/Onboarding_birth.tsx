import { useEffect, useRef, useState } from "react";
import ButtonCommon from "../../UI/ButtonCommon";
import InputCommon from '@components/UI/InputCommon';
import './Onboarding.css';

const Onboarding_birth = () => {
    const [year, setYear] = useState('');
    const [month, setMonth] = useState('');
    const [selectedBirth, setSelectedBirth] = useState<string | null>(null);

    const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setYear(e.target.value);
    };
    const handleMonthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMonth(e.target.value);
    };

    const onClick = (birth: string) => {
        setSelectedBirth((prevGender: string | null) => {
            return prevGender === birth ? null : birth;
        });
    };

    return (
        <div>
            <h1 className="b-medium">생년월일을 입력해주세요</h1>
            <div style={{ marginTop: '30px' }}>
                <InputCommon
                    className={`button large r-large gray`}
                    value={year}
                    onChange={handleYearChange}
                >
                </InputCommon>
            </div>
            <div style={{ marginTop: '15px' }}>
                <InputCommon
                    className={`button large r-large gray`}
                    value={month}
                    onChange={handleMonthChange}
                >
                </InputCommon>
            </div>
        </div>
    );
};

export default Onboarding_birth;