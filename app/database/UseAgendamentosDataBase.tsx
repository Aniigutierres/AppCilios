import { useSQLiteContext } from "expo-sqlite";

export type AgendamentoDatabase = {
    id: number;
    usuario_id: number;
    servico_id: number;
    profissional_id: number;
    data_agendamento: string;
    status: string;
    data_criacao: string;
};

export function useAgendamentoDatabase() {
    // Contexto de conexão com o banco
    const database = useSQLiteContext();

    // Função para formatar a data para o formato aceito pelo SQLite
    function formatDateToSQLite(date: Date) {
        return date.toISOString().slice(0, 19).replace("T", " ");
    }

    // Função para criar um novo agendamento
    async function create(data: Omit<AgendamentoDatabase, "id" | "data_criacao">) {
        try {
            const formattedDate = formatDateToSQLite(new Date(data.data_agendamento));
            const query = `
                INSERT INTO agendamentos 
                (data_agendamento, usuario_id, servico_id, profissional_id, status) 
                VALUES 
                ('${formattedDate}', ${data.usuario_id}, ${data.servico_id}, ${data.profissional_id}, '${data.status || "Pendente"}');`;
            
            await database.execAsync(query);
            return true;
        } catch (error) {
            console.error("Erro ao criar agendamento:", error);
            throw error;
        }
    }

    // Função para listar todos os agendamentos
    async function listar() {
        try {
            const resultado = await database.getAllAsync<AgendamentoDatabase>("SELECT * FROM agendamentos;");
            return resultado;
        } catch (error) {
            console.error("Erro ao listar agendamentos:", error);
            throw error;
        }
    }

    // Função para excluir um agendamento pelo id
    async function excluir(id: number) {
        try {
            await database.execAsync(`DELETE FROM agendamentos WHERE id = ${id};`);
            return true;
        } catch (error) {
            console.error("Erro ao excluir agendamento:", error);
            throw error;
        }
    }

    // Função para atualizar data e status de um agendamento
    async function atualizar(id: number, dataAgendamento: Date, status: string) {
        try {
            const formattedDate = formatDateToSQLite(dataAgendamento);
    
            await database.execAsync(
               ` UPDATE agendamentos SET data_agendamento = '${formattedDate}', status = '${status}' WHERE id = ${id};`
            );
            return true;
        } catch (error) {
            console.error("Erro ao atualizar agendamento:", error);
            throw error;
        }
    }

    return { create, listar, excluir, atualizar };
}