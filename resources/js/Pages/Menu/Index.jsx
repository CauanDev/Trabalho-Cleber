import React, { useState, useEffect } from 'react';
import { Head } from '@inertiajs/react';
import DataTable from '../../Componentes/DataTable';
import { Breadcrumb, Button, Alert } from 'react-bootstrap';
import { Link } from '@inertiajs/react';
import FilterForm from '../../Componentes/Forms/Menu/FilterForm';

const colunas = [
    {
        key: 'id',
        title: 'ID'
    },
    {
        key: 'nome_do_produto',
        title: "Nome do Produto"
    },
    {
        key: 'preco',
        title: 'Valor'
    }
];

const crumbs = [
    { label: 'Home', link: '/' },
    { label: 'Menu' },
];

function Index({ menu, message }) {
    const [filters, setFilters] = useState({
        createdAtMin: '',
        createdAtMax: '',
        valorMin: '',
        valorMax: ''
    });

    const [filteredMenu, setFilteredMenu] = useState(menu);

    useEffect(() => {
        applyFilter();
    }, [menu, filters]);

    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
    };

    const applyFilter = () => {
        let filtered = [...menu];
        if (filters.createdAtMin) {
            filtered = filtered.filter(item => new Date(item.created_at) >= new Date(filters.createdAtMin));
        }

        if (filters.createdAtMax) {
            filtered = filtered.filter(item => new Date(item.created_at) <= new Date(filters.createdAtMax));
        }

        if (filters.stockMin) {
            filtered = filtered.filter(item => item.preco >= parseFloat(filters.stockMin));
        }

        if (filters.stockMax) {
            filtered = filtered.filter(item => item.preco <= parseFloat(filters.stockMax));
        }

        if (filters.name) {
            filtered = filtered.filter(item => item.nome_do_produto.toLowerCase().includes(filters.name.toLowerCase()));
        }

        setFilteredMenu(filtered);
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

            <Head title="Menu" />

            {message && (
                <Alert variant="success" className="mb-4" dismissible>
                    {message}
                </Alert>
            )}

            <FilterForm onFilterChange={handleFilterChange} />

            <div className="flex flex-col w-full items-center justify-center mt-2">
                <Link href="/criar-produto-cardapio">
                    <Button variant="success">Criar Produto no Cardápio</Button>
                </Link>
                <div className="w-[80%]">
                    <DataTable
                        colunas={colunas}
                        data={filteredMenu}
                        title="Cardápio"
                        origem="menu"
                    />
                </div>
            </div>
        </>
    );
}

export default Index;
