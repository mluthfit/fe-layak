import React, { useState } from "react";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import logoLayak from "../../assets/images/logo.png";
import { ReactComponent as AbsensiIcon } from "../../assets/icons/camera.svg";
import { ReactComponent as ClockInIcon } from "../../assets/icons/arrow-up-right.svg";
import { ReactComponent as ClockOutIcon } from "../../assets/icons/arrow-down-left.svg";
import { ReactComponent as CalendarIcon } from "../../assets/icons/calendar-dates.svg";
import { ReactComponent as RequestedIcon } from "../../assets/icons/check-mark.svg";
import { ReactComponent as ApprovedIcon } from "../../assets/icons/check-marks.svg";
import { ReactComponent as DeclinedIcon } from "../../assets/icons/cross.svg";
import { ReactComponent as EmailIcon } from "../../assets/icons/mail.svg";
import { ReactComponent as WhatsappIcon } from "../../assets/icons/whatsapp.svg";
import { ReactComponent as InstagramIcon } from "../../assets/icons/instagram.svg";
import {
  showBackgroundModal,
  hideBackgroundModal,
} from "../../scripts/backgroundModal";
import curve from "../../assets/images/curve.png";
import humanPics from "../../assets/images/human-pics.png";
import ListOverview from "../../components/ListOverview";
import style from "./style.module.css";

const LandingPage = () => {
  const listAbsensi = [
    {
      link: "",
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
      link: "",
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

  const [show, setShow] = useState(false);
  const toggleModalRegister = () => {
    const main = document.body;
    if (show) {
      hideBackgroundModal(main);
      setShow(false);
      return;
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
    showBackgroundModal(main);
    setShow(true);
  };

  return (
    <div id="main" className={style.main}>
      {show && (
        <div className={style.registerModal}>
          <h2>AYO DAFTARKAN PERUSAHAAN ANDA</h2>
          <div className={style.contacts}>
            <span>Hubungi Kami</span>
            <a href="mail" className={style.contact}>
              <EmailIcon />
              <span>cs@layak.co.id</span>
            </a>
            <a href="wa" className={style.contact}>
              <WhatsappIcon />
              <span>+62 812 1904 1270</span>
            </a>
            <a href="ig" className={style.contact}>
              <InstagramIcon />
              <span>layak.id</span>
            </a>
          </div>
          <div className={style.back}>
            <button onClick={toggleModalRegister} className="requested">
              Kembali
            </button>
          </div>
        </div>
      )}
      <div className={style.jumbotron}>
        <img src={curve} alt="" className={style.curve} />
        <div className={style.topbar}>
          <div className={style.topbarLeft}>
            <img src={logoLayak} alt="logolayak" />
            <span>Welcome!</span>
          </div>
          <div className={style.topbarRight}>
            <span>
              <HashLink className={style.pages} smooth to="/#home">
                Beranda
              </HashLink>
            </span>
            <span>
              <HashLink className={style.pages} smooth to="/#features">
                Fitur
              </HashLink>
            </span>
            <span>
              <HashLink className={style.pages} smooth to="/#testimoni">
                Testimoni
              </HashLink>
            </span>
            <span>
              <button className={style.pages} onClick={toggleModalRegister}>
                Register
              </button>
            </span>
            <span>
              <Link className={style.bluePages} to="/auth/login">
                Login
              </Link>
            </span>
          </div>
        </div>
        <div id="home" className={style.home}>
          <div className={style.homeText}>
            <h1>Integrasi.</h1>
            <h1>Simplifikasi.</h1>
            <p>
              <span className={style.blueBold}>Layak (Layanan Kantor)</span>{" "}
              lebih dari tools perusahaan sederhana. Integrasikan proses
              manajemen anda sekarang.
            </p>
            <button className={style.joinButton} onClick={toggleModalRegister}>
              Gabung Sekarang
            </button>
          </div>
          <img src={humanPics} alt="humanpics" />
        </div>
      </div>
      <div id="features" className={style.features}>
        <h1>Absensi.</h1>
        <p>
          Integrasikan absensi seluruh pegawai dalam fitur sederhana ini.
          Dilengkapi dengan validasi foto.
        </p>
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
                  <span className={`${style.absenIn} gray`}>08.00</span>
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
      <div className={`${style.features} ${style.marBot}`}>
        <h1>Pengajuan Cuti.</h1>
        <p>
          Simplifikasi proses pengajuan dan penerimaan cuti dengan layanan kami.
        </p>
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
        <h1>dan masih banyak lagi...</h1>
      </div>
      <div id="testimoni" className={style.testimoni}>
        <h1>Testimoni Pengguna Kami</h1>
        <div className={style.listTestimoni}>
          <h2 className={style.review}>
            "Perusahaan saya telah menggunakan aplikasi{" "}
            <span className={style.italic}>Layak</span> selama 3 bulan. Semenjak
            penggunaan, seluruh proses manajemen menjadi lebih efektif dan
            efisien."
          </h2>
          <div className={style.reviewer}>
            <p>John Doe, Manager Regional, PT. Mantap Jaya</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
