import React, { useRef } from 'react';
import { Head } from '@inertiajs/react';
import { Button, Breadcrumb } from 'react-bootstrap';
import { router } from '@inertiajs/react'
import { Link } from '@inertiajs/react';
import MesaForm from '../../Componentes/Forms/Mesas/MesaForm';

function Create() {
    const menuFormRef = useRef();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const produtoData = menuFormRef.current.getValues();
        router.post('/store-mesa', produtoData);

    };

    const crumbs = [
        { label: 'Home', link: '/' },
        { label: 'Mesas', link: '/mesas' },
        { label: 'Adicionar Mesa' }
    ];

    return (
        <>
            <Head title="Adicionar Mesa" />

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

                <MesaForm
                    ref={menuFormRef}
                    title="Adicionar Mesa"
                    onSubmit={handleSubmit}
                />

                <Button variant="primary" onClick={handleSubmit} className="mt-3">
                    Criar Mesa
                </Button>
            </div>
        </>
    );
}

export default Create;
