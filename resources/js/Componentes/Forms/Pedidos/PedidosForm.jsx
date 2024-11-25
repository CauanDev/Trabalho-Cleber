import React, { useState, forwardRef, useImperativeHandle, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import { Autocomplete } from '@mui/material';
import TextField from '@mui/material/TextField';

const PedidosForm = forwardRef(({ initialValues = null, title = "Adicionar Pedido", estoque = [], funcionarios, mesa, produtosRelacionados }, ref) => {
    const [value, setValue] = useState({
        valor: 0,
        produtos: [],
        id: null,
        funcionarioId: '',
        mesaId: ''
    });

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
                valor: initialValues.valor,
                produtos: produtosRelacionados,
                id: initialValues.id,
                funcionarioId: initialValues.funcionario_id,
                mesaId: initialValues.mesa_id
            });
        }
    }, [initialValues]);

    const handleSelectProduct = (newValue) => {
        const newProduct = newValue[newValue.length - 1]; // Pega o último produto selecionado
        if (!value.produtos.some(produto => produto.id === newProduct.id)) {
            setValue((prevValue) => {
                const updatedProdutos = [
                    ...prevValue.produtos,
                    {
                        id: newProduct.id,
                        nome_do_produto: newProduct.nome_do_produto,
                        preco: newProduct.preco,
                        quantidade: 1,
                    }
                ];
                return {
                    ...prevValue,
                    produtos: updatedProdutos,
                    valor: calcularValorPedido(updatedProdutos)  // Atualiza o valor
                };
            });
        }
    };

    const handleRemoveProduct = (id) => {
        setValue((prevValue) => {
            const updatedProdutos = prevValue.produtos.filter(produto => produto.id !== id);
            return {
                ...prevValue,
                produtos: updatedProdutos,
                valor: calcularValorPedido(updatedProdutos)  // Atualiza o valor
            };
        });
    };

    const calcularValorPedido = (produtos) => {
        // Calcula o valor total com base no preço e quantidade de cada produto
        return produtos.reduce((total, produto) => total + (produto.preco * produto.quantidade), 0);
    };

    return (
        <div className="flex flex-col w-full items-center justify-center p-4">
            <h2 className="text-2xl font-bold mb-4">{title}</h2>
            <Form className="w-full max-w-md">

                {/* Campo para o valor do pedido */}
                <Form.Group className="mb-3" controlId="pedidoValor">
                    <Form.Label>Valor do Pedido</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="Valor"
                        value={value.valor}
                        onChange={(e) => handleChange('valor', e.target.value)}
                        readOnly  // Valor calculado, não editável diretamente
                    />
                </Form.Group>

                {/* Campo para selecionar a mesa */}
                <Form.Group className="mb-3" controlId="mesaSelect">
                    <Form.Label>Mesa</Form.Label>
                    <Form.Control
                        as="select"
                        value={value.mesaId}
                        onChange={(e) => handleChange('mesaId', e.target.value)}
                    >
                        <option value="">Selecione a Mesa</option>
                        {mesa.map((m) => (
                            <option key={m.id} value={m.id}>
                                {m.status_diferenciado === "Reservada com valor extra"
                                    ? `Mesa Reservada - ${m.id}`
                                    : `Mesa - ${m.id}`}
                            </option>
                        ))}
                    </Form.Control>
                </Form.Group>

                {/* Campo para selecionar o funcionário */}
                <Form.Group className="mb-3" controlId="funcionarioSelect">
                    <Form.Label>Funcionário</Form.Label>
                    <Form.Control
                        as="select"
                        value={value.funcionarioId}
                        onChange={(e) => handleChange('funcionarioId', e.target.value)}
                    >
                        <option value="">Selecione um Funcionário</option>
                        {funcionarios.map((funcionario) => (
                            <option key={funcionario.id} value={funcionario.id}>
                                {funcionario.nome}
                            </option>
                        ))}
                    </Form.Control>
                </Form.Group>

                {/* Campo para selecionar os produtos */}
                <Form.Group className="mb-3" controlId="pedidoProdutos">
                    <Form.Label>Produtos</Form.Label>
                    <Autocomplete
                        multiple
                        id="tags-standard"
                        options={estoque}
                        getOptionLabel={(option) => option.nome_do_produto}
                        value={value.produtos}
                        onChange={(event, newValue) => handleSelectProduct(newValue)}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Selecione o produto"
                            />
                        )}
                    />
                </Form.Group>

                {/* Exibição e remoção de produtos selecionados */}
                {value.produtos.map((produto, index) => (
                    <div key={produto.id} className="mb-3 flex items-center">
                        <div className="mr-4">{produto.nome_do_produto}</div>
                        <Form.Control
                            type="number"
                            placeholder="Digite a quantidade"
                            value={produto.quantidade}
                            onChange={(e) => {
                                const updatedProdutos = [...value.produtos];
                                updatedProdutos[index].quantidade = parseInt(e.target.value) || 0;
                                setValue((prevValue) => ({
                                    ...prevValue,
                                    produtos: updatedProdutos,
                                    valor: calcularValorPedido(updatedProdutos)  // Atualiza o valor
                                }));
                            }}
                        />
                        <button
                            type="button"
                            onClick={() => handleRemoveProduct(produto.id)}
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

export default PedidosForm;
