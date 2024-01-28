import Header from "../components/Header"
import { Outlet } from "react-router-dom"
export default function Temp() {
    const pic = require('../assets/bg.jpg')
    return (
        <div className='flex flex-col items-center justify-start w-full h-screen' style={{backgroundImage: `url(${pic})`, backgroundRepeat: "no-repeat", height: "100vh", width: "100vw", backgroundSize: "cover"}}>
            <Header />
            <Outlet />
        </div>

    )
}