import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext"; 

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./styles.css";

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  
  const navigate = useNavigate();
  const { login } = useAuth();
  const notify = (text) => toast(text);

  function navegar() {
    navigate("/");
  }

  const onSubmit = async (data) => {
    try {
      const response = await axios.get("http://localhost:3000/user", {
        params: {
          username: data.username,
          password: data.password,
        },
      });

      if (response.data.length > 0) {
        login();
        notify("Login bem-sucedido!");
        setTimeout( navegar, 2000);
        
      } else {
        notify("Usuário ou senha incorretos");
      }
    } catch (error) {
      notify(`Erro ao fazer login: ${error}`);
    }
  };

  return (
    <section className="login-container">
      <div className="leftSide">
        <img src="/login_draw.svg" alt="imagem logo login" />
        <ToastContainer />
      </div>
      <div className="rigthSide">
      <img src="/monitor_draw.svg" alt="imagem logo monitor" />
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="username">Usuário:</label>
            <input
              type="text"
              id="username"
              {...register("username", { required: true })}
            />
            {errors.username && (
              <span style={{ color: "red" }}>Usuário é obrigatório</span>
            )}
          </div>

          <div>
            <label htmlFor="password">Senha:</label>
            <input
              type="password"
              id="password"
              {...register("password", { required: true })}
            />
            {errors.password && (
              <span style={{ color: "red" }}>Senha é obrigatória</span>
            )}
          </div>

          <button type="submit">Entrar</button>
        </form>
      </div>
    </section>
  );
};

export default LoginPage;
