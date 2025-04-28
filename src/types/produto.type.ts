export type Produto = {
  id: number;
  codigo: string;
  nome: string;
  descricao?: string;
  preco: number;
  custo: number;
  quantidade: number;
  id_status: number;
  created_at: Date;
  updated_at: Date;
};
