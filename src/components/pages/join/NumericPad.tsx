import React from "react";

interface NumericPadProps {
  inputRef: React.RefObject<HTMLInputElement>;
}

const NumericPad: React.FC<NumericPadProps> = ({ inputRef }) => {
  const handleNumericClick = (value: string | number) => {
    if (value === "DEL") {
      if (inputRef.current) {
        inputRef.current.value = inputRef.current.value.slice(0, -1);
      }
    } else {
      if (inputRef.current) {
        inputRef.current.value += value;
      }
    }
  };

  const numericButtons = [1, 2, 3, 4, 5, 6, 7, 8, 9, ".", 0, "DEL"];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', background: '#f4f4f4', padding: '20px 0' }}>
      {numericButtons.map((button, index) => (
        <div
          key={index}
          style={{
            padding: '10px',
            borderRadius: '0px',
            cursor: 'pointer',
            fontSize: '18px',
            textAlign: 'center',
          }}
          onClick={() => handleNumericClick(button)}
        >
          {button}
        </div>
      ))}
    </div>
  );
};

export default NumericPad;