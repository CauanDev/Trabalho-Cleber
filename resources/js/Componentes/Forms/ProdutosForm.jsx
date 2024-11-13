import React, { useState, forwardRef, useImperativeHandle, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';

const ProdutoForm = forwardRef(({ initialValues = {}, title = "Adicionar Produto" }, ref) => {
    // Usando valores iniciais para `nome` e `quantidade` se forem fornecidos
    const [nome, setNome] = useState(initialValues.nome || '');
    const [quantidade, setQuantidade] = useState(initialValues.quantidade || '');

    const getValues = () => ({ nome, quantidade });

    // Expondo a função `getValues` para ser chamada externamente
    useImperativeHandle(ref, () => ({
        getValues,
    }));

    useEffect(() => {
        if(initialValues){
            setNome(initialValues.produto.nome);
            setQuantidade(initialValues.produto.quantidade);
        }

    }, [initialValues]);

    return (
        <div className="flex flex-col w-full items-center justify-center p-4">
            <h2 className="text-2xl font-bold mb-4">{title}</h2>
            <Form className="w-full max-w-md">
                <Form.Group className="mb-3" controlId="produtoNome">
                    <Form.Label>Nome do Produto</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Digite o nome do produto"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="produtoQuantidade">
                    <Form.Label>Quantidade</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="Digite a quantidade"
                        value={quantidade}
                        onChange={(e) => setQuantidade(e.target.value)}
                    />
                </Form.Group>
            </Form>
        </div>
    );
});

export default ProdutoForm;
