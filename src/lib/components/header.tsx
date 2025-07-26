import { Link } from "react-router";
import links from "../data/links.json";
import styles from "../styles/components/header.module.css";
import { useWindow } from "../context/window";
import { useEffect, useState } from "react";

export default function Header(){
    const {width,resizing} = useWindow();
	const isMobile = width < 1000;

    const [mobileMenuOpen,setMobileMenuOpen] = useState(false);

    useEffect(()=>{
        if(!mobileMenuOpen || !isMobile){
            document.body.style.overflow = "visible"
        }else{
            document.body.style.overflow = "hidden"
        }
    },[mobileMenuOpen,isMobile])
    
    return <>
        <header className={styles.container}>
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
        <div className={styles.placeHolder}/>
        {mobileMenuOpen && isMobile && <div className={styles.mobileMenuIn} style={{
            zIndex:"999"
        }}>
            {links.header.map(({label,href},key)=>(<Link onClick={()=>setMobileMenuOpen(false)} className="w-100 d-flex p-4 border-bottom border-accent" to={href} key={key}>
                {label}
            </Link>))}
        </div>}
    </>
}
