import { Router } from "express";
import {
  createTicket,
  getAllTickets,
  getTicketById,
  updateTicket,
  updateTicketStatus,
  deleteTicket,
  searchTickets,
} from "../controllers/support.controller";

const router = Router();

/**
 * @route POST /api/support
 * @desc Create Support Ticket
 */
router.post("/", createTicket);

/**
 * @route GET /api/support
 * @desc Get All Tickets
 */
router.get("/", getAllTickets);

/**
 * @route GET /api/support/search
 * @desc Search Tickets
 */
router.get("/search", searchTickets);

/**
 * @route GET /api/support/:id
 * @desc Get Single Ticket
 */
router.get("/:id", getTicketById);

/**
 * @route PUT /api/support/:id
 * @desc Update Ticket
 */
router.put("/:id", updateTicket);

/**
 * @route PATCH /api/support/:id/status
 * @desc Update Ticket Status
 */
router.patch("/:id/status", updateTicketStatus);

/**
 * @route DELETE /api/support/:id
 * @desc Delete Ticket
 */
router.delete("/:id", deleteTicket);

export default router;