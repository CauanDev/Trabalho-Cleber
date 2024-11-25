import React, { useState, forwardRef, useImperativeHandle, useEffect } from 'react';
import { Form } from 'react-bootstrap';

const ReservasForm = forwardRef(({ initialValues = null, title = "Adicionar Reserva", mesas }, ref) => {
    const [value, setValue] = useState({
        mesaId: '',
        quantidadePessoas: '',
        dataReserva: new Date().toISOString().split('T')[0],
        id: null
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
                quantidadePessoas: initialValues.quantidade_pessoas,
                mesaId: initialValues.mesa_id,
                dataReserva: initialValues.data_agendado,
                id: initialValues.id
            });
        }
    }, [initialValues]);

    return (
        <div className="flex flex-col w-full items-center justify-center p-4">
            <h2 className="text-2xl font-bold mb-4">{title}</h2>
            <Form className="w-full max-w-md">
                <Form.Group className="mb-3" controlId="mesaId">
                    <Form.Label>Selecione a Mesa</Form.Label>
                    <Form.Control
                        as="select"
                        value={value.mesaId}
                        onChange={(e) => handleChange('mesaId', e.target.value)}
                    >
                        <option value="">Selecione uma mesa</option>
                        {(mesas.mesas || mesas).map((mesa) => (
                            <option key={mesa.id} value={mesa.id}>
                                Mesa {mesa.id}
                            </option>
                        ))}                   
                    </Form.Control>
                    {initialValues ? (
                            <p>Mesa Selecionada Antes: {initialValues.mesa_id}</p>
                        ) : (
                            <p></p>
                        )}
                </Form.Group>

                <Form.Group className="mb-3" controlId="quantidadePessoas">
                    <Form.Label>Quantidade de Pessoas</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="Digite a quantidade de pessoas"
                        value={value.quantidadePessoas}
                        onChange={(e) => handleChange('quantidadePessoas', e.target.value)}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="dataReserva">
                    <Form.Label>Data da Reserva</Form.Label>
                    <Form.Control
                        type="date"
                        name="dataReserva"
                        value={value.dataReserva}
                        onChange={(e) => handleChange('dataReserva', e.target.value)} // Atualiza corretamente
                    />
                </Form.Group>
            </Form>
        </div>
    );
});

export default ReservasForm;
