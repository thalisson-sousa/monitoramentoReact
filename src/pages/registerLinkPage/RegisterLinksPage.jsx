import Modal from "../../components/modal/Modal";
import { useLinks } from "../../context/LinksContext";
import { useEffect, useState } from "react";
import "./styles.css";
import { useForm } from "react-hook-form";
import { FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

export default function RegisterPage() {
  const notify = (text) => toast(text);
  const { links } = useLinks();
  const [isOpen, setModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const { setLink } = useLinks();
  const navigate = useNavigate();
  const url = "http://localhost:3000/links";

  useEffect(() => {
    getData();
  }, [links]);

  function getData() {
    axios.get(url).then(function (response) {
      setLink(response.data);
    });
  }

  function updateModal() {
    setModalOpen(!isOpen);
    if (isOpen) {
      setEditData(null);
    }
  }

  function closeEditModal() {
    setEditModalOpen(false);
    setEditData(null);
  }

  function updateEditModal(e) {
    const id = e.target.value;
    axios.get(`${url}/${id}`).then(function (response) {
      setEditData(response.data);
      reset(response.data);
      setEditModalOpen(true);
    });
  }

  function deleteItem(e) {
    axios
      .delete(`${url}/${e.target.value}`)
      .then(() => {
        notify("Deletado com sucesso!");
        getData();
      })
      .catch((error) => {
        notify("Erro ao deletar!", error);
      });
  }

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

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
      <h2>Página de Cadastro Links</h2>
      <ToastContainer />
      <div>
        <table>
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Name</th>
              <th scope="col">IP</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>

          {/* Modal de edição */}
          <Modal modal={isEditModalOpen}>
            <div className="modalIcon">
              <FaTimes onClick={closeEditModal} />
            </div>
            <form onSubmit={handleSubmit(onEditSubmit)}>
              <label htmlFor="name">NOME:</label>
              <input
                className="modalInput"
                type="text"
                name="name"
                id="name"
                defaultValue={editData ? editData.name : ""}
                {...register("name", { required: true })}
              />
              {errors.name && (
                <span style={{ color: "red" }}>Esse campo é obrigatório</span>
              )}

              <label htmlFor="ip">IP:</label>
              <input
                className="modalInput"
                type="text"
                name="ip"
                id="ip"
                defaultValue={editData ? editData.ip : ""}
                {...register("ip", { required: true })}
              />
              {errors.ip && (
                <span style={{ color: "red" }}>Esse campo é obrigatório</span>
              )}

              <input type="submit" value="Editar" className="btnCad" />
            </form>
          </Modal>

          <tbody>
            {links.map((link) => (
              <tr key={link.id}>
                <th scope="row">{link.id}</th>
                <td>{link.name}</td>
                <td>{link.ip}</td>
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
