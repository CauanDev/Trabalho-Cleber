import React, { useEffect, useRef } from 'react';
import { Head } from '@inertiajs/react';
import { Button, Breadcrumb } from 'react-bootstrap';
import MenuForm from '../../Componentes/Forms/Menu/MenuForm';
import { router } from '@inertiajs/react'

import { Link } from '@inertiajs/react';

function Create({ menu, estoque }) {
    const menuFormRef = useRef();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const produtoData = menuFormRef.current.getValues();
        router.put('/editar-menu', produtoData);

    };

    const crumbs = [
        { label: 'Home', link: '/' },
        { label: 'Cardápio', link: '/menu' },
        { label: 'Adicionar Produto no Cardápio' }
    ];

    return (
        <>
            <Head title="Editar Produto" />

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

                <MenuForm
                    ref={menuFormRef}
                    title="Adicionar Produto no Cardápio"
                    onSubmit={handleSubmit}
                    estoque={estoque}
                    initialValues={menu}
                />

                <Button variant="primary" onClick={handleSubmit} className="mt-3">
                    Atualizar Produto
                </Button>
            </div>
        </>
    );
}

export default Create;
