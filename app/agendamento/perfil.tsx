import { View, Text, StyleSheet, Image, ScrollView, Alert } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useUsuariosDatabase, UsuarioDatabase } from "../database/UseUsuariosDataBase";
import { useEffect, useState } from "react";

export default function Perfil() {
    const [usuario, setUsuario] = useState<UsuarioDatabase | null>(null);
    const usuariosControle = useUsuariosDatabase();

    useEffect(() => {
        async function carregarUsuarioLogado() {
            try {
                const idUsuarioLogado = await AsyncStorage.getItem('usuarioLogadoId'); // Recupera o ID do AsyncStorage
                if (idUsuarioLogado) {
                    const resultado = await usuariosControle.buscaUsuario(parseInt(idUsuarioLogado)); // Usa o ID recuperado

                    if (resultado) {
                        setUsuario(resultado); // Armazena as informações do usuário encontrado
                    } else {
                        console.log("Usuário não encontrado.");
                    }
                } else {
                    console.log("Nenhum usuário logado.");
                }
            } catch (error) {
                console.error("Erro ao carregar usuário logado:", error);
                Alert.alert("Erro", "Não foi possível carregar as informações do usuário.");
            }
        }

        carregarUsuarioLogado();
    }, []);

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View style={styles.container}>
                <Image source={require('../../Images/perfil.png')} style={styles.img} />
                <View style={styles.card}>
                    <View style={styles.cardContent}>
                        {usuario ? (
                            <>
                                <Text style={styles.texto3}>{usuario.nome}</Text>
                                <Text style={styles.texto3}>{usuario.email}</Text>
                            </>
                        ) : (
                            <Text>Carregando informações do usuário...</Text>
                        )}
                    </View>
                </View>
                <Image source={require('../../Images/Borboleta.png')} style={styles.img} />
            </View>
        </ScrollView>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F9DEFF',
    },
    img: {
        alignSelf: 'center',
        width: 150,
        height: 150,
        margin: 20
    },
    texto: {
        color: '#339CFF',
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 50
    },
    texto3: {
        color: '#000000',
        fontSize: 20,
        fontWeight: 'bold',
        margin: 5
    },
    card: {
        flexDirection: 'row',
        backgroundColor: '#E0BCF5',
        borderRadius: 10,
        padding: 10,
        alignItems: 'center',
        marginVertical: 20,
        width: '75%',
        justifyContent: 'space-between',
        height:100,
    },
    cardImage: {
        width: 80,
        height: 80,
        borderRadius: 40,
        resizeMode: 'cover',
    },
    cardContent: {
        flex: 1,
        marginLeft: 20,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 10,
    },

});