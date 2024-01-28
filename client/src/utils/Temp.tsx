import Header from "../components/Header"
import { Outlet } from "react-router-dom"
export default function Temp() {
    return (
        <>
        <div className='flex flex-col items-center justify-start w-full'>
            <Header />
            <Outlet />
        </div>
        </>
    )
}