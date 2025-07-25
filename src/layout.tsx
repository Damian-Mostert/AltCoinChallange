import Footer from "./lib/components/footer";
import Header from "./lib/components/header";

type LayoutProps = {
    children:React.ReactElement
};

export default function Layout({children}:LayoutProps){
    return <>
    	<Header/>
        <main>{children}</main>
        <Footer/>
    </>
}