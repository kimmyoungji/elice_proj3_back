export interface RecordData {
  dateArr: Array<[number, number, string | undefined]>;
}

// 유림님이 맡으신 MVP 부분
const recordData: RecordData = {
  dateArr: [
    [1, 400, '/images/record_example.png'],
    [2, 350, undefined],
    [3, 0, '/images/record_example.png'],
    [4, 0, undefined],
  ],
};

export { recordData };
