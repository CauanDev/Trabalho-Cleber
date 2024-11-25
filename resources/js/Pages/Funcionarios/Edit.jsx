import React, { useRef } from 'react';
import { Head } from '@inertiajs/react';
import { Button, Breadcrumb } from 'react-bootstrap';
import { router } from '@inertiajs/react'
import FuncionariosForm from '../../Componentes/Forms/Funcionarios/FuncionariosForm';
import { Link } from '@inertiajs/react';

function Edit({ funcionario }) {
    const menuFormRef = useRef();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const funcionarioData = menuFormRef.current.getValues();
        router.put('/editar-funcionarios', funcionarioData);

    };

    const crumbs = [
        { label: 'Home', link: '/' },
        { label: 'Funcionários', link: '/funcionarios' },
        { label: 'Atualizar Funcionário' }
    ];

    return (
        <>
            <Head title="Atualizar Funcionário" />

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
                    title="Atualizar Funcionário"
                    onSubmit={handleSubmit}
                    initialValues={funcionario}
                />

                <Button variant="primary" onClick={handleSubmit} className="mt-3">
                    Salvar Funcionário
                </Button>
            </div>
        </>
    );
}

export default Edit;
