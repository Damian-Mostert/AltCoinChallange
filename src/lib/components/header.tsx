import { Link } from "react-router";
import links from "../data/links.json";
import styles from "../styles/components/header.module.css";
import { useWindow } from "../context/window";

export default function Header(){
    const {width,resizing} = useWindow();
	const isMobile = width < 1000;
    
    return <header className={styles.container}>
        {!resizing && <>
            <div className="w-100">
                <Link to={'/'}><img width={100} src="/logo-placeholder.png"/></Link>
            </div>
            {isMobile?<></>:<div className="w-50 d-flex justify-content-between">
                {links.header.map(({label,href},key)=>(<Link to={href} key={key}>
                    {label}
                </Link>))}
            </div>}
        </>}		
	</header>
}
