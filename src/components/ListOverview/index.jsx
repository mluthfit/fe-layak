import React from "react";
import { Link } from "react-router-dom";
import Bar from "../Bar";
import style from "./style.module.css";

const ListOverview = ({
  title,
  blank,
  href,
  Icon,
  listBar,
  additionalContent,
}) => {
  return (
    <div className={style.listOverview}>
      <div className={style.header}>
        <h2>{title}</h2>
        <Link to={href} className={style.anchorIcon}>
          <Icon />
        </Link>
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

export default ListOverview;
