import React, { useState, useEffect } from 'react';
import { Head } from '@inertiajs/react';
import DataTable from '../../Componentes/DataTable';
import { Breadcrumb, Button, Alert } from 'react-bootstrap';
import { Link } from '@inertiajs/react';
import FilterForm from '../../Componentes/Forms/Funcionarios/FilterForm';

const colunas = [
    {
        key: 'nome',
        title: 'Nome'
    },
    {
        key: 'salario',
        title: 'Salário'
    },
    {
        key: 'sexo',
        title: 'Sexo'
    }
];

const crumbs = [
    { label: 'Home', link: '/' },
    { label: 'Funcionários' }, 
];

function Index({ funcionarios, message }) {
    const [filters, setFilters] = useState({
        createdAtMin: '',
        createdAtMax: '',
        salarioMin: '',
        salarioMax: '',
        nome: '',
        sexo: ''  // Adicionando o filtro de sexo
    });

    const [filteredFuncionarios, setFilteredFuncionarios] = useState(funcionarios);

    useEffect(() => {
        applyFilter();
    }, [funcionarios, filters]);

    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
    };

    const applyFilter = () => {
        let filtered = [...funcionarios];
        
        if (filters.createdAtMin) {
            filtered = filtered.filter(item => new Date(item.created_at) >= new Date(filters.createdAtMin));
        }

        if (filters.createdAtMax) {
            filtered = filtered.filter(item => new Date(item.created_at) <= new Date(filters.createdAtMax));
        }

        if (filters.salarioMin) {
            filtered = filtered.filter(item => item.salario >= parseFloat(filters.salarioMin));
        }

        if (filters.salarioMax) {
            filtered = filtered.filter(item => item.salario <= parseFloat(filters.salarioMax));
        }

        if (filters.nome) {
            filtered = filtered.filter(item => item.nome.toLowerCase().includes(filters.nome.toLowerCase()));
        }

        if (filters.sexo) {  // Filtrando por sexo
            filtered = filtered.filter(item => item.sexo === filters.sexo);
        }

        setFilteredFuncionarios(filtered);
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

            <Head title="Funcionários" />

            {message && (
                <Alert variant="success" className="mb-4" dismissible>
                    {message}
                </Alert>
            )}

            <FilterForm onFilterChange={handleFilterChange} />

            <div className="flex flex-col w-full items-center justify-center mt-2">
                <Link href="/criar-funcionario">
                    <Button variant="success">Criar Funcionário</Button>
                </Link>
                <div className="w-[80%]">
                    <DataTable
                        colunas={colunas}
                        data={filteredFuncionarios}
                        title="Lista de Funcionários"
                        origem="funcionarios"
                    />
                </div>
            </div>
        </>
    );
}

export default Index;
