import React from 'react';
import { Head } from '@inertiajs/react';
import DataTable from '../../Componentes/DataTable';
import { Breadcrumb } from 'react-bootstrap';
import { Link } from '@inertiajs/react';

const colunas = [
    {
        key: 'id',
        title: 'ID'
    },
    {
        key: 'nome',
        title: "Nome do Produto"
    },
    {
        key: 'quantidade',
        title: 'Quantidade'
    }
];

const crumbs = [
    { label: 'Home', link: '/' },
    { label: 'Produtos', link: '/produtos' },
    { label: 'Detalhes', link: '/produtos/detalhes' }
];

function Index({ estoques }) {

    return (
        <>
            <Head title="Estoque" />

            <Breadcrumb>
                {crumbs.map((crumb, index) => (
                    <Breadcrumb.Item
                        key={index}
                        active={index === crumbs.length - 1} >
                        {index !== crumbs.length - 1 ? (
                            <Link href={crumb.link}>
                                {crumb.label}
                            </Link>
                        ) : (
                            crumb.label
                        )}
                    </Breadcrumb.Item>
                ))}
            </Breadcrumb>

            <Link href={"/create-produto"} className="btn me-2">
                Cadastrar Produto
            </Link>

            <div className="flex flex-col w-full items-center justify-center">
                <div className="w-[80%]">
                    <DataTable 
                        colunas={colunas} 
                        data={estoques} 
                        title="Estoque Disponível" 
                        origem="estoque"
                    />
                </div>
            </div>
        </>
    );
}

export default Index;
