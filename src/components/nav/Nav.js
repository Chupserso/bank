import "./Nav.css";
import homeImg from "../../images/main_icon.svg";
import paymImg from "../../images/payments_icon.svg";
import histImg from "../../images/history_icon.svg";
import assisImg from "../../images/assistant_icon.svg";
import savImg from "../../images/savings_icon.svg";

export const Nav = (props) => {
    const {days} = props;
    let classN = "";
    if (days.length <= 1) {
        classN = "one"
    } else {
        classN = "twos"
    }

    return (
        <div className={"nav " + classN}>
            <div className="nav-item">
                <div className="img">
                    <img src={homeImg} />
                </div>
                <div className="text">Главный</div>
            </div>
            <div className="nav-item">
                <div className="img">
                    <img src={savImg} />
                </div>
                <div className="text">Накопления</div>
            </div>
            <div className="nav-item">
                <div className="img">
                    <img src={assisImg} />
                </div>
                <div className="text">Ассистент</div>
            </div>
            <div className="nav-item">
                <div className="img">
                    <img src={paymImg} />
                </div>
                <div className="text">Платежи</div>
            </div>
            <div className="nav-item">
                <div className="img">
                    <img src={histImg} />
                </div>
                <div className="text last">История</div>
            </div>
        </div>
    );
}