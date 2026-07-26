import { Request, Response } from "express";
import SupportTicket from "../models/SupportTicket";

/**
 * Create Support Ticket
 */
export const createTicket = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const ticket = await SupportTicket.create(req.body);

    res.status(201).json({
      success: true,
      message: "Support ticket created successfully.",
      data: ticket,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Get All Tickets
 */
export const getAllTickets = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const filter: any = {};

    if (req.query.status) {
      filter.status = req.query.status;
    }

    if (req.query.priority) {
      filter.priority = req.query.priority;
    }

    const tickets = await SupportTicket.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await SupportTicket.countDocuments(filter);

    res.status(200).json({
      success: true,
      page,
      totalPages: Math.ceil(total / limit),
      total,
      data: tickets,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Get Single Ticket
 */
export const getTicketById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const ticket = await SupportTicket.findById(req.params.id);

    if (!ticket) {
      res.status(404).json({
        success: false,
        message: "Ticket not found.",
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: ticket,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Update Ticket
 */
export const updateTicket = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const ticket = await SupportTicket.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!ticket) {
      res.status(404).json({
        success: false,
        message: "Ticket not found.",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Ticket updated successfully.",
      data: ticket,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Update Ticket Status
 */
export const updateTicketStatus = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { status } = req.body;

    const ticket = await SupportTicket.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!ticket) {
      res.status(404).json({
        success: false,
        message: "Ticket not found.",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Status updated successfully.",
      data: ticket,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Delete Ticket
 */
export const deleteTicket = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const ticket = await SupportTicket.findByIdAndDelete(req.params.id);

    if (!ticket) {
      res.status(404).json({
        success: false,
        message: "Ticket not found.",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Ticket deleted successfully.",
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Search Tickets
 */
export const searchTickets = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const keyword = String(req.query.keyword || "");

    const tickets = await SupportTicket.find({
      $or: [
        { name: { $regex: keyword, $options: "i" } },
        { email: { $regex: keyword, $options: "i" } },
        { subject: { $regex: keyword, $options: "i" } },
        { message: { $regex: keyword, $options: "i" } },
      ],
    });

    res.status(200).json({
      success: true,
      count: tickets.length,
      data: tickets,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};