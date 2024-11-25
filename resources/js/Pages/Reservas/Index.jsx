import React, { useState, useEffect } from 'react';
import { Head } from '@inertiajs/react';
import DataTable from '../../Componentes/DataTable';
import { Breadcrumb, Button, Alert } from 'react-bootstrap';
import { Link } from '@inertiajs/react';
import FilterForm from '../../Componentes/Forms/Reservas/FilterForm';

const colunas = [
    {
        key: 'id',
        title: 'ID'
    },
    {
        key: "quantidade_pessoas",
        title: 'Quantidade de Pessoas',
    },
    {
        key: 'data_agendado',
        title: 'Data',
    }
];

const crumbs = [
    { label: 'Home', link: '/' },
    { label: 'Reservas' },
];

function Index({ reservas,mesas ,message }) {
    const [filters, setFilters] = useState({
        dataAgendamentoMin: '',  // Filtro para data mínima
        dataAgendamentoMax: '',  // Filtro para data máxima
        quantidadePessoasMin: '', // Filtro para quantidade mínima de pessoas
        quantidadePessoasMax: '', // Filtro para quantidade máxima de pessoas
        mesaId: ''               // Filtro para ID da mesa
    });

    const [filteredReservas, setFilteredReservas] = useState(reservas);
    const [showAlert, setShowAlert] = useState(!!message);

    useEffect(() => {
        applyFilter();
    }, [reservas, filters]); 

    const handleFilterChange = (newFilters) => {
        setFilters(prevFilters => ({
            ...prevFilters, 
            ...newFilters   
        }));
    };

    const applyFilter = () => {
        let filtered = [...reservas];
        if (filters.dataAgendamentoMin) {
            filtered = filtered.filter(item => new Date(item.data_agendado) >= new Date(filters.dataAgendamentoMin));
        }

        if (filters.dataAgendamentoMax) {
            filtered = filtered.filter(item => new Date(item.data_agendado) <= new Date(filters.dataAgendamentoMax));
        }

        if (filters.quantidadePessoasMin) {
            filtered = filtered.filter(item => item.quantidade_pessoas >= filters.quantidadePessoasMin);
        }

        if (filters.quantidadePessoasMax) {
            filtered = filtered.filter(item => item.quantidade_pessoas <= filters.quantidadePessoasMax);
        }

        if (filters.mesaId) {
            filtered = filtered.filter(item => item.mesa_id.toString().includes(filters.mesaId));
        }

        // Atualiza o estado com as reservas filtradas
        setFilteredReservas(filtered);
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

            <Head title="Reservas" />

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

            <FilterForm onFilterChange={handleFilterChange} mesas={mesas}/>

            <div className="flex flex-col w-full items-center justify-center mt-2">
                <Link href="/criar-reserva">
                    <Button variant="success">Criar Reserva</Button>
                </Link>

                <div className="w-[80%]">
                    <DataTable
                        colunas={colunas}
                        data={filteredReservas}
                        title="Reservas"
                        origem="reservas"
                    />
                </div>
            </div>
        </>
    );
}

export default Index;
