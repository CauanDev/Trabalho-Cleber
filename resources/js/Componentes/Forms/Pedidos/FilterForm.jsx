import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';

function FilterForm({ onFilterChange, funcionarios, mesas }) {
    const [filters, setFilters] = useState({
        mesaId: '',
        funcionarioId: '',
        valorMin: '',
        valorMax: '',
        createdAtMin: '',
        createdAtMax: '',
        status: ''
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
            <h3>Filtrar Pedidos</h3>
            <Form>
                <div className="d-flex justify-between">
                    <Form.Group controlId="mesaId" className="mr-2" style={{ flex: 1 }}>
                        <Form.Label>Mesa</Form.Label>
                        <Form.Control
                            as="select"
                            name="mesaId"
                            value={filters.mesaId}
                            onChange={handleChange}
                        >
                            <option value="">Selecione uma mesa</option>
                            {mesas.map((mesa) => (
                                <option key={mesa.id} value={mesa.id}>
                                    Mesa {mesa.id}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="funcionarioId" className="mr-2" style={{ flex: 1 }}>
                        <Form.Label>Funcionário</Form.Label>
                        <Form.Control
                            as="select"
                            name="funcionarioId"
                            value={filters.funcionarioId}
                            onChange={handleChange}
                        >
                            <option value="">Selecione um funcionário</option>
                            {funcionarios.map((funcionario) => (
                                <option key={funcionario.id} value={funcionario.id}>
                                    {funcionario.nome}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                </div>

                <div className="d-flex justify-between">
                    <Form.Group controlId="valorMin" className="mr-2" style={{ flex: 1 }}>
                        <Form.Label>Valor Mínimo</Form.Label>
                        <Form.Control
                            type="number"
                            name="valorMin"
                            value={filters.valorMin}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group controlId="valorMax" className="mr-2" style={{ flex: 1 }}>
                        <Form.Label>Valor Máximo</Form.Label>
                        <Form.Control
                            type="number"
                            name="valorMax"
                            value={filters.valorMax}
                            onChange={handleChange}
                        />
                    </Form.Group>
                </div>

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

                <Form.Group controlId="status">
                    <Form.Label>Status</Form.Label>
                    <Form.Control
                        as="select"
                        name="status"
                        value={filters.status}
                        onChange={handleChange}
                    >
                        <option value="">Selecione o status</option>
                        <option value="Aberto">Aberto</option>
                        <option value="Fechado">Fechado</option>
                        <option value="Cancelado">Cancelado</option>
                    </Form.Control>
                </Form.Group>
            </Form>
        </div>
    );
}

export default FilterForm;
