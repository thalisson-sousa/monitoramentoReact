import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Navigate } from 'react-router-dom';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';

import Card from "../../components/Card/Card";
import styles from "./linkDetails.module.css";
import Modal from "../../components/modal/Modal";

export default function LinkDetails() {
  const [data, setData] = useState([]);
  const location = useLocation();
  const { state } = location;
  const [isOpen, setModalOpen] = useState(false);
  const notify = (text) => toast(text);

  const url = `http://localhost:3000/links?firewallId=${state.id}`;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    await axios.get(url).then((item) => {
      setData(item.data);
    });
  }

  function updateModal() {
    setModalOpen(!isOpen);
  }

  const onSubmit = (data) => {
    data.firewallId = state.id;

    axios.post(url, data).then(() => {
        notify("Cadastrado com sucesso!");
        setModalOpen(!isOpen);
        setTimeout( () => window.location.reload(true), 2000);
    }).catch((error) => {
        notify("Erro ao cadastrar!", error);
    })
  }

  return (
    <section className={styles.container}>
      <h1>MONITOR: {state.name}</h1>
      <ToastContainer />

      <div className={styles.buttons}>
        <Link className={styles.backButton} to="/">Voltar</Link>

        <div>
          <button className="btnCad" onClick={updateModal}>
            {isOpen ? "Fechar" : "Cadastrar"}
          </button>
        </div>
      </div>

      <Modal modal={isOpen}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <label htmlFor="name">NOME:</label>
              <input
                className={styles.modalInput}
                type="text"
                name="name"
                id="name"
                {...register("name", { required: true })}
              />
              {errors.name && (
                <span style={{ color: "red" }}>Esse campo é obrigatório</span>
              )}

              <label htmlFor="ip">IP:</label>
              <input
                className={styles.modalInput}
                type="text"
                name="ip"
                id="ip"
                {...register("ip", { required: true })}
              />
              {errors.ip && (
                <span style={{ color: "red" }}>Esse campo é obrigatório</span>
              )}

              <input type="submit" value="Cadastrar" className="btnCad" />
            </form>
          </Modal>

      <div className={styles.cards}>
        <Card key={state.id} data={state} icon={true} />
        {data.map((item) => (
          <Card key={item.id} data={item} icon={true} />
        ))}
      </div>

    </section>
  );
}
