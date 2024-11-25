import React, { useRef } from 'react';
import { Head } from '@inertiajs/react';
import { Button, Breadcrumb } from 'react-bootstrap';
import { router } from '@inertiajs/react'
import { Link } from '@inertiajs/react';
import PedidosForm from '../../Componentes/Forms/Pedidos/PedidosForm';
function Create({funcionarios,mesas,produtos}) {
    const menuFormRef = useRef();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const produtoData = menuFormRef.current.getValues();
        router.post('/store-pedido', produtoData);

    };

    const crumbs = [
        { label: 'Home', link: '/' },
        { label: 'Pedidos', link: '/pedidos' },
        { label: 'Adicionar Pedido' }
    ];

    return (
        <>
            <Head title="Adicionar Pedido" />

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

            <div className="flex flex-col w-full items-center justify-center p-4">

                <PedidosForm
                    ref={menuFormRef}
                    title="Adicionar Pedido"
                    onSubmit={handleSubmit}
                    funcionarios={funcionarios}
                    mesa={mesas}
                    estoque={produtos}
                />

                <Button variant="primary" onClick={handleSubmit} className="mt-3">
                    Criar Pedido
                </Button>
            </div>
        </>
    );
}

export default Create;
