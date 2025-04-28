import { sql } from "db/postgres";
import type { ProdutoDTO } from "dtos/produto.dto";
import type { Produto } from "types/produto.type";

export const listarTodos = async (): Promise<Produto[]> => {
  return await sql<Produto[]>`SELECT * FROM produtos ORDER BY id`;
};

export const buscarPorId = async (id: number): Promise<Produto | null> => {
  const [produto] = await sql<
    Produto[]
  >`SELECT * FROM produtos WHERE id = ${id}`;
  return produto || null;
};

export const criar = async (data: ProdutoDTO): Promise<Produto | undefined> => {
  const [novo] = await sql<Produto[]>`
    INSERT INTO produtos ${sql(data)} RETURNING *`;
  return novo;
};

export const atualizar = async (
  id: number,
  data: Partial<Produto>,
): Promise<Produto | undefined> => {
  const [produto] = await sql<Produto[]>`
  UPDATE produtos SET ${sql(data)}, updated_at = ${sql`now()`} WHERE id = ${id} RETURNING *`;
  
  return produto;
  };
  
  export const deletar = async (id: number): Promise<boolean> => {
    // const result = await sql`DELETE FROM produtos WHERE id = ${id}`;
    const result = await sql<Produto[]>`
      UPDATE produtos SET id_status = 0, updated_at = ${sql`now()`} WHERE id = ${id} RETURNING *`;
  return result.count > 0;
};
