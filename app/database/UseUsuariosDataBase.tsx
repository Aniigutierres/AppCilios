import { useSQLiteContext } from "expo-sqlite";

export type UsuarioDatabase = {
    id: number;
    nome: string;
    email: string;
    senha: string;
    telefone: string;
};

export function useUsuariosDatabase() {
    // Contexto de conexão com o banco
    const database = useSQLiteContext();

    // Função para criar um novo usuário
    async function create(data: Omit<UsuarioDatabase, "id">) {
        try {
            const query = `INSERT INTO usuarios (nome, email, senha, telefone) 
                VALUES ('${data.nome}', '${data.email}', '${data.senha}', '${data.telefone}');`;
            const result = await database.execAsync(query);
            return result;
        } catch (error) {
            console.log(error);
        }
    }

    // Função para buscar todos os usuários
    async function getAll() {
        try {
            const query = `SELECT * FROM usuarios;`;
            const result = await database.getAllAsync<UsuarioDatabase>(query);
            return result;
        } catch (error) {
            throw error;
        }
    }

    async function buscaUsuario(id: number) {
        try {
            const query = `SELECT * FROM usuarios WHERE id = ?;`;
            const resultado = await database.getAllAsync<UsuarioDatabase>(query, [id]);
            
            if (resultado.length > 0) {
                return resultado[0]; 
            } else {
                return null;  
            }
        } catch (error) {
            console.error("Erro ao buscar usuário:", error);
            throw error;
        }
    }
    
    
    
    
    return { create, getAll, buscaUsuario };
    
}