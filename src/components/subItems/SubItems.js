import "./SubItems.css";
import { SubItem } from "../subItem/SubItem";
import fiveImg from "../../images/pyaterochka_icon.svg";
import vtbImg from "../../images/vtb_icon.svg";
import leftImg from "../../images/left arrow_icon.svg";
import rightImg from "../../images/right arrow_icon.svg";
import sberImg from "../../images/sberbank.logo_icon.svg";
import basketImg from "../../images/basket_icon.svg";
import bilainImg from "../../images/beeline_icon.svg";
import twoImg from "../../images/two arrows_icon.svg";
import sbePrimeImg from "../../images/sberprime_icon.svg";
import avitoImg from "../../images/avito_icon.svg";
import yandexImg from "../../images/yandex_icon.svg";
import yandexGoImg from "../../images/yandex.go_icon.svg";

export const SubItems = ({ data, setData, subItems }) => {
    return (
        <div className="sub-items">
            {(subItems || []).map((subItem, index) => (
                <SubItem
                    data={data}
                    color={subItem.color}
                    setData={setData}
                    id={subItem.id}
                    key={index}
                    img={subItem.img}
                    title={subItem.title}
                    subtitle={subItem.subtitle}
                    sum={subItem.sum}
                    subSubTitle={subItem.subSubTitle}
                    none={index === subItems.length - 1} // Последний элемент без HR
                />
            ))}
        </div>
    );
};