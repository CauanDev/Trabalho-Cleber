<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class PedidosController extends Controller
{
    public function index()
    {
        $pedidos = DB::select(
            'SELECT 
                pedidos.id,
                pedidos.valor,
                pedidos.mesa_id,
                pedidos.funcionario_id,
                pedidos.status,
                funcionarios.nome as nome_funcionario,
                COUNT(pedidos_itens.id) as quantidade_item
            FROM pedidos
            LEFT JOIN funcionarios ON pedidos.funcionario_id = funcionarios.id
            LEFT JOIN pedidos_itens ON pedidos.id = pedidos_itens.pedido_id
            WHERE pedidos.deleted_at IS NULL and pedidos_itens.deleted_at is NULL
            GROUP BY pedidos.id, pedidos.valor, pedidos.mesa_id, pedidos.funcionario_id, funcionarios.nome'
        );

        $funcionarios = DB::select(
            'SELECT * FROM funcionarios WHERE deleted_at IS NULL'
        );

        $mesas = DB::select(
            'SELECT *
            FROM mesas
            WHERE deleted_at IS NULL'
        );
        $message = session('message');


        return Inertia::render('Pedidos/Index', [
            'pedidos' => $pedidos,
            'message' => $message,
            'mesas' => $mesas,
            'funcionarios' => $funcionarios
        ]);
    }

    public function create()
    {

        $funcionarios = DB::select(
            'SELECT * FROM funcionarios WHERE deleted_at IS NULL'
        );

        $mesas = DB::select(
            'SELECT *,
                CASE
                    WHEN status = \'Reservada\' THEN \'Reservada com valor extra\'
                    ELSE \'Status normal\'
                END AS status_diferenciado
            FROM mesas
            WHERE deleted_at IS NULL AND status != \'Ocupada\''
        );



        $produtos = DB::select(
            'SELECT * FROM menu WHERE deleted_at IS NULL'
        );

        return Inertia::render('Pedidos/Create', [
            'funcionarios' => $funcionarios,
            'mesas' => $mesas,
            'produtos' => $produtos,
        ]);
    }

    public function edit($id)
    {
        $pedido = DB::selectOne(
            'SELECT * FROM pedidos WHERE deleted_at IS NULL AND id = :id',
            ['id' => $id]
        );

        $funcionarios = DB::select(
            'SELECT * FROM funcionarios WHERE deleted_at IS NULL'
        );

        $mesas = DB::select(
            'SELECT *,
                CASE
                    WHEN status = \'Reservada\' THEN \'Reservada com valor extra\'
                    ELSE \'Status normal\'
                END AS status_diferenciado
            FROM mesas
            WHERE deleted_at IS NULL 
                AND (status != \'Ocupada\' OR id = :mesa_id)',
            ['mesa_id' => $pedido->mesa_id]
        );



        $produtos = DB::select(
            'SELECT * FROM menu WHERE deleted_at IS NULL'
        );

        $produtosRelacionados = DB::select(
            'SELECT 
                p.*, 
                COUNT(pi.produto_id) AS quantidade
            FROM pedidos_itens pi
            JOIN menu p ON pi.produto_id = p.id
            WHERE pi.pedido_id = :pedido_id AND pi.deleted_at is NULL
            GROUP BY p.id',
            ['pedido_id' => $id]
        );


        return Inertia::render('Pedidos/Edit', [
            'pedido' => $pedido,
            'mesas' => $mesas,
            'funcionarios' => $funcionarios,
            'produtos' => $produtos,
            'produtosRelacionados' => $produtosRelacionados

        ]);
    }

    public function update(Request $request)
    {
        $resultado = $this->verificarEstoqueParaPedido($request->produtos);
        if ($resultado) {
            try {

                // Primeiro vamos resetar o estoque do pedido para depois adicionar novamente
                $produtosRelacionados = DB::select(
                    'SELECT 
                        p.*, 
                        COUNT(pi.produto_id) AS quantidade
                    FROM pedidos_itens pi
                    JOIN menu p ON pi.produto_id = p.id
                    WHERE pi.pedido_id = :pedido_id
                    GROUP BY p.id',
                    ['pedido_id' => $request->id]
                );

                DB::update('
                UPDATE pedidos 
                SET 
                    valor = :valor, 
                    funcionario_id = :funcionario_id, 
                    mesa_id = :mesa_id, 
                    updated_at = NOW(), 
                    status = \'Aberto\'
                WHERE id = :id
            ', [
                    'valor' => $request->valor,
                    'funcionario_id' => $request->funcionarioId,
                    'mesa_id' => $request->mesaId,
                    'id' => $request->id
                ]);

                $this->atribuiEstoque($produtosRelacionados);
                $this->limpaEstoque($produtosRelacionados, $request->id);
                $this->addItem($request->produtos, $request->id);
                $this->atualizaEstoque($request->produtos);
                return redirect()->route('pedidos')->with('message', 'Pedido Atualizado com Sucesso! ');
            } catch (\Exception $e) {
                return redirect()->route('pedidos')->with('message', 'Erro ao Atualizar Pedido! ' . $e->getMessage());
            }
        } else {
            return redirect()->route('pedidos')->with('message', 'Não há estoque suficiente para criar o pedido!');
        }
    }

    public function verificarEstoqueParaPedido(array $produtos)
    {
        $quantidades_produto = [];

        foreach ($produtos as $produto) {
            $produto_id = $produto['id'];
            $quantidade_pedido = $produto['quantidade'];

            $itens_menu = DB::select("
                SELECT mi.produto_id, mi.quantidade
                FROM menu_itens mi
                WHERE mi.menu_id = :produto_id
            ", ['produto_id' => $produto_id]);

            foreach ($itens_menu as $item) {
                $produto_id_item = $item->produto_id;
                $quantidade_necessaria = $item->quantidade * $quantidade_pedido;

                if (isset($quantidades_produto[$produto_id_item])) {
                    $quantidades_produto[$produto_id_item] += $quantidade_necessaria;
                } else {
                    $quantidades_produto[$produto_id_item] = $quantidade_necessaria;
                }
            }
        }

        foreach ($quantidades_produto as $produto_id_item => $quantidade_necessaria_total) {
            $estoque_atual = DB::selectOne("
                SELECT COALESCE(quantidade, 0) as estoque_atual
                FROM produtos
                WHERE id = :produto_id
            ", ['produto_id' => $produto_id_item]);

            if ($estoque_atual->estoque_atual < $quantidade_necessaria_total) {
                return false;
            }
        }

        return true;
    }





    public function store(Request $request)
    {
        $resultado = $this->verificarEstoqueParaPedido($request->produtos);
        if ($resultado) {
            try {

                DB::insert('
                INSERT INTO pedidos (valor, funcionario_id, mesa_id, created_at, updated_at, status)
                VALUES (:valor, :funcionario_id, :mesa_id, NOW(), NOW(), \'Aberto\')
            ', [
                    'valor' => $request->valor,
                    'funcionario_id' => $request->funcionarioId,
                    'mesa_id' => $request->mesaId,
                ]);


                DB::update(
                    '
                    UPDATE mesas 
                    SET status = \'Ocupada\'
                    WHERE id = :id',
                    [
                        'id' => $request->mesaId
                    ]
                );


                $pedido_id = DB::getPdo()->lastInsertId();

                $this->addItem($request->produtos, $pedido_id);
                $this->atualizaEstoque($request->produtos);
                return redirect()->route('pedidos')->with('message', 'Pedido criado com sucesso!');
            } catch (\Exception $e) {
                return redirect()->route('pedidos')->with('message', 'Erro ao criar pedido! ' . $e->getMessage());
            }
        } else {
            return redirect()->route('pedidos')->with('message', 'Não há estoque suficiente para criar o pedido!');
        }
    }

    public function alterarStatus($id)
    {
        try {
            DB::update('
            UPDATE pedidos 
            SET status = CASE 
                            WHEN status = \'Aberto\' THEN \'Fechado\' 
                            WHEN status = \'Fechado\' THEN \'Aberto\' 
                         END
            WHERE id = :id
        ', [
                'id' => $id
            ]);
            return redirect()->route('pedidos')->with('message', 'Pedido Atualizado com sucesso!');
        } catch (\Throwable $th) {
            return redirect()->route('pedidos')->with('message', 'Erro ao Atualizar Pedido!' . $th->getMessage());
        }
    }

    public function addItem($produtos, $id)
    {

        $produtos_json = json_encode($produtos);

        DB::statement('
            SELECT insert_pedido_items(:pedido_id, :produtos) 
        ', [
            'pedido_id' => $id,
            'produtos' => $produtos_json
        ]);
    }

    public function atualizaEstoque($produtos)
    {
        DB::select('SELECT atualizar_estoque_produtos(:produtos)', [
            'produtos' => json_encode($produtos),
        ]);
    }

    public function atribuiEstoque($produtos)
    {
        DB::select('SELECT atualizar_estoque_produtos_remove(:produtos)', [
            'produtos' => json_encode($produtos)
        ]);
    }

    public function limpaEstoque($produtos, $id)
    {
        foreach ($produtos as $produto) {

            DB::update('
                    UPDATE pedidos_itens
                    SET deleted_at = NOW()
                    WHERE pedido_id = :pedido_id AND produto_id = :produto_id
                ', [
                'produto_id' => $produto->id,
                'pedido_id' => $id
            ]);
        }
    }

    public function destroy($id)
    {


        try {
            $produtosRelacionados = DB::select(
                'SELECT 
                    p.*, 
                    COUNT(pi.produto_id) AS quantidade
                FROM pedidos_itens pi
                JOIN menu p ON pi.produto_id = p.id
                WHERE pi.pedido_id = :pedido_id
                GROUP BY p.id',
                ['pedido_id' => $id]
            );

            DB::update('
            UPDATE pedidos 
            SET 
                deleted_at = NOW()
            WHERE id = :id
        ', [
                'id' => $id
            ]);

            $this->atribuiEstoque($produtosRelacionados);
            $this->limpaEstoque($produtosRelacionados, $id);

            return redirect()->route('pedidos')->with('message', 'Pedido Deletado com sucesso!');
        } catch (\Throwable $th) {
            return redirect()->route('pedidos')->with('message', 'Erro ao Deletar Pedido!' . $th->getMessage());
        }
    }

   public function filter(Request $request)
{
    $query = '
        SELECT 
            pedidos.id,
            pedidos.valor,
            pedidos.mesa_id,
            pedidos.funcionario_id,
            pedidos.status,
            funcionarios.nome as nome_funcionario,
            COUNT(pedidos_itens.id) as quantidade_item
        FROM pedidos
        LEFT JOIN funcionarios ON pedidos.funcionario_id = funcionarios.id
        LEFT JOIN pedidos_itens ON pedidos.id = pedidos_itens.pedido_id
        WHERE pedidos.deleted_at IS NULL 
          AND pedidos_itens.deleted_at IS NULL
    ';

    $parameters = [];

    if ($request->has('data_inicial') && $request->has('data_final')) {
        $query .= ' AND pedidos.created_at BETWEEN ? AND ?';
        $parameters[] = $request->input('data_inicial');
        $parameters[] = $request->input('data_final');
    }

    $query .= ' GROUP BY pedidos.id, pedidos.valor, pedidos.mesa_id, pedidos.funcionario_id, funcionarios.nome';

    if ($request->has('mais_atendeu')) {
        $query = '
            SELECT 
                funcionarios.nome as nome_funcionario, 
                COUNT(pedidos.id) as total_atendimentos
            FROM pedidos
            LEFT JOIN funcionarios ON pedidos.funcionario_id = funcionarios.id
            WHERE pedidos.deleted_at IS NULL
            GROUP BY funcionarios.nome
            ORDER BY total_atendimentos DESC
            LIMIT 1
        ';
        $parameters = []; 
    }
    if ($request->has('ordenacao_valor')) {
        $ordenacao = $request->input('ordenacao_valor') == 'asc' ? 'ASC' : 'DESC';
        $query .= ' ORDER BY pedidos.valor ' . $ordenacao;
    } else {
        $query .= ' ORDER BY pedidos.created_at DESC';
    }


    if ($request->has('mais_mesa')) {
        $query = '
            SELECT 
                pedidos.mesa_id,
                COUNT(pedidos.id) as total_pessoas
            FROM pedidos
            LEFT JOIN pedidos_itens ON pedidos.id = pedidos_itens.pedido_id
            WHERE pedidos.deleted_at IS NULL
            GROUP BY pedidos.mesa_id
            ORDER BY total_pessoas DESC
            LIMIT 1
        ';
        $parameters = []; 
    }

    $pedidos = DB::select($query, $parameters);

    return response()->json([
        'pedidos' => $pedidos
    ]);
}

    
    
}
