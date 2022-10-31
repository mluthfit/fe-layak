import React, { useEffect, useState} from "react";
import { ReactComponent as ClockInIcon } from "../../assets/icons/arrow-up-right.svg";
import { ReactComponent as ClockOutIcon } from "../../assets/icons/arrow-down-left.svg";
import Spinner from "../../components/Spinner";
import style from "./style.module.css";
import ListAbsensi from "../../components/ListAbsensi";
import { getStyle } from "../../scripts/rootStyle";

const UserAbsensi = () => {
    const [loading, setLoading] = useState(true);
    const [captured, setCaptured] = useState(true);
    const [clockedIn, setClockedIn] = useState(true);
    const [clockedOut, setClockedOut] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
            setCaptured(false);
            setClockedIn(false);
            setClockedOut(false);
        }, 1000);
        document.title = "Absensi - Dashboard";
    }, []);

    const takePhoto = () => {
        setCaptured(true);
    };

    const retakePhoto = () => {
        setCaptured(false);
    };

    const clockIn = () => {
        setClockedIn(true);
    }

    const clockOut = () => {
        setClockedOut(true);
    }
    const listAbsensi = [
        {
            link : "/dashboard/absensi/1",
            title : "06 Oktober 2022",
            icons : (
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
            link : "/dashboard/absensi/2",
            title : "05 Oktober 2022",
            icons : (
                <>
                <span className="success">
                    <ClockInIcon />
                </span>
                <span className="success">
                    <ClockInIcon />
                </span>
                </>
            ),
        },
        {
            link : "/dashboard/absensi/3",
            title : "04 Oktober 2022",
            icons : (
                <>
                <span className="danger">
                    <ClockOutIcon />
                </span>
                <span className="danger">
                    <ClockOutIcon />
                </span>
                </>
            )
        }
    ];

    return (
        <div className={`${style.overview} ${loading ? "center" : ""}`}>
            {loading ? (
                <Spinner type="user" size={48} borderSize={5}/>
            ) : (
                <>
                    <div className={style.header}>
                        <h2>Absensi</h2>
                    </div>
                    <div className={style.mainAbsensi}>
                        <div className={style.left}>
                            <div className={style.camera}>
                                <img src="https://talentclick.com/wp-content/uploads/2021/08/placeholder-image.png" alt="Camera" />
                            </div>
                            <div className={style.buttons}>
                                {clockedOut ? (
                                    <>
                                        Anda sudah melakukan absensi masuk dan pulang hari ini
                                    </>
                                ) : (
                                    <>
                                        {clockedIn ? (
                                            <>
                                                <button type="button" className={style.takePhoto} onClick={clockOut}>
                                                Absen Pulang
                                                </button>  
                                            </>
                                        ) : (
                                            <>
                                                {captured ? (
                                                    <>
                                                        <button type="button" className={style.takePhoto} onClick={retakePhoto}>
                                                        Ambil Ulang Foto
                                                        </button>
                                                        <button type="button" className={style.savePhoto} onClick={clockIn}>
                                                        Absen
                                                        </button>
                                                    </>
                                                ) : (
                                                    <>
                                                        <button type="button" className={style.takePhoto} onClick={takePhoto}>
                                                        Ambil Foto
                                                        </button>  
                                                    </>
                                                )}
                                            </>
                                        )}
                                    </>
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
                                            {clockedIn ? (
                                                <>
                                                <span className={`${style.icon} success`}>
                                                    <ClockInIcon />
                                                </span>
                                                <span className={style.absenIn}>
                                                    08.00
                                                </span>
                                                </>
                                            ) : (
                                                <>
                                                <span className={`${style.icon} danger`}>
                                                    <ClockInIcon />
                                                </span>
                                                <span className={`${style.absenIn} gray`}>
                                                    Belum melakukan absensi masuk
                                                </span>
                                                </>
                                            )}
                                        </div>
                                        <div>
                                            {clockedOut ? (
                                                <>
                                                <span className={`${style.icon} success`}>
                                                    <ClockOutIcon />
                                                </span>
                                                <span className={style.absenIn}>
                                                    16.00
                                                </span>
                                                </>
                                            ) : (
                                                <>
                                                <span className={`${style.icon} danger`}>
                                                    <ClockOutIcon />
                                                </span>
                                                <span className={`${style.absenIn} gray`}>
                                                    Belum melakukan absensi pulang
                                                </span>
                                                </>
                                            )}
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