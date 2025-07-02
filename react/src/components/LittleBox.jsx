import { Link } from "react-router-dom";

const LittleBox = (props) => {
    const { title, page, id } = props;
    return (
        <div>
            <button><Link className="nav-link" to={`/${page}/${id}`}>{title}</Link></button>
        </div>
    );
}

export default LittleBox;