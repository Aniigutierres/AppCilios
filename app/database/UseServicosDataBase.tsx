import { useSQLiteContext } from "expo-sqlite";

export type ServicosDatabase = {
    id: number;
    nome: string;
    duracao: string;
    preco: string;
};


export function UseServicosDatabase() {
    // Contexto de conexão com o banco
    const database = useSQLiteContext();    

    // Função para criar um novo usuário
    async function create(data: Omit<ServicosDatabase, "id">) {
        try {
            const query = `INSERT INTO servico (nome, duracao, preco) 
                VALUES ('${data.nome}', '${data.duracao}', '${data.preco}');`;
            const result = await database.execAsync(query);
            return result;
        } catch (error) {
            console.log(error);
        }
    }

    async function listar(id: number | null = null): Promise<{ id: number, nome: string, preco: number }[]> {
        try {
            const query = id 
                ? `SELECT * FROM servico WHERE id = ${id};` 
                : `SELECT * FROM servico;`;
            
            const resultado = await database.getAllAsync(query);
    
            console.log("Resultado bruto da consulta:", resultado); // Para depuração
    
            if (Array.isArray(resultado)) {
                return resultado as { id: number, nome: string, preco: number }[];
            } else {
                console.warn("O resultado não é um array:", resultado);
                return [];
            }
        } catch (error) {
            console.error("Erro ao listar os serviços:", error);
            throw error;
        }
    }
    


    async function excluir(id: number) {
        try {
            await database.execAsync(`DELETE FROM servico WHERE id = ${id};`);
            return true;
        } catch (error) {
            console.error("Erro ao excluir o serviço:", error);
            throw error;
        }
    }

    

    return { create, listar, excluir };
}