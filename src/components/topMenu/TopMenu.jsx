import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { topMenu } from "../../helper/constant";

function TopMenu() {
    const [idx, setIdx] = useState("All Events");
    const navigate = useNavigate();
    const location = useLocation()

    return (
        <ul className="hidden md:flex w-[400px] md:justify-evenly items-center my-[25px] text-[#C5C5C7] sticky top-[10px]">
            {topMenu.map((menu, index) => (
                <li
                    className={`cursor-pointer grid place-items-center ${location.pathname === `/${menu.path}` ? "text-primary" : ""}`}
                    key={index}
                    onClick={() => {
                        setIdx(menu.name);
                        navigate(`/${menu.path}`.toLowerCase());
                    }}
                >
                    <i className={`${menu.icon} mb-1`}></i>
                    <span className="font-medium text-[10px]">{menu.name}</span>
                </li>
            ))}
        </ul>
    );
}

export default TopMenu;
