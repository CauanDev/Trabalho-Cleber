import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import { Table, Pagination } from 'react-bootstrap';

function DataTable({ colunas, data, title, origem, renderAcoes, itensPorPagina = 8 }) {
  const [paginaAtual, setPaginaAtual] = useState(1);

  // Calculo de Paginacao
  const indiceInicial = (paginaAtual - 1) * itensPorPagina;
  const indiceFinal = indiceInicial + itensPorPagina;
  const dataPaginada = data.slice(indiceInicial, indiceFinal);
  const totalPaginas = Math.ceil(data.length / itensPorPagina);

  const mudarPagina = (numeroPagina) => {
    setPaginaAtual(numeroPagina);
  };

  return (
    <>
      <h1 className="text-center">{title}</h1>
      {data.length === 0 ? (
        <p className="text-center">Nenhum dado disponível</p>
      ) : (
        <>
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
              {dataPaginada.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {colunas.map((coluna, cellIndex) => (
                    <td key={cellIndex} className="text-center">
                      {/* Exibição especial para a coluna 'agendado' */}
                      {coluna.key === 'agendado' 
                        ? (row[coluna.key] ? 'Sim' : 'Não')  // Se for true, exibe 'Sim', senão 'Não'
                        : row[coluna.key]  // Para as outras colunas, exibe o valor direto
                      }
                    </td>
                  ))}
                  <td className="text-center">
                    <Link href={`/edit-${origem}/${row.id}`} className="btn btn-warning me-2">
                      Editar
                    </Link>
                    <Link href={`/remove-${origem}/${row.id}`} className="btn btn-danger me-2">
                      Deletar
                    </Link>
                    
                    {renderAcoes && renderAcoes(row)}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          <Pagination className="justify-content-center">
            <Pagination.First disabled={paginaAtual === 1} onClick={() => mudarPagina(1)} />
            <Pagination.Prev disabled={paginaAtual === 1} onClick={() => mudarPagina(paginaAtual - 1)} />

            {Array.from({ length: totalPaginas }, (_, index) => (
              <Pagination.Item
                key={index}
                active={paginaAtual === index + 1}
                onClick={() => mudarPagina(index + 1)}
              >
                {index + 1}
              </Pagination.Item>
            ))}

            <Pagination.Next disabled={paginaAtual === totalPaginas} onClick={() => mudarPagina(paginaAtual + 1)} />
            <Pagination.Last disabled={paginaAtual === totalPaginas} onClick={() => mudarPagina(totalPaginas)} />
          </Pagination>
        </>
      )}
    </>
  );
}

export default DataTable;
