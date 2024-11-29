import "./Item.css";
import { SubItems } from "../subItems/SubItems";

export const Item = ({ data, setData, day, sum, subItems }) => {
    return (
        <div className="item">
            <div className="item-info">
                <div className="day">{day}</div>
                <div className="final-money">{sum} ₽</div>
            </div>
            <SubItems data={data} setData={setData} subItems={subItems} /> {/* Передаем подэлементы дня */}
        </div>
    );
};
