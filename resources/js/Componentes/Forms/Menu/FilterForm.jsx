import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';

function FilterForm({ onFilterChange }) {

    const [filters, setFilters] = useState({
        createdAtMin: '',
        createdAtMax: '',
        stockMin: '',
        stockMax: '',
        name: ''
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
            <h3>Filtrar Produtos no Cardápio</h3>
            <Form>
                <div className="d-flex justify-between">
                    <Form.Group controlId="createdAtMin" className="mr-2" style={{ flex: 1 }}>
                        <Form.Label>Criado em (min)</Form.Label>
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
                    <Form.Group controlId="stockMin" className="mr-2" style={{ flex: 1 }}>
                        <Form.Label>Valor (mínimo)</Form.Label>
                        <Form.Control
                            type="number"
                            name="stockMin"
                            value={filters.stockMin}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group controlId="stockMax" className="mr-2" style={{ flex: 1 }}>
                        <Form.Label>Valor (máximo)</Form.Label>
                        <Form.Control
                            type="number"
                            name="stockMax"
                            value={filters.stockMax}
                            onChange={handleChange}
                        />
                    </Form.Group>
                </div>

                <Form.Group controlId="name">
                    <Form.Label>Nome</Form.Label>
                    <Form.Control
                        type="text"
                        name="name"
                        value={filters.name}
                        onChange={handleChange}
                    />
                </Form.Group>
            </Form>
        </div>
    );
}

export default FilterForm;
