type TagData = {
  XYCoordinate: number[];
  foodName: string;
};

export const getTags = (tagData: TagData[]) => {
  return tagData.map((food, index) => {
    const tagStyle: React.CSSProperties = {
      position: 'absolute',
      left: `${food.XYCoordinate[0]}px`,
      top: `${food.XYCoordinate[1]}px`,
      background: 'rgba(43, 43, 43, 0.6)',
      color: 'white',
      borderRadius: 15,
      padding: '4px 9px',
    };
    return (
      food.XYCoordinate.length > 0 && (
        <p key={index} style={tagStyle} className='b-tiny'>
          {food.foodName}
        </p>
      )
    );
  });
};
