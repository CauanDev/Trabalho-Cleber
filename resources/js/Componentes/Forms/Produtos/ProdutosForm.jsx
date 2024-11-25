import React, { useState, forwardRef, useImperativeHandle, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';

const ProdutoForm = forwardRef(({ initialValues = null, title = "Adicionar Produto" }, ref) => {

    const [value,setValue] = useState({ nome: '', quantidade: '' });
    const handleChange = (field, newValue) => {
        setValue((prevValue) => ({
            ...prevValue,
            [field]: newValue,
        }));
    };
    const getValues = () => value;

    useImperativeHandle(ref, () => ({
        getValues,
    }));

    useEffect(() => {
        if(initialValues){
            setValue(initialValues.produto)
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
                        value={value.nome}
                        onChange={(e) => handleChange('nome', e.target.value)}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="produtoQuantidade">
                    <Form.Label>Quantidade</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="Digite a quantidade"
                        value={value.quantidade}
                        onChange={(e) => handleChange('quantidade', e.target.value)}
                    />
                </Form.Group>
            </Form>
        </div>
    );
});

export default ProdutoForm;
