import { type SQLiteDatabase } from "expo-sqlite";

export async function inicializeDatabase(database: SQLiteDatabase) {
    // Criação da tabela se ela não existir
    await database.execAsync(
        `CREATE TABLE IF NOT EXISTS usuarios (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL,
            email TEXT NOT NULL UNIQUE,
            senha TEXT NOT NULL, 
            telefone TEXT NOT NULL,
            data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP  
            
        );`
    );
    await database.execAsync(
        `CREATE TABLE IF NOT EXISTS servico (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL,
            descricao TEXT,
            duracao INTEGER,
            preco REAL NOT NULL
            
            
              
            
        );`
    );
    await database.execAsync(
        `CREATE TABLE IF NOT EXISTS profissionais (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL,
            especialidade TEXT NOT NULL, 
            telefone TEXT NOT NULL, 
            email TEXT NOT NULL UNIQUE,
            data_contratacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP  

            
            
        );`
    );
    await database.execAsync(
        `CREATE TABLE IF NOT EXISTS agendamentos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            usuario_id INTEGER,  
            servico_id INTEGER,  
            profissional_id INTEGER,  
            data_agendamento TIMESTAMP, 
            status TEXT DEFAULT 'Pendente', 
            data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  
            FOREIGN KEY (usuario_id) REFERENCES usuarios(id),  
            FOREIGN KEY (servico_id) REFERENCES servicos(id),  
            FOREIGN KEY (profissional_id) REFERENCES profissionais(id) 
                        
        );`
    );
}