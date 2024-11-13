import React from 'react';
import { Head } from '@inertiajs/react';
import DataTable from '../../Componentes/DataTable';

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

function Index({ estoques }) {

    return (
        <>
            <Head title="Estoque" />
            <div className="flex flex-col w-full flex items-center justify-center">
                <div className="w-[80%]">
                    <DataTable colunas={colunas} data={estoques} title={"Estoque Disponível"} origem={"estoque"} renderAcoes={(row) => (
                        <>
                            <button className="btn btn-info me-2" onClick={() => console.log(`Visualizar ${row.id}`)}>Visualizar</button>
                        </>
                    )}
                    />
                </div>
            </div>
        </>
    );
}

export default Index;
