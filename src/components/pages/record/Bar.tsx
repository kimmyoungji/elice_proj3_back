interface BarProps {
  width: string;
  height: string;
  fill: string;
}

export const Bar: React.FC<BarProps> = ({ width, height, fill }) => {
  return (
    <>
      <rect
        rx='10' // 바 둥근 모서리 설정을 위해 rx 설정
        width={width}
        height={height} // 바의 높이를 설정하여 바의 두께를 결정
        fill={fill}
      />
    </>
  );
};

export default Bar;
