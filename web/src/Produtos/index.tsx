import { NotePencil, Trash } from "@phosphor-icons/react";
import './styles.css'
import { Modal } from "../components/Modal";
import { FormProduto } from "../components/FormProduto";
import { useEffect, useState } from "react";
import { api } from "../api/app";
import { Product } from "../interfaces/Produto";
import { FormProdutoEdit } from "../components/Editar/FormProduto";

export const Produtos = () => {
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [produto, setProduto] = useState<Product[]>([]);
    const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);

    useEffect(() => {
        const getDadosProdutos = async () => {
            const response = await api.get('/produtos/')
            setProduto(response.data)
        }
        getDadosProdutos()
    }, []);

    const deleteProduto = async (id:number) => {
        await api.delete(`/produtos/${id}/`)
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
                        <h2>| Produtos</h2>
                    </div>
                    {
                        produto.map((p) => {
                            return (
                                <div className="content-primary" key={p.id}>
                                <div>
                                    <div className="info-content-aluguel">
                                        <div className="box-text">
                                            <p>Nome:</p>
                                            <p>{p.nome}</p>
                                        </div>
                                        <p>Descrição: {p.descricao}</p>
                                    </div>
                                    {
                                        p.disponibilidade ?  <p className="online">Disponível</p> : <p className="off">Indisponível</p>
                                    } 
                                   
                                </div>
                                <div className="box-buttons">
                                    <button className="editar" onClick={() => setOpenModalEdit(true)}>
                                        <NotePencil size={22} />
                                        Editar
                                    </button>
                                    <button className="excluir" onClick={() => deleteProduto(p.id)}>
                                        <Trash size={22} />
                                        Excluir
                                    </button>
                                </div>
                            </div>
        
                            )
                        })
                    }
                </div>

                <button className="register" onClick={() => setOpenModal(true)}>Cadastrar produto</button>
                <Modal 
                    isOpen={openModal} 
                    title="Cadastrar produto" 
                    onClose={() => setOpenModal(false)} 
                    children=<FormProduto/>
                />
                 <Modal
                        isOpen={openModalEdit}
                        title="Editar produto"
                        onClose={() => setOpenModalEdit(false)}
                        children=<FormProdutoEdit/>
                    />
            </main>
        </div>
    </>
    )
}