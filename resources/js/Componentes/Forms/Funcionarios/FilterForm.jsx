import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';

function FilterForm({ onFilterChange }) {
    const [filters, setFilters] = useState({
        createdAtMin: '',
        createdAtMax: '',
        salarioMin: '',
        salarioMax: '',
        nome: '',
        sexo: ''  // Adicionado o filtro para sexo
    });

    useEffect(() => {
        onFilterChange(filters);
    }, [filters, onFilterChange]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFilters((prevFilters) => ({
            ...prevFilters,
            [name]: value
        }));
    };

    return (
        <div className="px-32">
            <h3>Filtrar Funcionários</h3>
            <Form>
                <div className="d-flex justify-between">
                    <Form.Group controlId="createdAtMin" className="mr-2" style={{ flex: 1 }}>
                        <Form.Label>Criado em (mínimo)</Form.Label>
                        <Form.Control
                            type="date"
                            name="createdAtMin"
                            value={filters.createdAtMin}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group controlId="createdAtMax" className="mr-2" style={{ flex: 1 }}>
                        <Form.Label>Criado em (máximo)</Form.Label>
                        <Form.Control
                            type="date"
                            name="createdAtMax"
                            value={filters.createdAtMax}
                            onChange={handleChange}
                        />
                    </Form.Group>
                </div>

                <div className="d-flex justify-between">
                    <Form.Group controlId="salarioMin" className="mr-2" style={{ flex: 1 }}>
                        <Form.Label>Salário (mínimo)</Form.Label>
                        <Form.Control
                            type="number"
                            name="salarioMin"
                            value={filters.salarioMin}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group controlId="salarioMax" className="mr-2" style={{ flex: 1 }}>
                        <Form.Label>Salário (máximo)</Form.Label>
                        <Form.Control
                            type="number"
                            name="salarioMax"
                            value={filters.salarioMax}
                            onChange={handleChange}
                        />
                    </Form.Group>
                </div>

                <Form.Group controlId="nome">
                    <Form.Label>Nome</Form.Label>
                    <Form.Control
                        type="text"
                        name="nome"
                        value={filters.nome}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group controlId="sexo">
                    <Form.Label>Sexo</Form.Label>
                    <Form.Control
                        as="select"
                        name="sexo"
                        value={filters.sexo}
                        onChange={handleChange}
                    >
                        <option value="">Selecione o sexo</option>
                        <option value="Masculino">Masculino</option>
                        <option value="Feminino">Feminino</option>
                        <option value="Outro">Outro</option>
                    </Form.Control>
                </Form.Group>
            </Form>
        </div>
    );
}

export default FilterForm;
