import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.css'
import './lib/styles/index.css'
import { BrowserRouter, Route, Routes } from "react-router";
//Pages
import TermsAndConditions from './lib/pages/terms-and-conditions.tsx'
import PrivacyPolicy from './lib/pages/privacy-policy.tsx'
import Home from './lib/pages/home.tsx'
import NotFound from './lib/pages/not-found.tsx'
import Layout from './layout.tsx'

const routerMap:any = {
  "*":NotFound,
  "/":Home,
  "/privacy-policy":PrivacyPolicy,
  "/terms-and-conditions":TermsAndConditions,
};

createRoot(document.getElementById('root')!).render(<StrictMode>
	<BrowserRouter>
	<Routes>
    {Object.keys(routerMap).map((key)=>{
      const Component = routerMap[key];
      return <Route key={key} path={key} element={<Layout><Component/></Layout>}/>
    })}
	</Routes>
	</BrowserRouter>
</StrictMode>)
