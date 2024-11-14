import Modal from "../../components/modal/Modal";
import { useLinks } from "../../context/LinksContext";
import { useEffect, useState } from "react";
import "./styles.css";
import { useForm } from "react-hook-form";
import axios from "axios";
import { FaTimes } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';

export default function UserPage() {
  const { links } = useLinks();
  const [isRegisterModalOpen, setRegisterModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const { setLink } = useLinks();
  const notify = (text) => toast(text);
  const url = "http://localhost:3000/user";

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    getData();
  }, [links]);

  function getData() {
    axios.get(url).then(function (response) {
      setLink(response.data);
    });
  }

  function updateRegisterModal() {
    setEditData(null);
    reset();
    setRegisterModalOpen(!isRegisterModalOpen);
  }

  function updateEditModal(e) {
    const id = e.target.value;
    if (id !== undefined) {
      axios.get(`${url}/${id}`).then(function (response) {
        setEditData(response.data);
        reset(response.data);
      });
    }
    setEditModalOpen(true);
  }

  function closeEditModal() {
    setEditModalOpen(false);
    setEditData(null);
  }

  function deleteItem(e) {
    axios.delete(`${url}/${e.target.value}`).then(() => {
      notify("Deletado com sucesso!");
      getData();
    })
    .catch((error) => {
      notify("Erro ao deletar!", error);
    });
    getData();
  }

  const onSubmit = (data) => {
    axios
      .post(url, data)
      .then(() => {
        notify("Cadastrado com sucesso!");
      })
      .catch((error) => {
        notify("Erro ao cadastrado!", error);
      });
  };

  const onEditSubmit = (data) => {
    axios
      .put(`${url}/${editData.id}`, data)
      .then(() => {
        getData();
        setEditModalOpen(false);
        setEditData(null);
        notify("Atualizado com sucesso!");
      })
      .catch((error) => {
        notify("Erro ao atualizado!", error);
      });
  };

  return (
    <section>
      <h2>Página de Usuarios</h2>
      <ToastContainer />
      <div className="btn">
        <button className="btnCad" onClick={updateRegisterModal}>
          {isRegisterModalOpen ? "Fechar" : "Cadastrar"}
        </button>
      </div>
      <div className="tabelaContainer">
        <table>
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">User</th>
              <th scope="col">Password</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>

          <Modal modal={isRegisterModalOpen}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <label htmlFor="username">Username:</label>
              <input
                className="modalInput"
                type="text"
                name="username"
                id="username"
                {...register("username", { required: true })}
              />
              {errors.username && (
                <span style={{ color: "red" }}>Esse campo é obrigatório</span>
              )}

              <label htmlFor="password">Password:</label>
              <input
                className="modalInput"
                type="text"
                name="password"
                id="password"
                {...register("password", { required: true })}
              />
              {errors.password && (
                <span style={{ color: "red" }}>Esse campo é obrigatório</span>
              )}

              <input type="submit" value="Cadastrar" className="btnCad" />
            </form>
          </Modal>

          <Modal modal={isEditModalOpen}>
            <div className="modalIcon">
              <FaTimes onClick={closeEditModal} />
            </div>
            <form onSubmit={handleSubmit(onEditSubmit)}>
              <label htmlFor="username">Username:</label>
              <input
                className="modalInput"
                type="text"
                name="username"
                id="username"
                defaultValue={editData ? editData.username : ""}
                {...register("username", { required: true })}
              />
              {errors.username && (
                <span style={{ color: "red" }}>Esse campo é obrigatório</span>
              )}

              <label htmlFor="password">Password:</label>
              <input
                className="modalInput"
                type="text"
                name="password"
                id="password"
                defaultValue={editData ? editData.password : ""}
                {...register("password", { required: true })}
              />
              {errors.password && (
                <span style={{ color: "red" }}>Esse campo é obrigatório</span>
              )}

              <input type="submit" value="Editar" className="btnCad" />
            </form>
          </Modal>

          <tbody>
            {links.map((link) => (
              <tr key={link.id}>
                <th scope="row">{link.id}</th>
                <td>{link.username}</td>
                <td>{link.password}</td>
                <td className="actions">
                  <button
                    className="editar"
                    value={link.id}
                    onClick={updateEditModal}
                  >
                    Editar
                  </button>
                  <button
                    className="deletar"
                    value={link.id}
                    onClick={deleteItem}
                  >
                    Deletar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <p>Count: {links.length}</p>
      </div>
    </section>
  );
}
