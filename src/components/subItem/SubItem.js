import "./SubItem.css";

export const SubItem = (props) => {
    const {id, data, setData, img, none, color, title, sum, subSubTitle} = props;

    let hr = <hr />;

    if (none == true) {
        hr = "";
    }

    const onDelete = (e) => {
        const Swal = require("sweetalert2");
        Swal.fire({
            title: "Вы уверенны что хотите удалить?",
            text: "Вы не сможете вернуть обратно",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Да, удалить!"
          }).then((result) => {
            if (result.isConfirmed) {
                for (let i = 0; i < data.days.length; i++) {
                    for (let u = 0; u < data.days[i].subItems.length; u++ ) {
                        if (data.days[i].subItems[u].id == id) {
                            const selectedDay = data.days[i].day;
                            //Code
                            const updatedDays = data.days.map((item) => {
                                if (item.day === selectedDay) {
                                    return { ...item, subItems: data.days[i].subItems.filter(itm => itm.id != id) };
                                }
                                return item;
                            });
                            localStorage.removeItem("data");
                            localStorage.setItem("data", JSON.stringify({...data, days: updatedDays}));
                            setData(JSON.parse(localStorage.getItem("data")));
                        }
                    }
                }
            }
          });
    }

    return (
        <div className="sub-item" onClick={onDelete}>
            <div className="logo">
                <img src={img} alt={title} />
            </div>
            <div className="sub-wrapp">
                <div className="glob">
                    <div className="infos">
                        <div className="title">{title}</div>
                        <div className="sub-title">{subSubTitle}</div>
                    </div>
                    <div className={"money money-" + color}>{sum} ₽</div>
                </div>
                {!none && <hr />} {/* Показываем HR, кроме последнего элемента */}
            </div>
        </div>
    );
}