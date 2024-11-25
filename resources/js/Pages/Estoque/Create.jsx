import React, { useRef } from 'react';
import { Head } from '@inertiajs/react';
import { Button, Breadcrumb } from 'react-bootstrap';
import ProdutoForm from '../../Componentes/Forms/Produtos/ProdutosForm';
import { router } from '@inertiajs/react'

import { Link } from '@inertiajs/react';

function Create() {
    const produtoFormRef = useRef();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const produtoData = produtoFormRef.current.getValues();
        router.post('/store-produto', produtoData);

    };

    const crumbs = [
        { label: 'Home', link: '/' },
        { label: 'Produtos', link: '/estoque' },
        { label: 'Adicionar Produto' }
    ];

    return (
        <>
            <Head title="Adicionar Produto" />

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

                <ProdutoForm
                    ref={produtoFormRef}
                    title="Adicionar Produto no Estoque"
                    onSubmit={handleSubmit}
                />

                <Button variant="primary" onClick={handleSubmit} className="mt-3">
                    Criar Produto
                </Button>
            </div>
        </>
    );
}

export default Create;
