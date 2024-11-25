import React, { useState, forwardRef, useImperativeHandle, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';

const MesaForm = forwardRef(({ initialValues = null, title = "Adicionar Mesa" }, ref) => {
    const [value, setValue] = useState({ status: 'Disponível', agendado: false,id:null });

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
            console.log(initialValues)
            setValue({
                status: initialValues.status,
                agendado: initialValues.agendado,
                id: initialValues.id
            });
        }
    }, [initialValues]);

    return (
        <div className="flex flex-col w-full items-center justify-center p-4">
            <h2 className="text-2xl font-bold mb-4">{title}</h2>
            <Form className="w-full max-w-md">
                {/* Campo Status - Select */}
                <Form.Group className="mb-3" controlId="mesaStatus">
                    <Form.Label>Status</Form.Label>
                    <Form.Control
                        as="select"
                        value={value.status}
                        onChange={(e) => handleChange('status', e.target.value)}
                    >
                        <option value="Disponível">Disponível</option>
                        <option value="Ocupada">Ocupada</option>
                        <option value="Reservada">Reservada</option>
                    </Form.Control>
                </Form.Group>
            </Form>
        </div>
    );
});

export default MesaForm;
