import React from "react";
import Bar from "../Bar";
import style from "./style.module.css";

const ListRequest = ({ title, listRequested, listHistory }) => {
  return (
    <div className={style.listRequest}>
      <h3>{title}</h3>
      <div>
        <span>Diajukan</span>
        <div className={style.listBar}>
          {!listRequested?.length && (
            <div className={style.blank}>Belum ada data pengajuan terbaru</div>
          )}
          {listRequested?.map((bar, index) => (
            <Bar
              key={index}
              link={bar.link}
              title={bar.title}
              icons={bar.icons}
            />
          ))}
        </div>
      </div>
      <div className={style.history}>
        <span>Riwayat</span>
        <div className={style.listBar}>
          {!listHistory?.length && (
            <div className={style.blank}>Belum ada data riwayat pengajuan</div>
          )}
          {listHistory?.map((bar, index) => (
            <Bar
              key={index}
              link={bar.link}
              title={bar.title}
              icons={bar.icons}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ListRequest;
