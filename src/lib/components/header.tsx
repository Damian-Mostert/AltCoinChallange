import { Link } from "react-router";
import links from "../data/links.json";
import styles from "../styles/components/header.module.css";
import { useWindow } from "../context/window";
import { useState } from "react";

export default function Header(){
    const {width,resizing} = useWindow();
	const isMobile = width < 1000;

    const [mobileMenuOpen,setMobileMenuOpen] = useState(false);
    
    return <header className={styles.container}>
        {!resizing && <>
            <div className="w-100">
                <Link to={'/'}><img width={100} src="/logo-placeholder.png"/></Link>
            </div>
            {isMobile?<>
                <button onClick={()=>setMobileMenuOpen(!mobileMenuOpen)} className={`hamburger hamburger--collapse ${mobileMenuOpen?"is-active":""}`} type="button">
                    <span className="hamburger-box">
                        <span className="hamburger-inner"></span>
                    </span>
                </button>
            </>:<div className="w-50 d-flex justify-content-between">
                {links.header.map(({label,href},key)=>(<Link to={href} key={key}>
                    {label}
                </Link>))}
            </div>}
        </>}		
	</header>
}
