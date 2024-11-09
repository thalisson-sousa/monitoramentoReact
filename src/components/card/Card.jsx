import { useEffect, useState } from "react";
import styles from "./Card.module.css";
import { useNavigate } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

export default function Card({ data, icon, nav }) {
  const notify = (text) => toast(text);
  const [status, setStatus] = useState(false);
  const navigate = useNavigate();
  const serverUrl = "http://localhost:3001";
  const url = "http://localhost:3000";

  useEffect(() => {
    const intervalId = setInterval(() => check(data.ip), 30000);

    check(data.ip);

    return () => clearInterval(intervalId);
  }, [data.ip]);

  async function check(ip) {
    const isOnline = await checkIP(ip);
    setStatus(isOnline);
  }

  async function checkIP(ip) {
    try {
      const response = await fetch(`${serverUrl}/ping/${ip}`);
      const result = await response.json();
      return result.status === "online";
    } catch (error) {
      console.error("Erro ao verificar IP:", error);
      return false;
    }
  }

  function handleNavigate() {
    if(nav) {
      navigate("/details", { state: data });
    }
  }

  function deleteCard(id) {
    axios.delete(`${url}/links/${id}`)
      .then(() => {
        notify("Deletado com sucesso!");
        setInterval(() => window.location.reload(true), 2000)
      }).catch((error) => {
        notify("Erro ao deletar!", error);
      });
  }

  return (
    <div
      key={data.id}
      style={
        status ? { backgroundColor: "#d4edda" } : { backgroundColor: "#f8d7da" }
      }
      className={styles.ipContainer}
    >
      {icon ? (
        <article>
          <FaTrash onClick={() => deleteCard(data.id)} />
        </article>
      ) : (
        ""
      )}

      <ToastContainer />

      <div>{data.name}</div>
      <div>-</div>
      <div>IP {data.ip}</div>
      <span
        style={
          status
            ? { backgroundColor: "#28a745" }
            : { backgroundColor: "#dc3545" }
        }
        onClick={handleNavigate}
        className={styles.status}
      >
        {status ? "Online" : "Offline"}
      </span>
    </div>
  );
}
