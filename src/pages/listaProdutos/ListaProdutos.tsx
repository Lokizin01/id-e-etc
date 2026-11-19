import './ListaProdutos.css'
import imgProduto from '../../assets/img/produtos/le_grand_chocolat.png'

import Card from '../../components/card/Card';
import { useEffect, useState } from 'react';
import type { Produto } from '../../types/Produto';
import produtoServ from '../../services/produtoService';
import { useSearchParams } from 'react-router-dom';

function ListaProdutos() {
    const [produtos, setProdutos] = useState<Produto[]>([]);
    const [erro, setErro] = useState('')
    const [carregando, setCarregando] = useState(true)
    const [parametros] = useSearchParams()
    const busca = (parametros.get('q') ?? '').toLocaleLowerCase('pt-br')
    const categoria = Number(parametros.get ('categoria')) 



    useEffect(() => {
        Promise.call
        produtoServ.listar()
            .then(lista => { setProdutos(lista), console.log(lista) })
            .catch(() => setErro('não foi lol'))
            .finally(() => setCarregando(false))
    }, [])

    const visiveis = produtos.filter(produto =>
        produto.ativo &&
         (categoria || produto.categoriaIds.includes(categoria)) &&
          (busca || `${produto.nome} ${produto.descricaoCurta}`.toLocaleLowerCase('pt-br'). includes(busca))

    )

    return (
        <>
            <main>
                <section className="prod_banner" />
                <section className="container prod_container">
                    <div className="box_h2">
                        <h1>Nossos Bolos</h1>
                        <span>Nos Gâteaux</span>
                        <hr />
                    </div>
                    {carregando && <p>carregando produtos...</p>}
                    {!carregando && !erro && produtos.length === 0 && <p>nenhum produto encontrado.</p>}
                    <div className="prod_cards">
                        {visiveis.map(produto => {
                            return <Card   
                            id={produto.id}
                                key={produto.id}
                                imgProduto={`http://localhost:3000${produto.imagem}`}
                                nome={produto.nome}
                                descricao={produto.descricaoCurta}
                                valor={produto.precoPorKg}
                                quantidadeAvaliacoes={10}
                                nota={9.5}
                            />
                        })}
                    </div>
                </section>
            </main>
        </>

    )
}

export default ListaProdutos;