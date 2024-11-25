import React from 'react';
import Button from 'react-bootstrap/Button';

function Home() {

    return (
        <div>
            <h1 className="text-4xl font-bold text-blue-500">Bem-vindo ao Inertia.js com React!</h1>
            <Button variant="primary">
                Ir para About
            </Button>
        </div>
    );
}

export default Home;
