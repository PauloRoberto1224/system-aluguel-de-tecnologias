import { NotePencil, Trash } from "@phosphor-icons/react";
import './styles.css';
import { useEffect, useState } from "react";
import { api } from "../api/app";
import { Modal } from "../components/Modal";
import { Form } from "../components/Form";
import { Cliente } from "../interfaces/Client";
import { FormEdit } from "../components/Editar/Form";
import { Header } from "../components/Header";

export const Home = () => {
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [clientes, setClientes] = useState<Cliente[]>([]);
    const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);
    const [clienteEdit, setClienteEdit] = useState<Cliente | null>(null); 

    useEffect(() => {
        const getDadosClientes = async () => {
            const response = await api.get('/clientes/');
            setClientes(response.data);
        };
        getDadosClientes();
    }, []);

    const deleteCliente = async (id: number) => {
        await api.delete(`/clientes/${id}/`);
        setClientes((prev) => prev.filter(cliente => cliente.id !== id));
    };

    const handleEditClick = (cliente: Cliente) => {
        setClienteEdit(cliente); 
        setOpenModalEdit(true);
    };

    return (
        <>
            <div className="container">
            <Header />
                <main>
                    <div className="scrollable-content">
                        <div className="tag-clientes">
                            <p>| Clientes</p>
                        </div>
                        
                        {clientes.map((c) => (
                            <div className="content-primary" key={c.id}>
                                <div className="info-content-cliente">
                                    <p>{c.nome}</p>
                                    <div className="info-cliente">
                                        <p>Contato: {c.contato}</p>
                                        <p>E-mail: {c.email}</p>
                                        <p>Número: {c.numero}</p>
                                    </div>
                                </div>
                                <div className="box-buttons">
                                    <button className="editar" onClick={() => handleEditClick(c)}>
                                        <NotePencil size={22} />
                                        Editar
                                    </button>
                                    <button className="excluir" onClick={() => deleteCliente(c.id)}>
                                        <Trash size={22} />
                                        Excluir
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <button className="register" onClick={() => setOpenModal(true)}>Cadastrar cliente</button>
                    <Modal 
                        isOpen={openModal} 
                        title="Cadastrar cliente" 
                        onClose={() => setOpenModal(false)} 
                        children={<Form />}
                    />
                    <Modal
                        isOpen={openModalEdit}
                        title="Editar cliente"
                        onClose={() => setOpenModalEdit(false)}
                        children={clienteEdit ? <FormEdit initialData={clienteEdit} /> : null} 
                    />
                </main>
            </div>
        </>
    );
};
