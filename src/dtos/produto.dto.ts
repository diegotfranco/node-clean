import { z } from "zod";

export const ProdutoSchema = z.object({
  codigo: z.string().min(1, "código é obrigatório").max(50, "Tamanho máximo de 50 caracteres"),
  nome: z.string().min(1, "nome é obrigatório"),
  descricao: z.string().optional(),
  preco: z.number().positive("Preço deve ser positivo"),
  custo: z.number().positive("Custo deve ser positivo"),
  quantidade: z.number().int().nonnegative("quantidade não pode ser negativa"),
});

export type ProdutoDTO = z.infer<typeof ProdutoSchema>;
