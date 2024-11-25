import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';

function FilterForm({ onFilterChange }) {

    const [filters, setFilters] = useState({
        createdAtMin: '',
        createdAtMax: '',
        status: '',
        agendado: ''
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
            <h3>Filtrar Mesas</h3>
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
                    <Form.Group controlId="status" className="mr-2" style={{ flex: 1 }}>
                        <Form.Label>Status</Form.Label>
                        <Form.Control
                            as="select"
                            name="status"
                            value={filters.status}
                            onChange={handleChange}
                        >
                            <option value="">Selecione o status</option>
                            <option value="Disponível">Disponível</option>
                            <option value="Ocupada">Ocupada</option>
                            <option value="Reservada">Reservada</option>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="agendado" className="mr-2" style={{ flex: 1 }}>
                        <Form.Label>Agendado</Form.Label>
                        <Form.Control
                            as="select"
                            name="agendado"
                            value={filters.agendado}
                            onChange={handleChange}
                        >
                            <option value="">Selecione</option>
                            <option value="true">Sim</option>
                            <option value="false">Não</option>
                        </Form.Control>
                    </Form.Group>
                </div>
            </Form>
        </div>
    );
}

export default FilterForm;
