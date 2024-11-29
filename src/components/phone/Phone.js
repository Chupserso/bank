import { useState } from "react";
import { PhoneHeader } from "../phoneHeader/PhoneHeader";
import { Items } from "../items/Items";
import { Nav } from "../nav/Nav";
import "./Phone.css";
import profileImg from "../../images/profile_icon.svg";
import arrowDownImg from "../../images/down-arrow.svg";

export const Phone = (props) => {
    const {data, setData, filter1, filter2, filter3, wifi, com, battery, time, color, batteryStyles} = props;

    return (
        <div className="phone">
            <div className="main-header">
                <PhoneHeader battery={battery} color={color} com={com} batteryStyles={batteryStyles} wifi={wifi} time={time} />
                <div className="new-header">
                    <div className="search">
                        <img src={profileImg} className="profile" />
                        <input type="text" placeholder="Поиск" />
                    </div>
                </div>
            </div>
            <div className="wrapper">
                <div className="filters">
                    <div className="filter">
                        <span>{filter1}</span>
                        <img src={arrowDownImg} />
                    </div>
                    <div className="filter">
                        <span>{filter2}</span>
                        <img src={arrowDownImg} />
                    </div>
                    <div className="filter">
                        <span>{filter3}</span>
                        <img src={arrowDownImg} />
                    </div>
                </div>
                <Items setData={setData} data={data} />
            </div>
            <Nav days={data.days} />
        </div>
    );
}