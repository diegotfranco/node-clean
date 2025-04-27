import type { Request, Response } from "express";
import * as ProdutoService from "services/produto.service";

const listarProdutos = async (_req: Request, res: Response) => {
  const result = await ProdutoService.listarProdutos();
  if (result.isSuccess) {
    res.status(200).json(result.value);
  } else {
    res.status(404).json({ error: result.error });
  }
};

const buscarProdutoPorId = async (req: Request, res: Response) => {
  const result = await ProdutoService.buscarProdutoPorId(Number(req.params.id));

  if (result.isSuccess) {
    res.status(200).json(result.value);
  } else {
    res.status(404).json({ error: result.error });
  }
};

const criarProduto = async (req: Request, res: Response) => {
  const result = await ProdutoService.criarProduto(req.body);
  if (result.isSuccess) {
    res.status(201).json(result.value);
  } else {
    res.status(400).json(result.error);
  }
};

const atualizarProduto = async (req: Request, res: Response) => {
  const result = await ProdutoService.atualizarProduto(
    Number(req.params.id),
    req.body,
  );

  if (result.isSuccess) {
    res.status(200).json(result.value);
  } else {
    res.status(404).json({ error: result.error });
  }
};

const deletarProduto = async (req: Request, res: Response) => {
  const result = await ProdutoService.deletarProduto(Number(req.params.id));

  if (result.isSuccess) {
    res.sendStatus(204);
  } else {
    res.status(404).json({ error: result.error });
  }
};

export const ProdutoController = {
  listarProdutos,
  buscarProdutoPorId,
  criarProduto,
  atualizarProduto,
  deletarProduto,
};
