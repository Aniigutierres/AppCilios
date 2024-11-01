import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function Index() {
    const router = useRouter();
    
    // Estado para o texto do filtro e para a lista de volumes
    const [filterText, setFilterText] = useState('');
    const [volumes] = useState([
        { id: 1, title: 'Volume Brasileiro', image: require('../../Images/brasileiro.png'), rating: 5 },
        { id: 2, title: 'Volume Russo', image: require('../../Images/russo.png'), rating: 3 },
        { id: 3, title: 'Volume Egípcio', image: require('../../Images/egipcio.png'), rating: 1 },
        { id: 4, title: 'Volume Híbrido', image: require('../../Images/hibrido.png'), rating: 2 },
        { id: 5, title: 'Volume 5D', image: require('../../Images/5D.png'), rating: 1 },
    ]);

    // Filtra a lista de volumes com base no texto do filtro
    const filteredVolumes = volumes.filter(volume =>
        volume.title.toLowerCase().includes(filterText.toLowerCase())
    );

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
                        onChangeText={setFilterText} // Atualiza o texto do filtro
                    />
                </View>

                {/* Renderiza os volumes filtrados */}
                <ScrollView>
                    {filteredVolumes.map(volume => (
                        <View key={volume.id} style={styles.card}>
                            <Image source={volume.image} style={styles.cardImage} />
                            <View style={styles.cardContent}>
                                <Text style={styles.cardTitle}>{volume.title}</Text>
                                <View style={styles.stars}>
                                    {[...Array(5)].map((_, i) => (
                                        <FontAwesome key={i} name="star" size={24} color={i < volume.rating ? 'black' : 'white'} />
                                    ))}
                                </View>
                                <TouchableOpacity
                                    style={styles.scheduleButton}
                                    onPress={() => router.push('../login/login')}
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
