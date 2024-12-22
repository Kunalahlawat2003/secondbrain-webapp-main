import { useRef, useState } from "react";
import { Button } from "../components/button";
import { Inputbox } from "../components/inputbox";
import { LoginTopbar } from "../components/loginTopbar";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";


export function Signin () {
    let [loading, setLoading] = useState(false);
    let [signintext, setSignintext] = useState("");
    const emailRef = useRef<HTMLInputElement>();
    const passwordRef = useRef<HTMLInputElement>();
    const navigate = useNavigate();


    async function signin () {
        const email = emailRef.current?.value ? emailRef.current.value.toLowerCase() : '';
        const password = passwordRef.current?.value;

        try {
            setLoading(true);
            const response = await axios.post(BACKEND_URL + "/api/v1/user/signin", {
                email,
                password
            })

            if(response.data.token) {
              const jwt = response.data.token;
              localStorage.setItem("token", jwt);
              navigate("/dashboard");
            }

        } catch(error: any) {
            setLoading(false);
            if(error.response.data.message === "Incorrect Credentials") {
                setSignintext("Incorrect Credentials");
            } else {
                setSignintext("Error while signing in");
            }
        }
    }

    return <div className="h-screen w-screen justify-center items-center flex dark:bg-neutral-900 bg-gray-200">
        <LoginTopbar/>
            <div className="bg-white dark:bg-black rounded-lg outline outline-2 outline-gray-400 p-5 md:w-[50%] xl:w-[40%] ">
                <div className="font-bold text-center dark:text-white text-xl font-sans mb-5">SIGN IN HERE</div>
                <Inputbox reference={emailRef} placeholder=" Enter Email" label="Email" labelSize="md" type="text"/>
                <Inputbox reference={passwordRef} placeholder=" Enter Password" label="Password" labelSize="md" type="password"/>
                <div className="text-sm dark:text-white px-2 mt-2">Not registered yet? <span className="text-blue-500 font-semibold hover:text-purple-700 transition-all"><a href="/"> Sign Up</a></span></div>
                <Button onClick={signin} variant="primary" text="Sign In" rounded="lg" fullwidth={true} loading={loading} fontsize="semibold"/>
                <div className="mt-2 text-center dark:text-white break-words">{signintext}</div>
            </div>
    
        </div>
}