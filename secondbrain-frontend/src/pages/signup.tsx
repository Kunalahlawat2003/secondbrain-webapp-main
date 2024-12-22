import { useRef, useState } from "react";
import { Button } from "../components/button";
import { Inputbox } from "../components/inputbox";
import { LoginTopbar } from "../components/loginTopbar";
import axios from "axios";
import { BACKEND_URL } from "../config";


export function Signup () {
    let [loading, setLoading] = useState(false);
    let [signuptext, setSignupText] = useState("");
    const nameRef = useRef<HTMLInputElement>();
    const emailRef = useRef<HTMLInputElement>();
    const passwordRef = useRef<HTMLInputElement>();

    async function signup() {
        const email = emailRef.current?.value ? emailRef.current.value.toLowerCase() : '';
        const password = passwordRef.current?.value;
        const name = nameRef.current?.value;
        
        try {
            setLoading(true);
            const response = await axios.post(BACKEND_URL + "/api/v1/user/signup", {
                    name,
                    email,
                    password
            })
            if(response.data.message === "You are signed up") {
              setSignupText("You are Signed up. Please Login")
            }
        } catch(error: any) {
            setLoading(false);
            console.log(error);
            if(error.response.data.message === "User already exists") {
                setSignupText("User already exists");
            } else if (error.response.data.message === "incorrect format") {
                setSignupText("Error: Check email or password format")
            } else {
              setSignupText("signup failed. Please try again")
            }
        }
    }

    return <div className="h-screen w-screen justify-center items-center flex dark:bg-neutral-900 bg-gray-200">
        <LoginTopbar/>
        <div className="bg-white dark:bg-black rounded-lg outline outline-2 outline-gray-400 p-5 md:w-[50%] xl:w-[40%] ">
            <div className="font-bold dark:text-white text-center text-xl font-sans mb-5">SIGN UP HERE</div>
            <Inputbox reference={nameRef} placeholder=" Enter Name" label="Name" labelSize="md" type="text"/>
            <Inputbox reference={emailRef} placeholder=" Enter Email" label="Email" labelSize="md" type="text"/>
            <Inputbox reference={passwordRef} placeholder=" Enter Password" label="Password" labelSize="md" type="password"/>
            <div className="text-xs dark:text-gray-300 text-gray-500 font-light px-2">
                Password must be of minimum 8 characters <br/>
                Atleast One Uppercase and Lowercase letter <br/>
                Password must contain one Special Characters<br/>
                Eg: IamExample@123
            </div>
            <div className="dark:text-white text-center text-sm px-2 mt-2">Already registered? <span className="text-blue-500 font-semibold hover:text-purple-700 transition-all"><a href="/signin"> Login</a></span></div>
            <Button onClick={signup} variant="primary" text="Sign Up" rounded="lg" fullwidth={true} loading={loading} fontsize="semibold"/>
            <div className="mt-2 text-center dark:text-white break-words">{signuptext}</div>
        </div>

    </div>
}