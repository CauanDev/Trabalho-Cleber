import React, { useRef } from 'react';
import { Head } from '@inertiajs/react';
import { Button, Breadcrumb } from 'react-bootstrap';
import { router } from '@inertiajs/react'
import FuncionariosForm from '../../Componentes/Forms/Funcionarios/FuncionariosForm';
import { Link } from '@inertiajs/react';

function Create() {
    const menuFormRef = useRef();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const funcionarioData = menuFormRef.current.getValues();
        router.post('/store-funcionario', funcionarioData);

    };

    const crumbs = [
        { label: 'Home', link: '/' },
        { label: 'Funcionários', link: '/funcionarios' },
        { label: 'Adicionar Funcionário' }
    ];

    return (
        <>
            <Head title="Adicionar Funcionário" />

            <Breadcrumb className="p-4">
                {crumbs.map((crumb, index) => (
                    <Breadcrumb.Item
                        key={index}
                        active={index === crumbs.length - 1}
                    >
                        {index !== crumbs.length - 1 ? (
                            <Link href={crumb.link}>
                                {crumb.label}
                            </Link>
                        ) : (
                            crumb.label
                        )}
                    </Breadcrumb.Item>
                ))}
            </Breadcrumb>

            <div className="flex flex-col w-full items-center justify-center p-4">

                <FuncionariosForm
                    ref={menuFormRef}
                    title="Adicionar Funcionário"
                    onSubmit={handleSubmit}
                />

                <Button variant="primary" onClick={handleSubmit} className="mt-3">
                    Criar Funcionário
                </Button>
            </div>
        </>
    );
}

export default Create;
