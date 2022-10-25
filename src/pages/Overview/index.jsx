import React, { useEffect, useState } from "react";
import Spinner from "../../components/Spinner";
import CompanyProfile from "../../components/CompanyProfile";
import AbsensiOverview from "../../components/AbsensiOverview";
import CutiOverview from "../../components/CutiOverview";
import ReimburseOverview from "../../components/ReimburseOverview";
import FormUpdate from "../../components/FormUpdate";
import { ReactComponent as EmailIcon } from "../../assets/icons/mail.svg";
import { ReactComponent as DateIcon } from "../../assets/icons/calendar-dates.svg";
import { ReactComponent as EditIcon } from "../../assets/icons/pencil-edit.svg";
import style from "./style.module.css";

const Overview = () => {
  const [loading, setLoading] = useState(true);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  });

  const togglePopup = () => {
    const backgroundPopup = document.querySelector("#backgroundPopup");
    if (showPopup) {
      backgroundPopup.style.display = "none";
      setShowPopup(false);
      return;
    }

    const mainbar = document.querySelector("#mainbar");
    mainbar.scrollTo({ top: 0, behavior: "smooth" });
    backgroundPopup.style.display = "block";
    setShowPopup(true);
  };

  const openUploadImage = (e) => {
    const fileInput = e.target.parentNode.querySelector("#fileInput");
    fileInput.click();
  };

  return (
    <div className={`${style.overview} ${loading ? `${style.center}` : ""}`}>
      {loading ? (
        <Spinner size={48} borderSize={5} />
      ) : (
        <>
          <div className={style.left}>
            <div className={style.biodata}>
              <div className={style.mainDetails}>
                <div className={style.avatar} onClick={openUploadImage}>
                  <img
                    src="https://talentclick.com/wp-content/uploads/2021/08/placeholder-image.png"
                    alt=""
                  />
                  <input
                    type="file"
                    id="fileInput"
                    accept=".jpg, .jpeg, .png"
                    className={style.changePhotoProfile}
                  />
                  <div className={style.blank}></div>
                </div>
                <span className={style.name}>John Doe</span>
                <span className={style.position}>IT Support</span>
              </div>
              <div className={style.secondaryDetails}>
                <div>
                  <EmailIcon width={20} />
                  <span>johndoe64@gmail.com</span>
                </div>
                <div>
                  <DateIcon width={20} />
                  <span>16 Juni 2021</span>
                </div>
              </div>
              <button className={style.changePassword} onClick={togglePopup}>
                <EditIcon />
                <span>Ganti Password</span>
              </button>
            </div>
            {showPopup && (
              <FormUpdate
                title="Ganti Password"
                formInput={[]}
                submitHandle=""
                backHandle={togglePopup}
              />
            )}
            <CompanyProfile />
          </div>
          <div className={style.right}>
            <AbsensiOverview />
            <CutiOverview />
            <ReimburseOverview />
          </div>
        </>
      )}
    </div>
  );
};

export default Overview;
