import React, { useEffect, useState, useRef, useCallback } from "react";
import Webcam from "react-webcam";
import { ReactComponent as ClockInIcon } from "../../assets/icons/arrow-up-right.svg";
import { ReactComponent as ClockOutIcon } from "../../assets/icons/arrow-down-left.svg";
import ListAbsensi from "../../components/ListAbsensi";
import Spinner from "../../components/Spinner";
import style from "./style.module.css";
import { toImageFile } from "../../scripts/string";
import axios from "axios";

const videoConstraints = {
  facingMode: "user",
};

// const WebcamComponent = () => <Webcam />;
const UserAbsensi = () => {
  const [loading, setLoading] = useState(true);
  const [imgBase64, setImgBase64] = useState("");
  const [captured, setCaptured] = useState(false);
  const [presence, setPresence] = useState({
    clockIn: "",
    clockOut: "",
    photoUrl: "",
  });

  const fillPresence = (presence) => {
    setPresence({
      clockIn: presence.clock_in,
      clockOut: presence.clock_out,
      photoUrl: presence.foto,
    });
  };

  const webcamRef = useRef(null);
  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setCaptured(true);
    setImgBase64(imageSrc);
  }, [webcamRef]);

  useEffect(() => {
    setLoading(false);
    document.title = "Absensi - Dashboard";
  }, []);

  const onClockIn = async () => {
    try {
      const formData = new FormData();
      formData.append("foto", toImageFile(imgBase64, "foto.jpeg"));

      const data = await axios.post("/presences/clock-in", formData);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const retakePhoto = () => {
    setCaptured(false);
    setImgBase64("");
  };

  const listAbsensi = [
    {
      link: "/dashboard/absensi/1",
      title: "06 Oktober 2022",
      icons: (
        <>
          <span className="success">
            <ClockInIcon />
          </span>
          <span className="danger">
            <ClockOutIcon />
          </span>
        </>
      ),
    },
    {
      link: "/dashboard/absensi/2",
      title: "05 Oktober 2022",
      icons: (
        <>
          <span className="success">
            <ClockInIcon />
          </span>
          <span className="success">
            <ClockOutIcon />
          </span>
        </>
      ),
    },
    {
      link: "/dashboard/absensi/3",
      title: "04 Oktober 2022",
      icons: (
        <>
          <span className="danger">
            <ClockInIcon />
          </span>
          <span className="danger">
            <ClockOutIcon />
          </span>
        </>
      ),
    },
  ];

  return (
    <div className={loading ? "center" : ""}>
      {loading ? (
        <Spinner type="user" size={48} borderSize={5} />
      ) : (
        <>
          <div className={style.header}>
            <h2>Absensi</h2>
          </div>
          <div className={style.mainAbsensi}>
            <div className={style.left}>
              <div className={style.camera}>
                {presence.clockIn ? (
                  <img src="" alt="presence captured" />
                ) : imgBase64 ? (
                  <img src={imgBase64} alt="screnshoot" />
                ) : (
                  <Webcam
                    audio={false}
                    height={470}
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    videoConstraints={videoConstraints}
                  />
                )}
              </div>
              <div className={style.buttons}>
                {presence.clockIn && presence.clockOut ? (
                  "Anda sudah melakukan absensi masuk dan pulang hari ini"
                ) : captured ? (
                  <>
                    <button
                      type="button"
                      className={style.takePhoto}
                      onClick={retakePhoto}
                    >
                      Ambil Ulang Foto
                    </button>
                    <button
                      type="button"
                      className={style.savePhoto}
                      onClick={onClockIn}
                    >
                      Absen
                    </button>
                  </>
                ) : (
                  <button
                    type="button"
                    className={style.takePhoto}
                    onClick={capture}
                  >
                    Ambil Foto
                  </button>
                )}
                {presence.clockIn && !presence.clockOut && (
                  <button type="button" className={style.takePhoto}>
                    Absen Pulang
                  </button>
                )}
              </div>
            </div>
            <div className={style.listAbsensi}>
              <ListAbsensi
                title="Status Hari Ini"
                blank="Data absensi tidak dapat ditemukan"
                listBar={listAbsensi}
                additionalContent={
                  <div className={style.statusToday}>
                    <div>
                      <span className={`${style.icon} danger`}>
                        <ClockInIcon />
                      </span>
                      <span className={`${style.absenIn} gray`}>
                        Belum melakukan absensi masuk
                      </span>
                    </div>
                    <div>
                      <span className={`${style.icon} danger`}>
                        <ClockOutIcon />
                      </span>
                      <span className={`${style.absenIn} gray`}>
                        Belum melakukan absensi pulang
                      </span>
                    </div>
                  </div>
                }
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default UserAbsensi;
