import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

function FilterForm({ onFilterChange, mesas }) {
    
    const [filters, setFilters] = useState({
        dataAgendamentoMin: '',
        dataAgendamentoMax: '',
        quantidadePessoasMin: '',
        quantidadePessoasMax: '',
        mesaId: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        const updatedFilters = {
            ...filters,
            [name]: value
        };
        
        // Atualiza o estado
        setFilters(updatedFilters);
        
        // Chama a função para aplicar o filtro com os filtros atualizados
        onFilterChange(updatedFilters);
    };

    return (
        <div className="px-32">
            <h3>Filtrar Reservas</h3>
            <Form>
                <div className="d-flex justify-between">
                    <Form.Group controlId="dataAgendamentoMin" className="mr-2" style={{ flex: 1 }}>
                        <Form.Label>Data de Agendamento (mínima)</Form.Label>
                        <Form.Control
                            type="date"
                            name="dataAgendamentoMin"
                            value={filters.dataAgendamentoMin}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group controlId="dataAgendamentoMax" className="mr-2" style={{ flex: 1 }}>
                        <Form.Label>Data de Agendamento (máxima)</Form.Label>
                        <Form.Control
                            type="date"
                            name="dataAgendamentoMax"
                            value={filters.dataAgendamentoMax}
                            onChange={handleChange}
                        />
                    </Form.Group>
                </div>

                <div className="d-flex justify-between">
                    <Form.Group controlId="quantidadePessoasMin" className="mr-2" style={{ flex: 1 }}>
                        <Form.Label>Quantidade de Pessoas (mínima)</Form.Label>
                        <Form.Control
                            type="number"
                            name="quantidadePessoasMin"
                            value={filters.quantidadePessoasMin}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group controlId="quantidadePessoasMax" className="mr-2" style={{ flex: 1 }}>
                        <Form.Label>Quantidade de Pessoas (máxima)</Form.Label>
                        <Form.Control
                            type="number"
                            name="quantidadePessoasMax"
                            value={filters.quantidadePessoasMax}
                            onChange={handleChange}
                        />
                    </Form.Group>
                </div>

                <Form.Group controlId="mesaId">
                    <Form.Label>ID da Mesa</Form.Label>
                    <Form.Control
                        as="select"
                        name="mesaId"
                        value={filters.mesaId}
                        onChange={handleChange}
                    >
                        <option value="">Selecione uma Mesa</option>
                        {mesas.map(mesa => (
                            <option key={mesa.id} value={mesa.id}>
                              Mesa - {mesa.id} 
                            </option>
                        ))}
                    </Form.Control>
                </Form.Group>
            </Form>
        </div>
    );
}

export default FilterForm;
