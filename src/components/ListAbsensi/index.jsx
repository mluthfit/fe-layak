import React from "react";
import Bar from "../Bar";
import style from "./style.module.css";

const ListAbsensi = ({
  title,
  blank,
  listBar,
  additionalContent,
}) => {
  return (
    <div className={style.listAbsensi}>
        <div className={style.header}>
            <h2>{title}</h2>
        </div>
        {additionalContent}
        <div className={style.listBar}>
            {!listBar?.length && <div className={style.blank}>{blank}</div>}
            {listBar?.map((bar, index) => (
                <Bar
                    key={index}
                    link={bar.link}
                    title={bar.title}
                    icons={bar.icons}
                />
            ))}
        </div>
    </div>
  );
};

export default ListAbsensi;
