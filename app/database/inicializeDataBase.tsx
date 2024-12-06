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

    await database.execAsync(`
        CREATE TABLE IF NOT EXISTS servico (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL,
            duracao INTEGER,
            preco REAL NOT NULL
        );
    `);

    const resultado = await database.getAllAsync(`SELECT COUNT(*) as count FROM servico`) as { count: number }[];

    if (resultado[0]?.count === 0) {
        await database.execAsync(`
        INSERT INTO servico (nome, duracao, preco) VALUES 
        ('Volume Brasileiro', 150, 120.00),
        ('Volume Russo', 180, 140.00),
        ('Volume Egípcio', 150, 150.00),
        ('Volume Híbrido', 120, 170.00),
        ('Volume 5D', 100, 180.00)
    `);
    }



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