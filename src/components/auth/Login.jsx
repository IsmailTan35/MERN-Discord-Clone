import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const LoginPage = () => {
    const [form,setForm] = useState({
        email: "",
        password: ""
    });
    const navigate = useHistory()

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }
    const handleClick = (url) => {
        axios.post("/api/auth/login", form)
        .then(res => {
            if(res.data.success){
                navigate.push(url)
            }
        })
        .catch(err => {
            console.log(err)
        })
    }

    const handleUrl = (url) => {
        navigate.push(url)
    }
    return(
        <>
            <div className="login-wrapper">
                <div style={{width:"100%"}}>
                    <div className="auth-header-wrapper">
                        <h3>Tekrar Hoşgeldiniz</h3>
                        <span>Seni tekrar gördüğümüze sevindik!</span>
                    </div>
                    <div className="auth-input-wrapper">
                        <label>E-POSTA VEYA TELEFON NUMARASI</label>
                        <input name="email" className="auth-input" onChange={handleChange}/>
                    </div>
                    <div className="auth-input-wrapper">
                        <label>ŞİFRE</label>
                        <input name="password" className="auth-input" onChange={handleChange}/>
                    </div>
                    <div>
                        <button 
                            className="auth-links-button"
                            onClick={()=>{handleUrl("/auth/forget")}}>
                            Şifreni mi Unuttun?
                        </button>
                    </div>
                    <div>
                        <button className="auth-button"
                            onClick={()=>{handleClick("/channels/@me")}}>
                                Giriş
                        </button>
                    </div>
                    <div>
                        <span>Bir Hesaba mı ihtiyacın var? </span>
                        <button 
                            className="auth-links-button" 
                            onClick={()=>{handleUrl("/auth/register")}}>
                                Kaydol!
                        </button>
                    </div>
                </div>
                <div style={{}} className="login-center-wrapper">
                    <div style={{margin:" 0 32px",border: "1px solid transparent"}}></div>
                </div>
                <div className="login-qr-wrapper">
                    <div className="login-qr"></div>
                    <h3>QR Kodu ile giriş yap</h3>
                    <div className="" style={{color:"#b9bbbe"}}>
                        {"Anında giriş yapmak için bu kodu "}
                        <strong>Discord mobil uygulaması</strong>
                        {" ile tara."}
                    </div>
                </div>
            </div>
        </>
    )
}

export default LoginPage;