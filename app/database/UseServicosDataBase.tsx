import { useSQLiteContext } from "expo-sqlite";

export type ServicosDatabase = {
    id: number;
    nome: string;
    descricao: string;
    duracao: string;
    preco: string;
};


export function useProfissionaisDatabase() {
    // Contexto de conexão com o banco
    const database = useSQLiteContext();

    // Função para criar um novo usuário
    async function create(data: Omit<ServicosDatabase, "id">) {
        try {
            const query = `INSERT INTO servico (nome, descricao, duracao, preco) 
                VALUES ('${data.nome}', '${data.descricao}', '${data.duracao}', '${data.preco}');`;
            const result = await database.execAsync(query);
            return result;
        } catch (error) {
            console.log(error);
        }
    }
    async function listar() {
        try {
            const resultado = await database.getAllAsync<ServicosDatabase>("SELECT * FROM servico;");
            return resultado;
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