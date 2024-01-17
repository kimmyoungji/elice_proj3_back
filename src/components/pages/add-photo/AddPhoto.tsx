import { useNavigate } from 'react-router-dom';
import styles from './addphoto.module.css';
import { useEffect, useRef } from 'react';

const AddPhoto = () => {
  const selectFile = useRef<HTMLInputElement|null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    getWebcam((stream: MediaProvider) => {
      if (!videoRef.current) {
        throw new Error('참조할 내용이 없습니다!');
      }
      videoRef.current.srcObject = stream;
    })
  }, []);

  const getWebcam = (callback:(stream: MediaProvider)=>void) => {
    try {
      const constraints = {
        video: {
          width: 390,
          height: 580,
        },
        audio: false,
      };
      navigator.mediaDevices.getUserMedia(constraints).then(callback);
    } catch (err) {
      console.log(err);
      return undefined;
    }
  };

  const screenShot = () => {
    const video = document.getElementById("videoCam");
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    context?.drawImage(video as CanvasImageSource, 0, 0, 390, 580);
    canvas?.toBlob((blob) => {
      let file = blob && new File([blob], "fileName.jpg", { type: "image/jpeg" });
      const uploadFile = [file];  
    }, "image/jpeg");

    const image = canvas?.toDataURL(); 
    const link = document.createElement("a");
    link.href = image as string;
    link.download = "PaintJS[🎨]";
    link.click();
  }


  return (
    <>
      <div className={styles.cambox}>
        <canvas width="390" height="480" style={{ display:'none', position:'absolute'}} ref={canvasRef} />
        <video
          id="videoCam"
          className={styles.cam}
          ref={videoRef}
          autoPlay
        />
      </div>
      <div className={styles.addbox}>
        <input type="file" accept="image/*" style={{display:"none"}} ref={selectFile}/>
        <div className={styles.item} onClick={()=>{selectFile.current?.click()}}>
          <img className={styles.icon} src='/icons/album.png' alt='앨범' />
          <div className={styles.text}>앨범</div>
        </div>
        <button className={styles.shotbtn} onClick={screenShot}></button>
        <div
          className={styles.item}
          onClick={() => navigate('/add-photo/search')}
        >
          <img className={styles.icon} src='/icons/self.png' alt='직접입력' />
          <div className={styles.text}>직접입력</div>
        </div>
      </div>
    </>
  );
};

export default AddPhoto;
