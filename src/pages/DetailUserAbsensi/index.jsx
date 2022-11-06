import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Detail from "../../components/Detail";
import Spinner from "../../components/Spinner";
import style from "./style.module.css";

const DetailUserAbsensi = () => {
    const params = useParams();
    console.log(params.absensiId);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 1000);

        document.title = "Detail Absensi - Dashboard";
    }, []);

    const lists = [
        {
            title: "Nama",
            value: "Ahmad Sodikin Alkabar",
            type: "text",
        },
        {
            title: "Jabatan",
            value: "Junior Software Engineer",
            type: "text",
        },
        {
            title: "Email",
            value: "ahmadsodikin64@amazon.id",
            type: "text",
        },
        {
            title: "Tanggal Absensi",
            value: "06 Oktober 2022",
            type: "text",
        },
        {
            title: "Waktu Absensi Masuk",
            value: "08.00",
            type: "text",
        },
        {
            title: "Waktu Absensi Pulang",
            value: "-",
            type: "text",
        },
        {
            title: "Foto Absensi Masuk",
            value: "https://via.placeholder.com/150",
            type: "image",
        },
    ];

    return (
        <div className={loading ? "center" : ""}>
            {loading ? (
                <Spinner type="user" size={48} borderSize={5} />
            ) : (
                <>
                <div className={style.header}>
                    <h2>Detail Absensi</h2>
                    <Link to="/dashboard/absensi">Kembali</Link>
                </div>
                <div className={style.detail}>
                    <Detail lists={lists} />
                </div>
                </>
            )}
        </div>
    );
};

export default DetailUserAbsensi;