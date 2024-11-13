import React, { useRef } from 'react';
import { Head } from '@inertiajs/react';
import { Button, Form } from 'react-bootstrap';
import ProdutoForm from '../../Componentes/Forms/ProdutosForm';

function Edit({ produto }) {
    const produtoFormRef = useRef();

    const handleSubmit = () => {
        const produtoData = produtoFormRef.current.getValues();
        console.log("Dados do Produto:", produtoData);
    };

    return (
        <>
            <Head title="Editar Estoque" />
            <div className="flex flex-col w-full items-center justify-center p-4">
                <ProdutoForm
                    ref={produtoFormRef}
                    initialValues={{produto}}
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
