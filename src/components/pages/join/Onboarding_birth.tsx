import { useEffect, useRef, useState } from "react";
import ButtonCommon from "../../UI/ButtonCommon";
import './Onboarding.css';

const Onboarding_birth = () => {
    const [selectedBirth, setSelectedBirth] = useState<string | null>(null);

    const onClick = (birth: string) => {
        setSelectedBirth((prevGender: string | null) => {
            return prevGender === birth ? null : birth;
        });
    };

    return (
        <div>
            <h1 className="b-medium">생년월일을 입력해주세요</h1>
            <div style={{ marginTop: '30px' }}>
                <ButtonCommon
                    className={`button large r-large ${selectedBirth === 'female' ? 'default-active' : 'gray'}`}
                    onClick={() => onClick('female')}
                >
                    여성
                </ButtonCommon>
            </div>
            <div style={{ marginTop: '15px' }}>
                <ButtonCommon
                    className={`button large r-large ${selectedBirth === 'male' ? 'default-active' : 'gray'}`}
                    onClick={() => onClick('male')}
                >
                    남성
                </ButtonCommon>
            </div>
            <div style={{ marginTop: '15px' }}>
                <ButtonCommon
                    className={`button large r-large ${selectedBirth === 'other' ? 'default-active' : 'gray'}`}
                    onClick={() => onClick('other')}
                >
                    기타
                </ButtonCommon>
            </div>
        </div>
    );
};

export default Onboarding_birth;