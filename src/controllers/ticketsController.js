const ticketModel = require("../models/ticketModel");

const getAllTickets = async (req, res) => {
    try {
        const { name } = req.query;
        const tickets = await ticketModel.getTickets(name);
        res.json(tickets);
    } catch (error) { 
        res.status(500).json({ message: "Erro ao buscar ingressos." });
    }
};

const getTicket = async (req, res) => {
    try {
        const ticket = await ticketModel.getTicketById(req.params.id);
        if (!ticket) {
            return res.status(404).json({ message: "Ingressos não encontrado." });
        }
        res.json(ticket);
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar ingresso." });
    }
};

const createTicket = async (req, res) => {
    try {
        const { evento, local, data_evento, categoria, tipo_ingresso, preco, quantidade_disponivel } = req.body;
        const newTicket = await ticketModel.createTicket(evento, local, data_evento, categoria, tipo_ingresso, preco, quantidade_disponivel);
        res.status(201).json(newTicket);
    } catch (error) {
	console.log(error);
        if (error.code === "23505") { // Código de erro do PostgreSQL para chave única violada
            return res.status(400).json({ message: "Ingresso já cadastrado." });
        }
        res.status(500).json({ message: "Erro ao criar ingresso." });
    }
};

const updateTicket = async (req, res) => {
    try {
        const { evento, local, data_evento, categoria, tipo_ingresso, preco, quantidade_disponivel } = req.body;
        const updatedTicket = await ticketModel.updateTicket(req.params.id, evento, local, data_evento, categoria, tipo_ingresso, preco, quantidade_disponivel);
        if (!updatedTicket) {
            return res.status(404).json({ message: "Ingresso não encontrado." });
        }
        res.json(updatedTicket);
    } catch (error) {
        res.status(500).json({ message: "Erro ao atualizar ingresso." });
    }
};

const deleteTicket = async (req, res) => {
    try {
        const message = await ticketModel.deleteTicket(req.params.id);
        res.json(message);
    } catch (error) {
        res.status(500).json({ message: "Erro ao deletar ingresso." });
    }
};

module.exports = { getAllTickets, getTicket, createTicket, updateTicket, deleteTicket };