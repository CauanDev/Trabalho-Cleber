import React, { useState, useEffect, useImperativeHandle } from 'react';
import { Form, Button } from 'react-bootstrap';

// Usando forwardRef para expor o método getValues para o componente pai
const FuncionariosForm = React.forwardRef(({ onSubmit, initialValues }, ref) => {
    const [formData, setFormData] = useState({
        nome: '',
        sexo: 'Masculino',
        salario: '',
        id: ''
    });

    // Atualiza o estado com os initialValues quando o componente for montado ou quando initialValues mudar
    useEffect(() => {
        if (initialValues) {
            setFormData({
                nome: initialValues.nome || '',
                sexo: initialValues.sexo || '',
                salario: initialValues.salario || '',
                id: initialValues.id
            });
        }
    }, [initialValues]);

    // Função para pegar os valores do formulário
    const getValues = () => {
        return formData;
    };

    // Expondo a função getValues para o componente pai via ref
    useImperativeHandle(ref, () => ({
        getValues
    }));

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData); // Chama o onSubmit passando os dados do formulário
    };

    return (
        <div className="px-32">
            <h3>{initialValues ? 'Editar Funcionário' : 'Criar Funcionário'}</h3>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="nome">
                    <Form.Label>Nome</Form.Label>
                    <Form.Control
                        type="text"
                        name="nome"
                        value={formData.nome}
                        onChange={handleChange}
                        placeholder="Digite o nome do funcionário"
                    />
                </Form.Group>

                <Form.Group controlId="sexo" className="mt-3">
                    <Form.Label>Sexo</Form.Label>
                    <Form.Control
                        as="select"
                        name="sexo"
                        value={formData.sexo}
                        onChange={handleChange}
                    >
                        <option value="Masculino">Masculino</option>
                        <option value="Feminino">Feminino</option>
                        <option value="Outro">Outro</option>
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId="salario" className="mt-3">
                    <Form.Label>Salário</Form.Label>
                    <Form.Control
                        type="number"
                        name="salario"
                        value={formData.salario}
                        onChange={handleChange}
                        placeholder="Digite o salário do funcionário"
                    />
                </Form.Group>
            </Form>
        </div>
    );
});


export default FuncionariosForm;
