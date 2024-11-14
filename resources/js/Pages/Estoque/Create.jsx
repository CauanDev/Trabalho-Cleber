import React, { useRef } from 'react';
import { Head } from '@inertiajs/react';
import { Button, Form } from 'react-bootstrap';
import ProdutoForm from '../../Componentes/Forms/ProdutosForm';

function Create() {
    const produtoFormRef = useRef();

    const handleSubmit = async () => {
        const produtoData = produtoFormRef.current.getValues();
        try {
            await window.http.post('/update-produto',produtoData);
        } 
        catch (error) {
            console.log(error)
        }
    };

    return (
        <>
            <Head title="Editar Estoque" />
            <div className="flex flex-col w-full items-center justify-center p-4">
                <Form onSubmit={handleSubmit} className="w-full max-w-md" title="Adicionar Produto no Estoque">
                    <ProdutoForm ref={produtoFormRef} />

                    <Button variant="primary" type="submit">
                        Cadastrar Produto
                    </Button>
                </Form>
            </div>
        </>
    );
}

export default Create;
