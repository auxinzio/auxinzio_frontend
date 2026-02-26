"use client";

import { createContext, useState, useContext, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

import { API_URL } from "@/lib/constants";


const SettingContext = createContext(null);

export default function SettingProvider({children}){
    const [settings, setSettings] = useState("");

    useEffect(()=>{
        fetch(`${API_URL}/api/settings/settingsList`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({})})
        .then(res=>res.json())
        .then(data=>setSettings(data.data))
    },[]);

    console.log(settings);

    return(
        <>
            <SettingContext.Provider value={{settings}}>
                <div className="flex flex-col min-h-screen">
                    <main className="flex-grow">
                        {children} 
                    </main>
                </div>
            </SettingContext.Provider>
        </>
    );
}


export const useSettings = () => useContext(SettingContext);