interface CustomCSSProperties extends React.CSSProperties {
  '--fillWidth': string;
}

interface BarProps {
  width: string;
  height: string;
  fill: string;
  className?: string;
  style?: CustomCSSProperties;
}

export const NutritionBar: React.FC<BarProps> = ({
  width,
  height,
  fill,
  className,
  style,
}) => {
  return (
    <>
      <rect
        rx='10' // 바 둥근 모서리 설정을 위해 rx 설정
        width={width}
        height={height} // 바의 높이를 설정하여 바의 두께를 결정
        fill={fill}
        className={className}
        style={style}
      />
    </>
  );
};

export default NutritionBar;
