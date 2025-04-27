import { ProdutoSchema, type ProdutoDTO } from "dtos/produto.dto";
import * as produtoRepository from "repositories/produto.repository";
import { notificationFromZodError } from "shared/notification";
import { createValidationError } from "errors/validationError";
import { type Result, success, fail } from "shared/result";
import type { Produto } from "types/produto.type";

export const listarProdutos = async (): Promise<Result<Produto[]>> => {
  const produtos = await produtoRepository.listarTodos();
  return success(produtos);
};

export const buscarProdutoPorId = async (
  id: number,
): Promise<Result<Produto>> => {
  const produto = await produtoRepository.buscarPorId(id);
  if (!produto) return fail("Produto não encontrado");

  return success(produto);
};

export const criarProduto = async (
  input: ProdutoDTO,
): Promise<Result<Produto>> => {
  const parsed = ProdutoSchema.safeParse(input);

  if (!parsed.success) {
    const notification = notificationFromZodError(parsed.error);
    throw createValidationError(notification);
  }

  const novoProduto = await produtoRepository.criar(parsed.data);
  return success(novoProduto);
};

export const atualizarProduto = async (
  id: number,
  input: Partial<ProdutoDTO>,
): Promise<Result<Produto>> => {
  const produtoExistente = await produtoRepository.buscarPorId(id);
  if (!produtoExistente) return fail("Produto não encontrado");

  const parsed = ProdutoSchema.partial().safeParse(input);
  if (!parsed.success) {
    const notification = notificationFromZodError(parsed.error);
    throw createValidationError(notification);
  }

  const produtoAtualizado = await produtoRepository.atualizar(id, parsed.data);
  if (!produtoAtualizado) return fail("Erro ao atualizar o produto");

  return success(produtoAtualizado);
};

export const deletarProduto = async (id: number): Promise<Result<boolean>> => {
  const sucesso = await produtoRepository.deletar(id);
  if (!sucesso) return fail("Produto não encontrado");

  return success(true);
};
