import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UseServicosDatabase } from '../database/UseServicosDataBase'; // Importe o hook do banco de dados

export default function Index() {
    const router = useRouter();
    const { listar } = UseServicosDatabase(); 
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [filterText, setFilterText] = useState('');
    const [servicos, setServicos] = useState([]);

    // Carrega a lista de serviços da tabela ao montar o componente
    useEffect(() => {
        async function fetchServicos() {
            try {
                const resultado = await listar();
                console.log(resultado);
                setServicos(resultado); // Atualiza o estado com os dados da tabela
            } catch (error) {
                console.error("Erro ao buscar serviços:", error);
            }
        }
        fetchServicos();
    }, []);

    const filteredServicos = servicos.filter(servico =>
        servico.nome.toLowerCase().includes(filterText.toLowerCase())
    );

    const handleAgendarPress = async (servico) => {
        try {
            // Armazena o serviço selecionado
            await AsyncStorage.setItem('procedimentoSelecionado', JSON.stringify(servico));

            const token = await AsyncStorage.getItem('userToken');
            
            if (token) {
                // Se o token estiver presente, redireciona para a tela de agendamento
                router.push('../../agendar/agendamento');
            } else {
                // Se não houver token, redireciona para a tela de login
                router.push('../login/login');
            }
        } catch (error) {
            console.error("Erro ao agendar o serviço:", error);
        }
    };

    // Efeito para verificar o status de login quando o componente for montado
    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                const token = await AsyncStorage.getItem('userToken');
                setIsLoggedIn(!!token); // Atualiza o estado com base na presença do token
            } catch (error) {
                console.error("Erro ao verificar o status de login:", error);
            }
        };

        checkLoginStatus();
    }, []);

    // Redirecionamento automático se o usuário estiver logado
    useEffect(() => {
        if (isLoggedIn) {
            // Se o usuário estiver logado, redireciona para a tela de agendamento
            router.push('../../agendar/agendamento');
        }
    }, []);

    // Mapeamento de imagens dos serviços
    const serviceImages = {
        "Volume Brasileiro": require('../../Images/brasileiro.png'),
        "Volume Russo": require('../../Images/russo.png'),
        "Volume Egípcio": require('../../Images/egipcio.png'),
        "Volume Híbrido": require('../../Images/hibrido.png'),
        "Volume 5D": require('../../Images/5D.png'),
        // Adicione mais serviços e suas imagens aqui
    };

    return (
        <View style={styles.container}>
            <Image source={require('../../Images/logo.png')} style={styles.logo} />

            <View style={styles.content}>
                <View style={styles.textWithImage}>
                    <Text style={styles.mainText}>Olá, Agende seu horário</Text>
                    <Image source={require('../../Images/Borboleta.png')} style={styles.image} />
                </View>
                <View style={styles.inputContainer}>
                    <Ionicons name="search" size={24} color="black" style={styles.icon} />
                    <TextInput
                        style={styles.input}
                        placeholder="Filtrar"
                        value={filterText}
                        onChangeText={setFilterText}
                    />
                </View>

                <ScrollView>
                    {filteredServicos.map(servico => (
                        <View key={servico.id} style={styles.card}>
                             <Image 
                                source={serviceImages[servico.nome]} 
                                style={styles.cardImage} 
                            /> 
                            <View style={styles.cardContent}>
                                <Text style={styles.cardTitle}>{servico.nome}</Text>
                                <View style={styles.stars}>
                                    {[...Array(5)].map((_, i) => (
                                        <FontAwesome key={i} name="star" size={24} color={i < servico.duracao ? 'black' : 'white'} />
                                    ))}
                                </View>

                                <TouchableOpacity
                                    style={styles.scheduleButton}
                                    onPress={() => handleAgendarPress(servico)}
                                >
                                    <Text style={styles.buttonText}>Agendar</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    ))}
                </ScrollView>
            </View>
        </View>
    );
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9DEFF',
        justifyContent: 'space-between',
    },
    logo: {
        alignItems: 'center',
        paddingVertical: 20,
    },
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: 20,
    },
    textWithImage: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    mainText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000000',
        textAlign: 'center',
        marginBottom: 10,
        marginRight: 40,
    },
    footer: {
        flexDirection: 'row', // Exibe os ícones em linha
        justifyContent: 'space-between', // Distribui os ícones entre o canto esquerdo, o centro e o canto direito
        backgroundColor: '#DDA0DD',
        paddingHorizontal: 30, // Adiciona espaçamento nas laterais
        paddingVertical: 20,
    },
    footerText: {
        fontSize: 14,
        color: '#000000',
        marginBottom: 10,
    },
    image: {
        width: 100,
        height: 100,
        resizeMode: 'contain',
    },
    inputContainer: {
        width: '80%',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 10,
        paddingLeft: 10,
        margin: 20,
    },
    icon: {
        color: '#000000'
    },
    input: {
        flex: 1,
        height: 50,
        paddingHorizontal: 10,
    },
    card: {
        flexDirection: 'row',
        backgroundColor: '#E0BCF5',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
        marginVertical: 20,
        width: '90%',
        justifyContent: 'space-between',
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
    stars: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    scheduleButton: {
        backgroundColor: '#CD03FF',
        paddingVertical: 5,
        width: 120,
        borderRadius: 5,
        alignItems: 'center',
        marginLeft: 'auto',
    },
    buttonText: {
        color: '#000',
        fontWeight: 'bold',
        fontSize: 16,
    },
});