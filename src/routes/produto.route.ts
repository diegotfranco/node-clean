import { Router } from "express";
import { wrapAsyncHandlers } from "middlewares/autoAsyncHandler";
import { ProdutoController } from "controllers/produto.controller";

const router = Router();

// Automaticamente todos os métodos do ProdutoController estarão protegidos
const controller = wrapAsyncHandlers(ProdutoController);

router.get("/", controller.listarProdutos);
router.get("/:id", controller.buscarProdutoPorId);
router.post("/", controller.criarProduto);
router.put("/:id", controller.atualizarProduto);
router.delete("/:id", controller.deletarProduto);

export default router;
