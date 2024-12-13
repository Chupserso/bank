import "./Form.css";
import { useState, useEffect } from "react";
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
import chyzhykImg from "../../images/chyzhyk_icon.svg";


const images = [
    { name: "Yandex", src: yandexImg },
    { name: "Sberbank", src: sberImg },
    { name: "Pyaterochka", src: fiveImg },
    { name: "VTB", src: vtbImg },
    { name: "Left Arrow", src: leftImg },
    { name: "Right Arrow", src: rightImg },
    { name: "Basket", src: basketImg },
    { name: "Beeline", src: bilainImg },
    { name: "Two Arrows", src: twoImg },
    { name: "SberPrime", src: sbePrimeImg },
    { name: "Avito", src: avitoImg },
    { name: "Chyzhyk", src: chyzhykImg },
    { name: "Yandex Go", src: yandexGoImg },
];

export const Form = (props) => {
    const { time, battery, com, wifi, setWifi, setBattery, setCom, setTime, data, setData, filter1, filter2, filter3, setFilter1, setFilter2, setFilter3 } = props;

    const [selectedDay, setSelectedDay] = useState("");
    const [subTitle, setSubTitle] = useState("");
    const [subSubTitle, setSubSubTitle] = useState("");
    const [subSum, setSubSum] = useState("");
    const [subImage, setSubImage] = useState(images[0].src);
    const [color, setColor] = useState("gray");

    const [selectedDay1, setSelectedDay1] = useState("");

    const addSubItem = () => {
        const id = Math.floor(Math.random() * 199999);
        if (!selectedDay) {
            return alert("Заполните все поля для SubItem!");
        }

        const updatedDays = data.days.map((d) => {
            if (d.day === selectedDay) {
                const newSubItem = { id: id, title: subTitle, subSubTitle: subSubTitle, sum: subSum, img: subImage, color: color };
                return { ...d, subItems: [newSubItem, ...(d.subItems || [])] };
            }
            return d;
        });

        const newData = { ...data, days: updatedDays };
        console.log("data: ");
        console.log(newData);
        localStorage.removeItem("data");
        localStorage.setItem("data", JSON.stringify(newData));
        setData(newData);
        setSubTitle("");
        setSubSum("");
    };


    const [day, setDay] = useState("");
    const [dayDel, setDayDel] = useState("");
    const [sum, setSum] = useState("");

    // Инициализация данных из localStorage
    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem("data"));
        if (storedData) {
            setData(storedData);
        }
    }, [setData]);

    // Функция для создания нового дня
    const createDay = () => {
        if (!day || !sum) {
            alert("Пожалуйста, заполните оба поля!");
            return;
        }

        const newDay = { day, sum };
        const updatedData = {
            ...data,
            days: [newDay, ...(data.days || [])],
        };

        localStorage.setItem("data", JSON.stringify(updatedData));
        setData(updatedData);
        setDay("");
        setSum("");
    };

    // Функция для удаления дня
    const deleteDay = () => {
        if (!dayDel) {
            alert("Введите день для удаления!");
            return;
        }

        const updatedData = {
            ...data,
            days: (data.days || []).filter(
                (item) => item.day.toLowerCase() !== dayDel.toLowerCase()
            ),
        };

        localStorage.setItem("data", JSON.stringify(updatedData));
        setData(updatedData);
        setDayDel("");
    };

    // Функция для обновления элемента в массиве
    const updateDay = (index, updatedItem) => {
        const updatedDays = [...(data.days || [])];
        updatedDays[index] = updatedItem;

        const updatedData = { ...data, days: updatedDays };
        localStorage.setItem("data", JSON.stringify(updatedData));
        setData(updatedData);
    };

    // Компонент для редактирования элемента
    const ItemForm = ({ day, sum, index }) => {
        const [localDay, setLocalDay] = useState(day); // Локальное состояние для дня
        const [localSum, setLocalSum] = useState(sum); // Локальное состояние для суммы

        const handleSave = () => {
            // Сохраняем изменения в глобальное состояние при нажатии кнопки
            updateDay(index, { day: localDay, sum: localSum });
        };

        return (
            <div className="new">
                <label>Редактирование дня:</label>
                <input
                    type="text"
                    value={localDay}
                    onChange={(e) => setLocalDay(e.target.value)} // Обновляем локальное состояние
                    placeholder="День"
                />
                <input
                    type="text"
                    value={localSum}
                    onChange={(e) => setLocalSum(e.target.value)} // Обновляем локальное состояние
                    placeholder="Сумма"
                />
                <button onClick={handleSave}>Сохранить</button> {/* Кнопка для сохранения */}
            </div>
        );
    };

    const updateSubItemField = (field, value, subItemId) => {
        const updatedDays = data.days.map((d) => {
            if (d.day === selectedDay1) {
                const updatedSubItems = d.subItems.map((sub) => {
                    if (sub.id === subItemId) {
                        return { ...sub, [field]: value };
                    }
                    return sub;
                });
                return { ...d, subItems: updatedSubItems };
            }
            return d;
        });

        const newData = { ...data, days: updatedDays };
        localStorage.setItem("data", JSON.stringify(newData));
        setData(newData);
    };

    const moveDayUp = (index) => {
        if (index === 0) return; // Первый элемент не может быть перемещён выше
    
        const updatedDays = [...data.days];
        [updatedDays[index - 1], updatedDays[index]] = [updatedDays[index], updatedDays[index - 1]]; // Меняем местами
    
        const updatedData = { ...data, days: updatedDays };
        localStorage.setItem("data", JSON.stringify(updatedData));
        setData(updatedData);
    };
    
    const moveDayDown = (index) => {
        if (index === data.days.length - 1) return; // Последний элемент не может быть перемещён ниже
    
        const updatedDays = [...data.days];
        [updatedDays[index], updatedDays[index + 1]] = [updatedDays[index + 1], updatedDays[index]]; // Меняем местами
    
        const updatedData = { ...data, days: updatedDays };
        localStorage.setItem("data", JSON.stringify(updatedData));
        setData(updatedData);
    };

    // Рендеринг форм для каждого элемента
    const forms = (data.days || []).map((item, index) => (
        <div key={index} className="day-item">
            <ItemForm
                key={index}
                index={index}
                day={item.day}
                sum={item.sum}
            />
            <button onClick={() => moveDayUp(index)}>Вверх</button>
            <button onClick={() => moveDayDown(index)}>Вниз</button>
        </div>
    ));

    return (
        <div className="form">
            <div className="day-form">
                <label>Создание дня</label>
                <input
                    type="text"
                    value={day}
                    onChange={(e) => setDay(e.target.value)}
                    placeholder="День недели"
                />
                <input
                    type="text"
                    value={sum}
                    onChange={(e) => setSum(e.target.value)}
                    placeholder="Итоговая сумма"
                />
                <input type="submit" onClick={createDay} value="Создать" />
                <br />
                <br />
                <label>Удаление дня</label>
                <input
                    type="text"
                    value={dayDel}
                    onChange={(e) => setDayDel(e.target.value)}
                    placeholder="День недели"
                />
                <input type="submit" onClick={deleteDay} value="Удалить" />
                <br />
            </div>


            <div className="sub-form">
            <h2>Создание Элементов внутри дней</h2>
            <select onChange={(e) => setSelectedDay(e.target.value)} value={selectedDay}>
                <option value="">Выберите день</option>
                {data.days.map((d) => (
                    <option key={d.day} value={d.day}>
                        {d.day}
                    </option>
                ))}
            </select>
            <input
                type="text"
                value={subTitle}
                onChange={(e) => setSubTitle(e.target.value)}
                placeholder="Название SubItem"
            />
            <label>Выбор цвета</label>
            <select onChange={(e) => setColor(e.target.value)} value={color}>
                <option value="white">White</option>
                <option value="green">Green</option>
                <option value="gray">Gray</option>
            </select>
            <input
                type="text"
                value={subSubTitle}
                onChange={(e) => setSubSubTitle(e.target.value)}
                placeholder="Текст под названием"
            />
            <input
                type="text"
                value={subSum}
                onChange={(e) => setSubSum(e.target.value)}
                placeholder="Сумма SubItem"
            />
            <select onChange={(e) => setSubImage(e.target.value)} value={subImage}>
                {images.map((img) => (
                    <option key={img.name} value={img.src}>
                        {img.name}
                    </option>
                ))}
            </select>
            <button onClick={addSubItem}>Добавить SubItem</button>
            <br />

            <div className="sub-form">
                <h2>Редактирование SubItems</h2>

                {/* Выбор дня */}
                <label>Выберите день:</label>
                <select onChange={(e) => setSelectedDay1(e.target.value)} value={selectedDay1}>
                    <option value="">Выберите день</option>
                    {data.days.map((d) => {
                        if (d.subItems != undefined) {
                            return (
                                <option key={d.day} value={d.day}>
                                    {d.day}
                                </option>
                            );
                        }
                    })}
                </select>

                {/* Редактирование SubItems */}
                {selectedDay1 && (
                    <div>
                        {data.days.find((d) => d.day === selectedDay1)
                            ?.subItems.map((sub) => (
                                <div key={sub.id} className="block">
                                    <label>Название:</label>
                                    <input
                                        type="text"
                                        value={sub.title}
                                        onChange={(e) => updateSubItemField("title", e.target.value, sub.id)}
                                    />

                                    <label>Описание:</label>
                                    <input
                                        type="text"
                                        value={sub.subSubTitle}
                                        onChange={(e) => updateSubItemField("subSubTitle", e.target.value, sub.id)}
                                    />

                                    <label>Цвет:</label>
                                    <select onChange={(e) => updateSubItemField("color", e.target.value, sub.id)} value={sub.color}>
                                        <option value="white">White</option>
                                        <option value="green">Green</option>
                                        <option value="gray">Gray</option>
                                    </select>

                                    <label>Сумма:</label>
                                    <input
                                        type="text"
                                        value={sub.sum}
                                        onChange={(e) => updateSubItemField("sum", e.target.value, sub.id)}
                                    />

                                    <label>Изображение:</label>
                                    <select
                                        onChange={(e) => updateSubItemField("img", e.target.value, sub.id)}
                                        value={sub.img}
                                    >
                                        {images.map((img) => (
                                            <option key={img.name} value={img.src}>
                                                {img.name}
                                            </option>
                                        ))}
                                    </select>
                                    <hr />
                                </div>
                            ))}
                    </div>
                )}
                </div>
            <br />
            </div>
            <div className="edit-forms">{forms}</div>
            <br />
            <div className="filtrs-form">
                <label>Фильтр 1</label>
                <input
                    type="text"
                    value={filter1}
                    onChange={(e) => {
                        localStorage.removeItem("filter1");
                        localStorage.setItem("filter1", e.target.value);
                        setFilter1(localStorage.getItem("filter1"));
                    }}
                    placeholder="Фильтр 1"
                />
                <br />
                <label>Фильтр 2</label>
                <input
                    type="text"
                    value={filter2}
                    onChange={(e) => {
                        localStorage.removeItem("filter2");
                        localStorage.setItem("filter2", e.target.value);
                        setFilter2(localStorage.getItem("filter2"));
                    }}
                    placeholder="Фильтр 2"
                />
                <br />
                <label>Фильтр 3</label>
                <input
                    type="text"
                    value={filter3}
                    onChange={(e) => {
                        localStorage.removeItem("filter3");
                        localStorage.setItem("filter3", e.target.value);
                        setFilter3(localStorage.getItem("filter3"));
                    }}
                    placeholder="Фильтр 3"
                />
            </div>
            <div className="form-phone">
                <label>Батарея</label>
                <input
                    type="number"
                    min="5"
                    max="100"
                    value={battery}
                    onChange={(e) => {
                        localStorage.removeItem("battery");
                        localStorage.setItem("battery", e.target.value);
                        setBattery(localStorage.getItem("battery"));
                    }}
                    placeholder="Батарея"
                />
                            <br />
                <label>Связь</label>
                <input
                    type="number"
                    min={0}
                    max={4}
                    value={com}
                    onChange={(e) => {
                        localStorage.removeItem("com");
                        localStorage.setItem("com", e.target.value);
                        setCom(localStorage.getItem("com"));
                    }}
                    placeholder="Связь"
                />
                            <br />
                <label>Время</label>
                <input
                    type="text"
                    value={time}
                    onChange={(e) => {
                        localStorage.removeItem("time");
                        localStorage.setItem("time", e.target.value);
                        setTime(localStorage.getItem("time"));
                    }}
                    placeholder="Время"
                />
                            <br />
                <label>Вай фай</label>
                <input
                    type="number"
                    min={1}
                    max={3}
                    value={wifi}
                    onChange={(e) => {
                        localStorage.removeItem("wifi");
                        localStorage.setItem("wifi", e.target.value);
                        setWifi(localStorage.getItem("wifi"));
                    }}
                    placeholder="Вай фай"
                />
            </div>
        </div>
    );
};
