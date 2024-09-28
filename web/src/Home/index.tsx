import { NotePencil, Trash } from "@phosphor-icons/react";
import './styles.css'
import { useEffect, useState } from "react";
import { api } from "../api/app";
import { Modal } from "../components/Modal";
import { Form } from "../components/Form";
import { Cliente } from "../interfaces/Client";
import { FormEdit } from "../components/Editar/Form";

export const Home = () => {
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [cliente, setCliente] = useState<Cliente[]>([]);
    const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);

    useEffect(() => {
        const getDadosClientes = async () => {
            const response = await api.get('/clientes/')
            setCliente(response.data)
        }
        getDadosClientes()
    }, [])

    const deleteCliente = async (id:number) => {
       await api.delete(`/clientes/${id}/`)
       window.location.reload();
    }
    
    return (
        <>
            <div className="container">
                <div className="logo">
                    <div>
                        <h2>System Alugueis</h2>
                    </div>
                    <div className="links-nav">
                        <a href="/aluguel">Alugueis</a>
                        <a href="/produtos">Produtos</a>
                        <a href="/">Clientes</a>
                    </div>
                </div>
                <main>
                    <div>
                        <div className="tag-clientes">
                            <h2>| Clientes</h2>
                        </div>
                        {
                            cliente.map((c) => {
                                return (
                                    <div className="content-primary" key={c.id}>
                                    <div className="info-content-cliente">
                                        <div>
                                            <p>{c.nome}</p>
                                        </div>
                                        <div className="info-cliente">
                                            <p>Contato: {c.contato}</p>
                                            <p> E-mail: {c.email}</p>
                                            <p>Número: {c.numero}</p>
                                        </div>
                                    </div>
                                    <div className="box-buttons">
                                        <button className="editar" onClick={() => setOpenModalEdit(true)}>
                                            <NotePencil size={22} />
                                            Editar
                                        </button>
                                        <button className="excluir" onClick={() => deleteCliente(c.id)}>
                                            <Trash size={22} />
                                            Excluir
                                        </button>
                                    </div>
                                </div>
                                )
                            })
                        }
                    </div>

                    <button className="register" onClick={() => setOpenModal(true)}>Cadastrar cliente</button>
                    <Modal 
                        isOpen={openModal} 
                        title="Cadastrar cliente" 
                        onClose={() => setOpenModal(false)} 
                        children=<Form/>
                    />
                    <Modal
                        isOpen={openModalEdit}
                        title="Editar cliente"
                        onClose={() => setOpenModalEdit(false)}
                        children=<FormEdit/>
                    />
                </main>
            </div>
        </>
    )
}