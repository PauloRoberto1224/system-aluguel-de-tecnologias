import { NotePencil, Trash } from "@phosphor-icons/react";
import './styles.css'
import { Modal } from "../components/Modal";
import { FormProduto } from "../components/FormProduto";
import { useEffect, useState } from "react";
import { api } from "../api/app";
import { Product } from "../interfaces/Produto";
import { FormProdutoEdit } from "../components/Editar/FormProduto";
import { Header } from "../components/Header";

export const Produtos = () => {
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [produto, setProduto] = useState<Product[]>([]);
    const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);
    const [productEdit, setProductEdit] = useState<Product | null>(null); 

    useEffect(() => {
        const getDadosProdutos = async () => {
            const response = await api.get('/produtos/')
            setProduto(response.data)
        }
        getDadosProdutos()
    }, []);

    const deleteProduto = async (id:number) => {
        await api.delete(`/produtos/${id}/`)
        setProduto((prev) => prev.filter(produto => produto.id !== id));
        window.location.reload();
    }

    const handleEditClick = (produto: Product) => {
        setProductEdit(produto); 
        setOpenModalEdit(true);
    };

    return (
        <>
        <div className="container">
           <Header />
            <main>
            <div className="scrollable-content">
          <div className="tag-clientes">
            <p>| Produtos</p>
          </div>
          {produto.map((p) => (
            <div className="content-primary" key={p.id}>
              <div>
                <div className="info-content-aluguel">
                  <div className="box-text">
                    <p>Nome:</p>
                    <p>{p.nome}</p>
                  </div>
                  <p>Descrição: {p.descricao}</p>
                </div>
                {p.disponibilidade ? (
                  <p className="online">Disponível</p>
                ) : (
                  <p className="off">Indisponível</p>
                )}
              </div>
              <div className="box-buttons">
                <button className="editar" onClick={() => handleEditClick(p)}>
                  <NotePencil size={22} />
                  Editar
                </button>
                <button className="excluir" onClick={() => deleteProduto(p.id)}>
                  <Trash size={22} />
                  Excluir
                </button>
              </div>
            </div>
          ))}
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
                        children={productEdit ? <FormProdutoEdit initialProduct={productEdit} /> : null} 
                    />
            </main>
        </div>
    </>
    )
}