import React, { useState, useEffect } from 'react';
import { Head } from '@inertiajs/react';
import DataTable from '../../Componentes/DataTable';
import { Breadcrumb, Button, Alert } from 'react-bootstrap';
import { Link } from '@inertiajs/react';
import FilterForm from '../../Componentes/Forms/Produtos/FilterForm';

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
    { label: 'Produtos' },
];

function Index({ estoque, message }) {
    const [filters, setFilters] = useState({
        createdAtMin: '',
        createdAtMax: '',
        stockMin: '',
        stockMax: '',
        name: ''
    });

    const [filteredEstoque, setFilteredEstoque] = useState(estoque);
    const [showAlert, setShowAlert] = useState(!!message); // Gerencia a visibilidade do alerta

    useEffect(() => {
        applyFilter();
    }, [estoque, filters]);

    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
    };

    const applyFilter = () => {
        let filtered = [...estoque];

        if (filters.createdAtMin) {
            filtered = filtered.filter(item => new Date(item.created_at) >= new Date(filters.createdAtMin));
        }

        if (filters.createdAtMax) {
            filtered = filtered.filter(item => new Date(item.created_at) <= new Date(filters.createdAtMax));
        }

        if (filters.stockMin) {
            filtered = filtered.filter(item => item.quantidade >= filters.stockMin);
        }

        if (filters.stockMax) {
            filtered = filtered.filter(item => item.quantidade <= filters.stockMax);
        }

        if (filters.name) {
            filtered = filtered.filter(item => item.nome.toLowerCase().includes(filters.name.toLowerCase()));
        }

        setFilteredEstoque(filtered);
    };

    return (
        <>
            <Breadcrumb className="p-4">
                {crumbs.map((crumb, index) => (
                    <Breadcrumb.Item
                        key={index}
                        active={index === crumbs.length - 1}
                    >
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

            <Head title="Estoque" />

            {showAlert && (
                <Alert
                    variant="success"
                    className="mb-4"
                    onClose={() => setShowAlert(false)}
                    dismissible // Adiciona o botão de "close"
                >
                    {message}
                </Alert>
            )}

            <FilterForm onFilterChange={handleFilterChange} />

            <div className="flex flex-col w-full items-center justify-center mt-2">
                <Link href="/criar-produto">
                    <Button variant="success">Criar Produto</Button>
                </Link>
                <div className="w-[80%]">
                    <DataTable
                        colunas={colunas}
                        data={filteredEstoque}
                        title="Estoque Disponível"
                        origem="estoque"
                    />
                </div>
            </div>
        </>
    );
}

export default Index;
