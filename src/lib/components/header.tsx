import { Link } from "react-router";
import links from "../data/links.json";
import styles from "../styles/components/header.module.css";

export default function Header(){
	return <header className={styles.container}>
		<div className="w-100"></div>
		<div className="w-50 d-flex justify-content-between">
            {links.header.map(({label,href},key)=>(<Link to={href} key={key}>
                {label}
            </Link>))}
		</div>
	</header>
}
