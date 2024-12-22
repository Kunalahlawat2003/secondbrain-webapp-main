import { RecoilRoot } from "recoil"
import { Layout } from "./pages/layout"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Signup } from "./pages/signup"
import { Signin } from "./pages/signin"
import { SharedPage } from "./pages/share"



function App() {

  return <BrowserRouter>
    <RecoilRoot>
      <Routes>
        <Route path="/brain/share/:shareId" element={<SharedPage/>}/>
        <Route path="/" element={<Signup/>} />
        <Route path="/signin" element={<Signin/>} />
        <Route path="/dashboard" element={<Layout/>} />
      </Routes>
    </RecoilRoot>

  </BrowserRouter>

}

export default App
