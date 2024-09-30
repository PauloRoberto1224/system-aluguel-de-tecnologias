import { NotePencil, Trash } from "@phosphor-icons/react";
import './styles.css'
import { useEffect, useState } from "react";
import { Modal } from "../components/Modal";
import { FormAluguel } from "../components/Form-Aluguel";
import { api } from "../api/app";
import { Rental } from "../interfaces/Aluguel";
import { FormAluguelEdit } from "../components/Editar/Form-Aluguel";

import { Header } from "../components/Header";

export const Aluguel = () => {
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);
    const [aluguel, setAluguel] = useState<Rental[]>([]);
    const [aluguelSelecionado, setAluguelSelecionado] = useState<Rental | null>(null);


    useEffect(() => {
        const getDadosAluguel = async () => {
            const response = await api.get('/alugueis/')
            setAluguel(response.data)
        }
        getDadosAluguel()
    }, []);

    const deleteAluguel = async (id:number) => {
        await api.delete(`/alugueis/${id}/`)
        setAluguel((prev) => prev.filter(aluguel => aluguel.id !== id));
        window.location.reload();

    }
    const handleEditClick = (aluguel: Rental) => {
        setAluguelSelecionado(aluguel);
        setOpenModalEdit(true);
    };

    return (
        <>
            <div className="container">
               <Header />
                <main>
                    <div className="scrollable-content">
                        <div className="tag-clientes">
                            <p>| Alugueis</p>
                        </div>
                        {
                            aluguel.map((a) => {
                                return (
                                    <div className="content-primary" key={a.id}>
                                        <div>
                                            <p>{a.produto}</p>
                                            <p>{a.cliente}</p>
                                            <div className="info-content">
                                                <p>Data início: {a.data_inicio}</p>
                                                <p>Data fim: {a.data_fim}</p>
                                                <p>Valor total: {a.valor_total}</p>
                                            </div>
                                        </div>
                                        <div className="box-buttons">
                                            <button className="editar"  onClick={() => handleEditClick(a)}>
                                                <NotePencil size={22} />
                                                Editar
                                            </button>
                                            <button className="excluir" onClick={() => deleteAluguel(a.id)}>
                                                <Trash size={22} />
                                                Excluir
                                            </button>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>

                    <button className="register" onClick={() => setOpenModal(true)}>Cadastrar aluguel</button>
                    <Modal
                        isOpen={openModal}
                        title="Cadastrar aluguel"
                        onClose={() => setOpenModal(false)}
                        children=<FormAluguel/>
                    />
                    <Modal
                        isOpen={openModalEdit}
                        title="Editar aluguel"
                        onClose={() => setOpenModalEdit(false)}
                        children={aluguelSelecionado ? <FormAluguelEdit aluguel={aluguelSelecionado} /> : null }
                    />
                </main>
            </div>
        </>
    )
}