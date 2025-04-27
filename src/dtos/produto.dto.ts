import { z } from "zod";

export const ProdutoSchema = z.object({
  id: z.number().int(),
  nome: z.string().min(1, "Nome é obrigatório"),
  preco: z.number().positive("Preço deve ser positivo"),
  estoque: z.number().int().nonnegative("Estoque não pode ser negativo"),
});

export type ProdutoDTO = z.infer<typeof ProdutoSchema>;
