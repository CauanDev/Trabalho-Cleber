import React from 'react';
import { Link } from '@inertiajs/react';
import { Table } from 'react-bootstrap';

function DataTable({ colunas, data, title, origem, renderAcoes }) {
  return (
    <>
      <h1 className="text-center">{title}</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            {colunas.map((coluna, index) => (
              <th key={index} className="text-center">{coluna.title}</th>
            ))}
            <th className="text-center">Ações</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {colunas.map((coluna, cellIndex) => (
                <td key={cellIndex} className="text-center">{row[coluna.key]}</td>
              ))}
              <td className="text-center">
                <Link href={`/edit-${origem}/${row.id}`} className="btn btn-warning me-2">
                  Editar
                </Link>
                <Link href={`/remove-${origem}/${row.id}`} className="btn btn-danger me-2">
                  Deletar
                </Link>
                
                {/* Ações adicionais */}
                {renderAcoes && renderAcoes(row)}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}

export default DataTable;
