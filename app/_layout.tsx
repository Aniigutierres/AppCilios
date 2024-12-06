import { SQLiteProvider } from "expo-sqlite";
import { inicializeDatabase } from "./database/inicializeDataBase";
import { Slot } from "expo-router";


export default function Layout(){
    return (
        
        <SQLiteProvider databaseName="AgendamentoBD.db" onInit={inicializeDatabase}>
            <Slot/>
        </SQLiteProvider>
    )

}