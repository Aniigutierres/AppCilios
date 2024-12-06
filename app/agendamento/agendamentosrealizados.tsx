import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from "react-native";
import { useRouter } from 'expo-router'; // Importando useRouter

export default function Perfil() {
    const router = useRouter(); // Inicializando o router

    // Estado para armazenar agendamentos ativos e passados
    const [activeAppointments, setActiveAppointments] = useState([
        { id: 1, title: 'Volume Brasileiro', time: '10h30', date: '10/12/2024', image: require('../../Images/brasileiro.png') },
        { id: 2, title: 'Volume Brasileiro', time: '10h30', date: '10/12/2024', image: require('../../Images/brasileiro.png') }
    ]);

    const [pastAppointments, setPastAppointments] = useState([
        { id: 3, title: 'Volume Brasileiro', time: '10h30', date: '10/12/2024', image: require('../../Images/brasileiro.png') },
        { id: 4, title: 'Volume Brasileiro', time: '10h30', date: '10/12/2024', image: require('../../Images/brasileiro.png') }
    ]);

    // Função para cancelar o agendamento
    const handleCancel = (id) => {
        setActiveAppointments(prevAppointments =>
            prevAppointments.filter(appointment => appointment.id !== id)
        );
    };

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View style={styles.container}>
                {/* Logo ajustado para ficar bem no topo */}
                <Image source={require('../../Images/logo.png')} style={styles.logo} />
                
                <Text style={styles.titulo}>Agendamentos Ativos:</Text>
                
                {/* Verifica se há agendamentos ativos */}
                {activeAppointments.length > 0 ? (
                    activeAppointments.map(appointment => (
                        <View key={appointment.id} style={styles.card}>
                            <View style={styles.cardContent}>
                                <Image source={appointment.image} style={styles.volumeBrasil} />
                                <View>
                                    <Text style={styles.texto3}>{appointment.title}</Text>
                                    <Text style={styles.texto3}>Horário: {appointment.time}</Text>
                                    <Text style={styles.texto3}>Data: {appointment.date}</Text>
                                </View>
                            </View>
                            <TouchableOpacity
                                style={styles.cancelButton}
                                onPress={() => handleCancel(appointment.id)}
                            >
                                <Text style={styles.cancelButtonText}>Cancelar</Text>
                            </TouchableOpacity>
                        </View>
                    ))
                ) : (
                    <Text style={styles.semAgendamento}>Nenhum agendamento no momento</Text>
                )}

                <Text style={styles.titulo}>Agendamentos Passados:</Text>
                {pastAppointments.map(appointment => (
                    <View key={appointment.id} style={styles.card}>
                        <View style={styles.cardContent}>
                            <Image source={appointment.image} style={styles.volumeBrasil} />
                            <View>
                                <Text style={styles.texto3}>{appointment.title}</Text>
                                <Text style={styles.texto3}>Horário: {appointment.time}</Text>
                                <Text style={styles.texto3}>Data: {appointment.date}</Text>
                            </View>
                        </View>
                        {/* Botão "Agendar Novamente" */}
                        <TouchableOpacity
                            style={styles.reAgendarButton}
                            onPress={() => router.push('../../agendar/agendamento')}
                        >
                            <Text style={styles.reAgendarButtonText}>Agendar Novamente</Text>
                        </TouchableOpacity>
                    </View>
                ))}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#F9DEFF',
        // Remover o paddingTop para o logo ficar bem no topo
    },
    titulo: {
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 20,
        color: '#000',
        textAlign: 'center'
    },
    volumeBrasil: {
        alignItems: 'flex-end',
    },
    card: {
        backgroundColor: '#E0BCF5',
        borderRadius: 10,
        padding: 10,
        alignItems: 'center',
        marginVertical: 20,
        width: '80%',
        justifyContent: 'space-between',
        height: 'auto',
    },
    cardContent: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    texto3: {
        color: '#000000',
        fontSize: 20,
        fontWeight: 'bold',
        margin: 5,
        textAlign: 'left',
    },
    logo: {
        width: '100%', 
        height: 140,    
       
    },
    cancelButton: {
        backgroundColor: '#CD03FF',
        borderRadius: 5,
        paddingVertical: 8,
        paddingHorizontal: 16,
        marginTop: 10,
        alignItems: 'center'
    },
    cancelButtonText: {
        color: '#000',
        fontWeight: 'bold',
        fontSize: 16,
    },
    semAgendamento: {
        color: '#555',
        fontSize: 18,
        fontStyle: 'italic',
        marginTop: 10,
    },
    reAgendarButton: {
        backgroundColor: '#CD03FF',
        borderRadius: 5,
        padding: 10,
    },
    reAgendarButtonText: {
        color: '#000',
        fontWeight: 'bold',
    },
});