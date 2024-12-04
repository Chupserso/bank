import sberImg from "../../images/sberbank.logo_icon.png";
import signImg from "../../images/podp.png";
import geoImg from "../../images/mesto.png";
import phoneImg from "../../images/phone.png";
import "./Doc.css";
import html2canvas from 'html2canvas';
import { useRef } from "react";

export const Doc = ({documentContent, handleInputChange}) => {
    const ToCaptureRef = useRef();

    const captureScreenshot = ( ) => { 
        let canvasPromise = html2canvas ( ToCaptureRef . current , { 
          useCORS : true  // в случае, если в вашем приложении хранятся изображения
         }); 
        canvasPromise. then ( ( canvas )=> { 
          document . body . appendChild ( canvas ); 
        }); 
    }
    

    return (
        <div className="doc-wrap">
            <h1>Документ</h1>
            <div className="document" ref={ToCaptureRef}>
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
                    <div className="texsm">
                        <sup>2</sup> {documentContent.note2}
                    </div>
                </div>
            </div>
            <h2>Редактирование текста</h2>
            <button onClick={captureScreenshot}>Сделать скриншот</button>
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
        </div>
    );
}