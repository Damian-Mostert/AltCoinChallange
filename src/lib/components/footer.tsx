import { Link } from "react-router";
import links from "../data/links.json";
import styles from "../styles/components/footer.module.css";
import { useWindow } from "../context/window";

export default function Footer(){
    const {width,resizing} = useWindow();
    const isMobile = width < 1000;
    
	return <footer className={styles.container}>
		{!resizing && <>
            <div className={`w-100 ${isMobile?"d-flex justify-content-center pb-4":""}`}>
                <Link to={'/'}><img width={200} src="/logo-placeholder.png"/></Link>
            </div>
    		<div className={`${isMobile?"w-100 text-center":"w-25"} d-flex flex-column justify-content-between gap-4`}>
                {links.footer.map(({label,href},key)=>(<Link onClick={()=>{
                    window.scrollTo({top:0,behavior:"smooth"})
                }} to={href} key={key}>
                    {label}
                </Link>))}
			</div>
        </>}
	</footer>
}
