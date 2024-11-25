import React, { useState, useEffect } from 'react';
import { Head } from '@inertiajs/react';
import DataTable from '../../Componentes/DataTable';
import { Breadcrumb, Button, Alert } from 'react-bootstrap';
import { Link } from '@inertiajs/react';
import { router } from '@inertiajs/react';
import FilterForm from '../../Componentes/Forms/Pedidos/FilterForm';

const colunas = [
    { key: 'id', title: "Senha do Pedido" },
    { key: 'valor', title: "Valor" },
    { key: 'nome_funcionario', title: 'Nome do Funcionário' },
    { key: "quantidade_item", title: 'Quantidade de Item' },
    { key: 'status', title: "Status" },
    { key: 'mesa_id', title: "Número da Mesa" }
];

const crumbs = [
    { label: 'Home', link: '/' },
    { label: 'Pedidos' }
];

function Index({ pedidos, message, mesas, funcionarios }) {
    const [filters, setFilters] = useState({
        mesaId: '',
        funcionarioId: '',
        valorMin: '',
        valorMax: '',
        createdAtMin: '',
        createdAtMax: '',
        status: ''
    });

    const [filteredPedidos, setFilteredPedidos] = useState(pedidos);
    const [showAlert, setShowAlert] = useState(!!message);

    useEffect(() => {
        applyFilter();
    }, [pedidos, filters]);

    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
    };

    const applyFilter = () => {
        let filtered = [...pedidos];

        // Filtro de Mesa
        if (filters.mesaId) {
            filtered = filtered.filter(item => item.mesa_id === parseInt(filters.mesaId));
        }

        // Filtro de Funcionário
        if (filters.funcionarioId) {
            filtered = filtered.filter(item => item.funcionario_id === parseInt(filters.funcionarioId));
        }

        // Filtro de Valor Mínimo
        if (filters.valorMin) {
            filtered = filtered.filter(item => item.valor >= parseFloat(filters.valorMin));
        }

        // Filtro de Valor Máximo
        if (filters.valorMax) {
            filtered = filtered.filter(item => item.valor <= parseFloat(filters.valorMax));
        }

        // Filtro de Data Mínima
        if (filters.createdAtMin) {
            filtered = filtered.filter(item => new Date(item.created_at) >= new Date(filters.createdAtMin));
        }

        // Filtro de Data Máxima
        if (filters.createdAtMax) {
            filtered = filtered.filter(item => new Date(item.created_at) <= new Date(filters.createdAtMax));
        }

        // Filtro de Status
        if (filters.status) {
            filtered = filtered.filter(item => item.status === filters.status);
        }

        setFilteredPedidos(filtered);
    };

    // Função que será passada para renderAcoes
    const renderAcoes = (row) => {
        const alterarStatus = async (id) => {
            try {
                router.post('/alterar-status/' + id);
            } catch (error) {
                console.log(error);
            }
        };

        return (
            <Button
                onClick={() => alterarStatus(row.id)}
                className="btn btn-info"
            >
                {row.status === 'Aberto' ? 'Fechar' : 'Abrir'}
            </Button>
        );
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

            <Head title="Pedidos" />

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

            <div className="flex flex-col w-full items-center justify-center mt-2">
                <Link href="/criar-pedido">
                    <Button variant="success">Criar Pedido</Button>
                </Link>
                <FilterForm
                    onFilterChange={handleFilterChange}
                    mesas={mesas}
                    funcionarios={funcionarios}
                />
                <div className="w-[80%]">
                    <DataTable
                        colunas={colunas}
                        data={filteredPedidos}
                        title="Pedidos"
                        origem="pedidos"
                        renderAcoes={renderAcoes}
                    />
                </div>
            </div>
        </>
    );
}

export default Index;
