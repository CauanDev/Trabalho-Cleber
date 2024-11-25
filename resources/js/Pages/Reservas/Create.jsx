import React, { useRef } from 'react';
import { Head } from '@inertiajs/react';
import { Button, Breadcrumb } from 'react-bootstrap';
import { router } from '@inertiajs/react'
import { Link } from '@inertiajs/react';
import ReservasForm from '../../Componentes/Forms/Reservas/ReservasForm';
function Create(mesas) {
    const reservasFormRef = useRef();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const reservasData = reservasFormRef.current.getValues();
        router.post('/store-reserva', reservasData);

    };

    const crumbs = [
        { label: 'Home', link: '/' },
        { label: 'Reservas', link: '/reservas' },
        { label: 'Adicionar Reservas' }
    ];

    return (
        <>
            <Head title="Adicionar Reservas" />

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

                <ReservasForm
                    ref={reservasFormRef}
                    title="Adicionar Reservas"
                    onSubmit={handleSubmit}
                    mesas={mesas}
                />

                <Button variant="primary" onClick={handleSubmit} className="mt-3">
                    Criar Reserva
                </Button>
            </div>
        </>
    );
}

export default Create;
