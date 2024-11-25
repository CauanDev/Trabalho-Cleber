import React, { useRef } from 'react';
import { Head } from '@inertiajs/react';
import { Button, Breadcrumb } from 'react-bootstrap';
import { router } from '@inertiajs/react'
import { Link } from '@inertiajs/react';
import ReservasForm from '../../Componentes/Forms/Reservas/ReservasForm';
function Edit({reserva , mesas}) {
    const menuFormRef = useRef();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const produtoData = menuFormRef.current.getValues();
        router.put('/editar-reserva', produtoData);

    };

    const crumbs = [
        { label: 'Home', link: '/' },
        { label: 'Reservas', link: '/reservas' },
        { label: 'Atualizar Reserva' }
    ];

    return (
        <>
            <Head title="Atualizar Reserva" />

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
                    ref={menuFormRef}
                    title="Atualizar Reserva"
                    onSubmit={handleSubmit}
                    initialValues={reserva}
                    mesas={mesas}
                />

                <Button variant="primary" onClick={handleSubmit} className="mt-3">
                    Atualizar Reserva
                </Button>
            </div>
        </>
    );
}

export default Edit;