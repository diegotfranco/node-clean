import { Router } from "express";
import produtos from "routes/produto.route";

const router = Router();

router.use("/api/v1/produtos", produtos);

export default router;
