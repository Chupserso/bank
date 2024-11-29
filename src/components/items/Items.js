import "./Items.css";
import { Item } from "../item/Item";

export const Items = ({ setData, data }) => {
    console.log(data);
    return (
        <div className="items">
            {data.days.map((dayItem, index) => {
                console.log(dayItem.subItems);
                return (
                    <Item
                        data={data}
                        setData={setData}
                        key={index}
                        day={dayItem.day}
                        sum={dayItem.sum}
                        subItems={dayItem.subItems || []} // Подэлементы дня
                    />
                );
            }
            )}
        </div>
    );
};