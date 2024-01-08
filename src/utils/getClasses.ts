export const getClassName = (classes: any | undefined) => {
  const classArray: string[] | undefined = classes?.split(' ');
  return classArray
    ? classArray.map((classN) => classes && classes[`${classN}`]).join(' ')
    : classes
    ? classes[classes]
    : '';
};
