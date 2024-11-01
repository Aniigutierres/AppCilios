import { useSQLiteContext } from "expo-sqlite";

export type ProfissionaisDatabase = {
    id: number;
    nome: string;
    especialidade: string;
    telefone: string;
    email: string;
    data_contratacao: string;
};


export function useProfissionaisDatabase() {
    // Contexto de conexão com o banco
    const database = useSQLiteContext();

    // Função para criar um novo usuário
    async function create(data: Omit<ProfissionaisDatabase, "id">) {
        try {
            const query = `INSERT INTO usuarios (nome, especialidade, telefone, email, data_contratacao) 
                VALUES ('${data.nome}', '${data.especialidade}', '${data.telefone}', '${data.email}', '${data.data_contratacao}');`;
            const result = await database.execAsync(query);
            return result;
        } catch (error) {
            console.log(error);
        }
    }
    async function buscaProfissionais(especialidade: string){
        try {
            const query = "SELECT * FROM profissionais WHERE nome LIKE ? "
            const resultado = await database.getAllAsync<ProfissionaisDatabase>(query, `%${especialidade}%`)
            return resultado
        }catch(error){
            throw error
        }
    }

    return { create, buscaProfissionais };
}