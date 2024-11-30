import { Link } from "react-router-dom";

export const Buttons = () => {
    return (
        <div>
            <Link to="/phone"><button className="button">Телефон</button></Link>
            <Link to="/document"><button className="button">Документ</button></Link>
        </div>
    );
}