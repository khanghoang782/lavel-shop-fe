import {RegisterForm} from "../components/forms/RegisterForm.jsx";
import {NavBar} from "../components/NavBar.jsx";


export function LoginPage() {


    return (
        <>
            <NavBar/>
            <main className="w-screen min-h-screen flex flex-col items-center justify-center pb-48 bg-gray-50">
                <RegisterForm/>
            </main>
        </>
    )
}