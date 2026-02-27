import { Router } from "express";
import {
  createItem,
  deleteItem,
  getDashboardStats,
  listCollection,
  listUsers,
  updateItem,
} from "../controllers/adminController.js";
import { requireAdminAuth, verifyAdminLogin } from "../middleware/adminAuth.js";

const router = Router();

router.post("/login", verifyAdminLogin);
router.use(requireAdminAuth);

router.get("/stats", getDashboardStats);
router.get("/users", listUsers);

router.get("/apps", listCollection("apps"));
router.post("/apps", createItem("apps"));
router.put("/apps/:id", updateItem("apps"));
router.delete("/apps/:id", deleteItem("apps"));

router.get("/resources", listCollection("resources"));
router.post("/resources", createItem("resources"));
router.put("/resources/:id", updateItem("resources"));
router.delete("/resources/:id", deleteItem("resources"));

export default router;
