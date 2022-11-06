import React from "react";
import logolayak from "../../assets/images/logo.png";
import { ReactComponent as AbsensiIcon } from "../../assets/icons/camera.svg";
import { ReactComponent as ClockInIcon } from "../../assets/icons/arrow-up-right.svg";
import { ReactComponent as ClockOutIcon } from "../../assets/icons/arrow-down-left.svg";
import { ReactComponent as CalendarIcon } from "../../assets/icons/calendar-dates.svg";
import { ReactComponent as RequestedIcon } from "../../assets/icons/check-mark.svg";
import { ReactComponent as ApprovedIcon } from "../../assets/icons/check-marks.svg";
import { ReactComponent as DeclinedIcon } from "../../assets/icons/cross.svg";
import humanpics from "../../assets/images/humanpics.png";
import { Link } from "react-router-dom";
import ListOverview from "../../components/ListOverview";
import style from "./style.module.css";

const LandingPage = () => {
    const listAbsensi = [
        {
            link : "",
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
            link : "",
            title : "05 Oktober 2022",
            icons : (
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
    ];

    const listBarCuti = [
        {
          link: "",
          title: "05 Oktober 2022 - 10 Oktober 2022",
          icons: (
            <>
              <span className="requested">
                <RequestedIcon />
              </span>
            </>
          ),
        },
        {
          link: "",
          title: "20 September 2022 - 25 September 2022",
          icons: (
            <>
              <span className="danger">
                <DeclinedIcon />
              </span>
            </>
          ),
        },
        {
          link: "",
          title: "01 September 2022 - 02 September 2022",
          icons: (
            <>
              <span className="success">
                <ApprovedIcon />
              </span>
            </>
          ),
        },
      ];

    return (
        <div className={style.main}>
            <div className={style.topbar}>
                <img src={logolayak} alt="logolayak" />
                <span>
                    <h1>Welcome!</h1>
                </span>
                <div className={style.topbarright}>
                    <span>
                        <Link 
                        className={style.pages}
                        to="/#home"
                        >
                            Beranda
                        </Link>
                    </span>
                    <span>
                        <Link
                        className={style.pages}
                        to="/#features"
                        >
                            Fitur
                        </Link>
                    </span>
                    <span>
                        <Link
                        className={style.pages}
                        to="/#testimoni"
                        >
                            Testimoni    
                        </Link>
                    </span>
                    <span>
                        <Link
                        className={style.pages}
                        to="/register"
                        >
                            Register
                        </Link>
                    </span>
                    <span>
                        <Link
                        className={style.bluepages}
                        to="/auth/login"
                        >
                            Login
                        </Link>
                    </span>
                </div>
            </div>
            <div id="home" className={style.home}>
                <div className={style.hometext}>
                    <h1>Integrasi.</h1>
                    <h1>Simplifikasi.</h1>
                    <p><span className={style.bluebold}>Layak (Layanan Kantor)</span> lebih dari tools perusahaan sederhana.
                    Integrasikan proses manajemen anda sekarang.
                    </p>
                    <button className={style.joinbutton}>Gabung Sekarang</button>
                </div>
                <span className={style.humanpics}>
                    <img src={humanpics} alt="humanpics" />
                </span>
            </div>
            <div id="Absensi" className={style.features}>
                <h1>Absensi.</h1>
                <p>Integrasikan absensi seluruh pegawai dalam fitur sederhana ini. Dilengkapi dengan validasi foto.</p>
                <div className={style.listFitur}>
                    <ListOverview 
                    title="Absensi"
                    blank="Data absensi tidak dapat ditemukan"
                    href=""
                    Icon={AbsensiIcon}
                    listBar={listAbsensi}
                    additionalContent={
                        <div className={style.statusToday}>
                            <div>
                                <span className={`${style.icon} success`}>
                                    <ClockInIcon />
                                </span>
                                <span className={`${style.absenIn} gray`}>
                                    08.00
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
            <div id="Cuti" className={style.features}>
                <h1>Pengajuan Cuti.</h1>
                <p>Simplifikasi proses pengajuan dan penerimaan cuti dengan layanan kami.</p>
                <div className={style.listFitur}>
                    <ListOverview
                    title="Pengajuan Cuti"
                    blank="Data pengajuan cuti tidak ditemukan"
                    href=""
                    Icon={CalendarIcon}
                    listBar={listBarCuti}
                    additionalContent={
                        <div className={style.sisaCuti}>
                            <span className={style.label}>Sisa Cuti</span>
                            <span className={style.value}>10 Hari</span>
                        </div>
                    } 
                    />
                </div>
            </div>
            <div className={style.more}>
                <h1 className={style.textcenter}>dan masih banyak lagi...</h1>
            </div>
            <div id="Testimoni" className={style.testimoni}>
                <h1>Testimoni Pengguna Kami</h1>
                <div className={style.listTestimoni}>
                    <h2 className={style.review}>"Perusahaan saya telah menggunakan aplikasi <span className={style.italic}>Layak</span> selama 3 bulan.
                    Semenjak penggunaan, seluruh proses manajemen menjadi lebih efektif dan efisien."</h2>
                    <div className={style.reviewer}>
                        <p>John Doe, Manager Regional, PT. Mantap Jaya</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;