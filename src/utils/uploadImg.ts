// import useApi from '@hooks/useApi';

// export const handlePresigned = async (fileName, apiProps) => {
//   try {
//     const res = await useApi({ ...apiProps, fileName });
//     console.log('PresignedURL을 받아왔습니다.', res.data.presignedUrl);
//     return res.data.presignedUrl;
//   } catch (err) {
//     alert(`[presignedUrl 오류]`);
//   }
// };

// export const handleImgToS3 = async (preUrl, apiProps) => {
//   //서버에서 받아온 Presigned url, 저장한 파일로 api 호출
//   try {
//     const res = await useApi({ ...apiProps, preUrl });
//     const resUrl = res.request.responseURL;
//     const imageUrlWithoutQuery = resUrl.split('?')[0];
//     console.log(res);
//     console.log(imageUrlWithoutQuery);
//     // setitemsImgUrl((prev) => [...prev, resUrl])
//     return imageUrlWithoutQuery;
//   } catch {
//     alert('이미지 등록에 실패했습니다. S3업로드');
//   }
// };
