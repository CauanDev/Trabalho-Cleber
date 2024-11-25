import React, { useState, forwardRef, useImperativeHandle, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import { Autocomplete } from '@mui/material';
import TextField from '@mui/material/TextField';

const MenuForm = forwardRef(({ initialValues = null, title = "Adicionar Produto", estoque }, ref) => {
    const [value, setValue] = useState({ nome: '', valor: '', ingredientes: [], id: null });

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
        if (initialValues) {
            setValue({
                nome: initialValues.nome_do_produto,
                valor: initialValues.preco,
                ingredientes: initialValues.ingredientes,
                id: initialValues.menu_id
            });
        }
    }, [initialValues]);

    const handleSelectProduct = (newValue) => {
        // Verifica se o produto já foi adicionado para evitar duplicatas
        const newProduct = newValue[newValue.length - 1]; // Pega o último produto selecionado

        // Adiciona o produto se ele não estiver já na lista
        if (!value.ingredientes.some(ingredient => ingredient.id === newProduct.id)) {
            setValue((prevValue) => ({
                ...prevValue,
                ingredientes: [
                    ...prevValue.ingredientes,
                    { nome: newProduct.nome ?? '', quantidade: 1 ?? '', id: newProduct.id ?? '' }
                ]
            }));
        }
    };

    // Função para remover um ingrediente
    const handleRemoveProduct = (id) => {
        setValue((prevValue) => ({
            ...prevValue,
            ingredientes: prevValue.ingredientes.filter(ingredient => ingredient.id !== id)
        }));
    };

    return (
        <div className="flex flex-col w-full items-center justify-center p-4">
            <h2 className="text-2xl font-bold mb-4">{title}</h2>
            <Form className="w-full max-w-md">

                <Form.Group className="mb-3" controlId="produtoValor">
                    <Form.Label>Valor do Produto</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="Valor"
                        value={value.valor}
                        onChange={(e) => handleChange('valor', e.target.value)}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="produtoNome">
                    <Form.Label>Nome do Produto</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Nome"
                        value={value.nome}
                        onChange={(e) => handleChange('nome', e.target.value)}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="produtoIngredientes">
                    <Form.Label>Ingredientes</Form.Label>
                    <Autocomplete
                        multiple
                        id="tags-standard"
                        options={estoque}
                        getOptionLabel={(option) => option.nome}
                        value={value.ingredientes}
                        onChange={(event, newValue) => handleSelectProduct(newValue)}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Selecione o produto"
                            />
                        )}
                    />
                </Form.Group>

                {value.ingredientes.map((ingredient, index) => (
                    <div key={ingredient.id} className="mb-3 flex items-center">
                        <div className="mr-4">{ingredient.nome}</div>
                        <Form.Control
                            type="number"
                            placeholder="Digite a quantidade"
                            value={ingredient.quantidade}
                            onChange={(e) => {
                                const updatedIngredients = [...value.ingredientes];
                                updatedIngredients[index].quantidade = e.target.value;
                                setValue((prevValue) => ({
                                    ...prevValue,
                                    ingredientes: updatedIngredients
                                }));
                            }}
                        />
                        <button
                            type="button"
                            onClick={() => handleRemoveProduct(ingredient.id)}
                            className="ml-2 text-red-500"
                        >
                            Remover
                        </button>
                    </div>
                ))}

            </Form>
        </div>
    );
});

export default MenuForm;
