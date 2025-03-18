CREATE DATABASE tickets;

\c tickets;

CREATE TABLE tickets (
    id SERIAL PRIMARY KEY,
    evento VARCHAR(255),
    local VARCHAR(255),
    data_evento DATE,
    categoria VARCHAR(50),
    tipo_ingresso VARCHAR(50),
    preco DECIMAL(10,2),
    quantidade_disponivel INTEGER
);

INSERT INTO tickets (evento, local, data_evento, categoria, tipo_ingresso, preco, quantidade_disponivel) VALUES
('Love On Tour', 'Allianz Park', '2023-12-06', 'Arquibancada', 'Meia-Entrada', '215.50', 25837),
('Love On Tour', 'Allianz Park', '2023-12-06', 'Pista', 'Inteira', '431.00', 5450),
('Love On Tour', 'Allianz Park', '2023-12-06', 'Pista VIP', 'Inteira', '751.00', 333),
('Love On Tour', 'Allianz Park', '2023-12-06', 'Camarote', 'Meia-Entrada', '1500.50', 54);