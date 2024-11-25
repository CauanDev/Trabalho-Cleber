import React, { useState, useEffect } from 'react';
import { Head } from '@inertiajs/react';
import DataTable from '../../Componentes/DataTable';
import { Breadcrumb, Button, Alert } from 'react-bootstrap';
import { Link } from '@inertiajs/react';
import FilterForm from '../../Componentes/Forms/Mesas/FilterForm';

const colunas = [
    {
        key: 'id',
        title: "Número da Mesa"
    },
    {
        key: 'status',
        title: 'Status'
    },
    {
        key: "agendado",
        title: 'Agendado',
    },
];

const crumbs = [
    { label: 'Home', link: '/' },
    { label: 'Mesas' },
];

function Index({ mesas, message }) {
    const [filters, setFilters] = useState({
        dataMin: '',
        dataMax: '',
        agendado: '',
        status: ''
    });

    const [filteredMesas, setFilteredMesas] = useState(mesas);
    const [showAlert, setShowAlert] = useState(!!message);

    useEffect(() => {
        applyFilter();
    }, [mesas, filters]);

    const handleFilterChange = (newFilters) => {
        if (newFilters.agendado === 'true') {
            newFilters.agendado = true;
        } else if (newFilters.agendado === 'false') {
            newFilters.agendado = false;
        }
        setFilters(newFilters);
    };

    const applyFilter = () => {
        let filtered = [...mesas];

        if (filters.dataMin) {
            filtered = filtered.filter(item => new Date(item.data_agendado) >= new Date(filters.dataMin));
        }

        if (filters.dataMax) {
            filtered = filtered.filter(item => new Date(item.data_agendado) <= new Date(filters.dataMax));
        }

        if (filters.status) {
            filtered = filtered.filter(item => item.status === filters.status);
        }

        if (filters.agendado !== '') {
            filtered = filtered.filter(item => item.agendado === filters.agendado);
        }

        setFilteredMesas(filtered);
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

            <Head title="Mesas" />

            {showAlert && (
                <Alert
                    variant="success"
                    className="mb-4"
                    onClose={() => setShowAlert(false)}
                    dismissible
                >
                    {message}
                </Alert>
            )}

            <FilterForm onFilterChange={handleFilterChange} />

            <div className="flex flex-col w-full items-center justify-center mt-2">
                <Link href="/criar-mesa">
                    <Button variant="success">Criar Mesa</Button>
                </Link>

                <div className="w-[80%]">
                    <DataTable
                        colunas={colunas}
                        data={filteredMesas}
                        title="Mesas"
                        origem="mesas"
                    />
                </div>
            </div>
        </>
    );
}

export default Index;
