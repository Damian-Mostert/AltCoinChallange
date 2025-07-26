import styles from "../styles/components/button.module.css";
import type { ButtonProps } from "../types/button";
import { Link } from "react-router";


export default function Button({id,disabled,label,href,onClick,variant,icon,type,htmlFor,className="",style}:ButtonProps){
	if(htmlFor) return<label aria-disabled={disabled} id={id} htmlFor={htmlFor} style={style} onClick={onClick} className={`${styles.button} ${styles[`variant-${variant}`]} ${className}`}>{icon} {label}</label>
	if(href)return <Link aria-disabled={disabled} id={id} to={href} style={style} className={`${styles.button} ${styles[`variant-${variant}`]} ${className}`}>{icon} {label}</Link> 
	//@ts-ignore
	return <button disabled={disabled} id={id} type={type} style={style} onClick={onClick} className={`${styles.button} ${styles[`variant-${variant}`]} ${className}`}>{icon} {label}</button>
}
