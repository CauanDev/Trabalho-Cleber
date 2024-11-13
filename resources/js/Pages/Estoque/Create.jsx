import React, { useRef } from 'react';
import { Head } from '@inertiajs/react';
import { Button, Form } from 'react-bootstrap';
import ProdutoForm from '../../Componentes/Forms/ProdutosForm';

function Create() {
    const produtoFormRef = useRef();

    const handleSubmit = () => {
        const produtoData = produtoFormRef.current.getValues();
        console.log("Dados do Produto:", produtoData);
    };

    return (
        <>
            <Head title="Editar Estoque" />
            <div className="flex flex-col w-full items-center justify-center p-4">
                <Form onSubmit={handleSubmit} className="w-full max-w-md" title="Adicionar Produto no Estoque">
                    <div>
                        <ProdutoForm ref={produtoFormRef} />
                    </div>

                    <Button variant="primary" type="submit">
                        Salvar Alterações
                    </Button>
                </Form>
            </div>
        </>
    );
}

export default Create;
