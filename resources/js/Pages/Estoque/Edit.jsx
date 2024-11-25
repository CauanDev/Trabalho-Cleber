import React, { useRef } from 'react';
import { Head } from '@inertiajs/react';
import { Button } from 'react-bootstrap';
import ProdutoForm from '../../Componentes/Forms/Produtos/ProdutosForm';
import { router } from '@inertiajs/react'
import { Breadcrumb } from 'react-bootstrap';
import { Link } from '@inertiajs/react';

function Edit({ produto }) {
    const produtoFormRef = useRef();


    const handleSubmit = async () => {
        const produtoData = produtoFormRef.current.getValues();
        await router.put('/editar-produto', produtoData);
    };

    const crumbs = [
        { label: 'Home', link: '/' },
        { label: 'Produtos', link: '/estoque' },
        { label: 'Editar Produto' }
    ];

    return (
        <>
            <Head title="Editar Estoque" />

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
                    initialValues={{ produto }}
                    title="Editar Produto no Estoque"
                    onSubmit={handleSubmit}
                />

                <Button variant="primary" onClick={handleSubmit} className="mt-3">
                    Salvar Alterações
                </Button>
            </div>
        </>
    );
}

export default Edit;
