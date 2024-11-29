import "./App.css";
import { Phone } from "../phone/Phone";
import { Form } from "../form/Form";
import { useState, useEffect } from "react";
import sberImg from "../../images/sberbank.logo_icon.svg";
import signImg from "../../images/podp.png";
import geoImg from "../../images/mesto.png";
import phoneImg from "../../images/phone.png";

export const App = () => {
    if (localStorage.getItem("data")) {
        const ok = "ok";
    } else {
        localStorage.setItem("data", JSON.stringify({days : [],}));
    }

    const [filter1, setFilter1] = useState(localStorage.getItem("filter1") || "Тип операции");
    const [filter2, setFilter2] = useState(localStorage.getItem("filter2") || "Период");
    const [filter3, setFilter3] = useState(localStorage.getItem("filter3") || "Карта или");

    const [data, setData] = useState(JSON.parse(localStorage.getItem("data")));


    if (localStorage.getItem("time")) {
        const ok = 1;
    } else {
        localStorage.setItem("time", "16:03");
    }
    const [time, setTime] = useState(localStorage.getItem("time"));

    if (localStorage.getItem("battery")) {
        const ok = 1;
    } else {
        localStorage.setItem("battery", 100);
    }
    const [battery, setBattery] = useState(localStorage.getItem("battery"));

    let color;

    if (battery <= 18) {
        color = "red"
    } else if (battery > 18 && battery < 50) {
        color = "orange"
    } else if (battery >= 50) {
        color = "green"
    }

    const batteryStyles = {"width": `${battery}%`, color};

    const onBatteryInput = (e) => {
        setBattery(e.target.value);
        localStorage.removeItem("battery");
        localStorage.setItem("battery", e.target.value);
    }

    if (localStorage.getItem("com")) {
        const ok = 1;
    } else {
        localStorage.setItem("com", 2);
    }
    const [com, setCom] = useState(localStorage.getItem("com"));

    if (localStorage.getItem("wifi")) {
        const ok = 1;
    } else {
        localStorage.setItem("wifi", 2);
    }
    const [wifi, setWifi] = useState(localStorage.getItem("wifi"));

    const initialContent = JSON.parse(localStorage.getItem("documentContent")) || {
        bankName: "СБЕР БАНК",
        address1: "ул. Вавилова, д. 19, Москва, 117997",
        phone1: "8 900 +7 495 500-55-50",
        address2: "19 Vavilova St., Moscow, 117997",
        website: "www.sberbank.ru",
        generatedDate: "11 November 2024 года",
        title: "Справка по операции",
        paragraph: "ПАО «Сбербанк» сообщает, что указанная ниже операция зачисления была совершена по платежному счету *4158, держателем которого является АЛЕКСЕЙ АЛЕКСАНДРОВИЧ ЗУБКОВ",
        operationDate: "8 ноября 2024 в 22:36",
        operationStatus: "Исполнена",
        operationAmount: "15 000,00 руб.",
        operationDescription: "Альфа Банк",
        authorizationCode: "282680",
        footerName: "Дерунова К. А.",
        footerPosition: "Управляющий директор Дивизиона «Забота о клиентах»",
        note: "Обратите внимание, что некоторые организации требуют заверить документ в офисе Банка. Рекомендуем уточнить требования к документу у получателя."
    };

    const [documentContent, setDocumentContent] = useState(initialContent);

    // Сохранение данных в localStorage при каждом изменении
    useEffect(() => {
        localStorage.setItem("documentContent", JSON.stringify(documentContent));
    }, [documentContent]);

    const handleInputChange = (field, value) => {
        setDocumentContent((prev) => ({ ...prev, [field]: value }));
    };

    
    return (
        <div className="app">
            <h1>Документ</h1>
            <div className="document">
                <div className="doc">
                    <div className="hat">
                        <div className="log">
                            <img src={sberImg} className="sber-img" alt="Sberbank Logo" />
                            <div className="sber-text">{documentContent.bankName}</div>
                        </div>
                        <div className="text-right text-sm adresses">
                            <div className="wrap">
                                <div className="wrap-item"><img src={geoImg}/> {documentContent.address1}</div>
                                <div className="wrap-item"><img src={phoneImg}/> {documentContent.phone1}</div>
                            </div>
                            <div className="wrap">
                                <div className="wrap-item">{documentContent.address2}</div>
                                <div className="wrap-item">{documentContent.website}</div>
                            </div>
                        </div>
                    </div>
                    <div className="sformed">
                        <div>Сформировано в Сбербанк Онлайн {documentContent.generatedDate}</div>
                    </div>
                    <h1 className="text-2xl font-bold mb-4 text1">{documentContent.title}</h1>
                    <p className="prg">{documentContent.paragraph}</p>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                            <div className="text-b">Операция совершена</div>
                            <div className="bold">{documentContent.operationDate}</div>
                        </div>
                        <div>
                            <div className="text-b">Статус операции</div>
                            <div className="bold">{documentContent.operationStatus}</div>
                        </div>
                        <div>
                            <div className="text-b">Сумма в валюте счета</div>
                            <div className="bold">{documentContent.operationAmount}</div>
                        </div>
                        <div>
                            <div className="text-b">Описание</div>
                            <div className="bold">{documentContent.operationDescription}</div>
                        </div>
                        <div>
                            <div className="text-b">Код авторизации</div>
                            <div className="bold">{documentContent.authorizationCode}</div>
                        </div>
                    </div>
                    <div className="footr">
                        <div className="texts">
                            <div className="font-bold">{documentContent.footerName}</div>
                            <div>{documentContent.footerPosition}</div>
                        </div>
                        <div className="sign">
                            <img src={signImg} alt="Signature" />
                        </div>
                    </div>
                    <div className="texsm">
                        <sup>1</sup> {documentContent.note}
                    </div>
                </div>
            </div>
            <h2>Редактирование текста</h2>
            <form className="edit-form">
                {Object.keys(documentContent).map((field) => (
                    <label key={field}>
                        {field}:
                        <textarea
                            value={documentContent[field]}
                            onChange={(e) => handleInputChange(field, e.target.value)}
                        />
                    </label>
                ))}
            </form>
            <h1 className="page-title">Приложение:</h1>
            <Phone wifi={wifi} setCom={setCom} com={com} batteryStyles={batteryStyles} color={color} battery={battery} time={time} filter1={filter1} filter2={filter2} filter3={filter3} data={data} setData={setData} />
            <Form wifi={wifi} com={com} battery={battery} time={time} setWifi={setWifi} setCom={setCom} setBattery={setBattery} setTime={setTime} data={data} setFilter1={setFilter1} filter1={filter1} setFilter2={setFilter2} filter2={filter2}  setFilter3={setFilter3} filter3={filter3} setData={setData} />
        </div>
    );
}