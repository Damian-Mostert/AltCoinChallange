import { Link } from "react-router";
import links from "../data/links.json";
import styles from "../styles/components/footer.module.css";

export default function Footer(){
	return <footer className={styles.container}>
		<div className="w-100">
            <img width={200} src="/logo-placeholder.png"/>
        </div>
		<div className="w-25 d-flex flex-column justify-content-between">
			{links.footer.map(({label,href},key)=>(<Link to={href} key={key}>
				{label}
			</Link>))}
			</div>
	</footer>
}
