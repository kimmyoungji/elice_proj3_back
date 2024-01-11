import { getClassNameType } from "typings/commontypes";

export const getClassNamesArr = (
  classNames: string | undefined,
  arr: any[]
): string[] | string | undefined => {
  console.log(arr);
  let cls: string[] = [];
  if (arr.length > 0) {
    cls = cls?.concat(
      arr.reduce((acc: string[], [key, val]: getClassNameType[]) => {
        //val이 유효할 경우에만 key-value
        val && acc.push(`${key.toString()}-${val?.toString()}`);
        return acc;
      }, [])
    );
    classNames && cls?.unshift(classNames.toString());
  }
  return cls;
};
