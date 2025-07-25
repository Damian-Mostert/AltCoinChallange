import type { ReactElement } from "react"

export type ButtonProps = {
	label:string,
	href?:string,
	variant?:string,
	onClick?:(data:any)=>void,
	icon?:ReactElement,
	type?:string,
	htmlFor?:string,
	className?:string,
	style?:any,
	id?:any,
	disabled?:boolean
}
