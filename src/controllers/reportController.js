const { format } = require("@fast-csv/format");
const PDFDocument = require("pdfkit");

const ticketModel = require("../models/ticketModel");

const exportTicketCSV = async (req, res) => {
    try {
        const tickets =  await ticketModel.getTickets();

        res.setHeader("Content-Disposition", "attachment; filename=tickets.csv");
        res.setHeader("Content-Type", "text-csv");

        const csvStream = format({ headers: true});
        csvStream.pipe(res);

        tickets.forEach((ticket) => {
            csvStream.write({
                Evento: ticket.evento,
                Local: ticket.local,
                DataDoEvento: ticket.data_evento,
                Categoria: ticket.categoria,
                TipoDeIngresso: ticket.tipo_ingresso,
                Preço: ticket.preco,
                QuantidadeDisponível: ticket.quantidade_disponivel
            });
        });
        
        csvStream.end();
    } catch (error) {
        res.status(500).json({ message: "Erro ao gerar o CSV"});
    }
};

const exportTicketPDF = async (req, res) => {
    try {
        const tickets =  await ticketModel.getTickets();

        res.setHeader("Content-Type", "application/pdf");
        res.setHeader("Content-Disposition", "inline; filename=tickets.pdf")

        const doc = new PDFDocument();
        doc.pipe(res);

        //Titulo
        doc.fontSize(20).text("Relatorio de Ingressos", {align: "center"});
        doc.moveDown();

        //Cabeçalho
        doc.fontSize(12).text("Evento | Local | Data do Evento | Categoria | Tipo de Ingresso | Preço | Quantidade Disponível", {underline: true});
        doc.moveDown(0.5);

        //Add dados dos ingressos
        tickets.forEach((ticket) => {
            doc.text(
                `${ticket.evento} | ${ticket.local} | ${ticket.data_evento} | ${ticket.categoria} | ${ticket.tipo_ingresso} |${ticket.preco} |${ticket.quantidade_disponivel} `
            );
        });

        doc.end(); 
    } catch (error) {
        res.status(500).json({ message: "Erro ao gerar o PDF"}); 
    }
};

module.exports = { exportTicketCSV, exportTicketPDF };