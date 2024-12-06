import { View, Text, StyleSheet, Image, TextInput, ScrollView, TouchableOpacity, Button, Linking, Alert } from "react-native";
import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { useRouter } from 'expo-router';
import MapView, { Marker } from 'react-native-maps';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UseServicosDatabase } from '../database/UseServicosDataBase'; 

export default function Agendamento() {
    const router = useRouter();
    const [dataSelecionada, setDataSelecionada] = useState(null);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [horarioSelecionado, setHorarioSelecionado] = useState("");
    const [profissionalSelecionada, setProfissionalSelecionada] = useState(null);
    const [procedimento, setProcedimento] = useState(null);

    useEffect(() => {
        const carregarProcedimento = async () => {
            const procedimentoSalvo = await AsyncStorage.getItem('procedimentoSelecionado');
            if (procedimentoSalvo) {
                const procedimento = JSON.parse(procedimentoSalvo);
                const { listar } = UseServicosDatabase(); // Usa a tabela
                const servicoDetalhado = await listar(procedimento.id); // Busca pelo ID na tabela
                if (servicoDetalhado) setProcedimento(servicoDetalhado);
            }
        };
        carregarProcedimento();
    }, []);

    const [region, setRegion] = useState({
        latitude: -22.58184,
        longitude: -48.80428, 
        latitudeDelta: 0.0042,
        longitudeDelta: 0.0041,
    });

    // Dados de disponibilidade para cada profissional
    const disponibilidade = {
        "Mayara Albuquerque": {
            datas: ["10-11-2024", "2024-11-12", "2024-11-15"],
            horarios: ["08:00", "10:00", "14:00", "16:00"]
        },
        "Laís Castro": {
            datas: ["2024-11-11", "2024-11-13", "2024-11-18"],
            horarios: ["09:00", "11:00", "15:00", "17:00"]
        }
    };

    const selecionarProfissional = (nome) => {
        setProfissionalSelecionada(profissionalSelecionada === nome ? null : nome);
        // Limpa data e horário quando uma nova profissional é selecionada
        setDataSelecionada(null);
        setHorarioSelecionado("");
    };

    const onDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || new Date();
        setShowDatePicker(false);
        setDataSelecionada(currentDate.toISOString().split('T')[0]);
    };

    const datasDisponiveis = profissionalSelecionada ? disponibilidade[profissionalSelecionada].datas : [];
    const horariosDisponiveis = profissionalSelecionada ? disponibilidade[profissionalSelecionada].horarios : [];

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View style={styles.container}>
                <Image source={require('../../Images/logo.png')} style={styles.logo} />
                {procedimento && (
                    <>
                        <Text style={styles.titulo}>Tipo de procedimento: {procedimento.title}</Text>
                        <View style={styles.processo}>
                            <View>
                                <Text style={styles.texto2}>{procedimento.nome}</Text>
                                <Text style={styles.texto2}>Duração: {procedimento.duracao}</Text>
                                <Text style={styles.texto2}>Preço: {procedimento.preco}</Text>
                            </View>
                            <Image source={procedimento.image} style={styles.volumeBrasil} />
                        </View>
                    </>
                )}

                <View style={styles.profissional}>
                    <Text style={styles.textoProfissional}>Profissional</Text>
                </View>

                {/* Seleção de Profissionais */}
                <TouchableOpacity
                    style={[styles.card, profissionalSelecionada === "Laís Castro" && { opacity: 0.3 }]}
                    onPress={() => selecionarProfissional("Mayara Albuquerque")}
                >
                    <View style={styles.cardContent}>
                        <Image source={require('../../Images/mayara.png')} style={styles.volumeBrasil} />
                        <View>
                            <Text style={styles.texto3}>Mayara Albuquerque</Text>
                            <Text style={styles.texto3}>Lash Design há 15 anos</Text>
                            <Text style={styles.texto3}>(14) 99735-6854</Text>
                            <Text style={styles.texto3}>@ma.albulash</Text>
                        </View>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.card, profissionalSelecionada === "Mayara Albuquerque" && { opacity: 0.3 }]}
                    onPress={() => selecionarProfissional("Laís Castro")}
                >
                    <View style={styles.cardContent}>
                        <Image source={require('../../Images/lais.png')} style={styles.volumeBrasil} />
                        <View>
                            <Text style={styles.texto3}>Laís Castro</Text>
                            <Text style={styles.texto3}>Lash Design há 5 anos</Text>
                            <Text style={styles.texto3}>(14) 99832-6844</Text>
                            <Text style={styles.texto3}>@lais_lash</Text>
                        </View>
                    </View>
                </TouchableOpacity>

                {/* Seletor de Data e Horário */}
                <View>
                    <Text style={styles.texto}>Data</Text>
                    <View>
                        <TouchableOpacity
                            onPress={() => setShowDatePicker(true)}
                            style={styles.dataTouchable}
                        >
                            <Text style={styles.dataText}>
                                {dataSelecionada ? dataSelecionada : 'Selecione uma data disponível'}
                            </Text>
                            <Icon name="calendar" size={20} color="#000" />
                        </TouchableOpacity>
                        {showDatePicker && (
                            <DateTimePicker
                                value={new Date()}
                                mode="date"
                                display="default"
                                onChange={(event, selectedDate) => {
                                    const selectedDateFormatted = selectedDate?.toISOString().split('T')[0];
                                    if (datasDisponiveis.includes(selectedDateFormatted)) {
                                        onDateChange(event, selectedDate);
                                    } else {
                                        Alert.alert("Data não disponível", "Por favor, selecione uma data disponível.");
                                    }
                                }}
                            />
                        )}
                    </View>

                    <Text style={styles.texto}>Horário</Text>
                    <View style={styles.horario}>
                        <Picker
                            selectedValue={horarioSelecionado}
                            style={styles.picker}
                            onValueChange={(itemValue) => setHorarioSelecionado(itemValue)}
                        >
                            <Picker.Item label="Selecione um horário disponível" value="" />
                            {horariosDisponiveis.map(horario => (
                                <Picker.Item key={horario} label={horario} value={horario} />
                            ))}
                        </Picker>
                        <Icon name="clock-o" size={20} color="#0B3B60" style={styles.iconStyle} />
                    </View>
                </View>


                <View style={styles.local}>
                    <Text style={styles.textoLocal}>Localização</Text>
                </View>

                <MapView
                    style={styles.map}
                    region={region}
                    scrollEnabled={false}
                >
                    <Marker coordinate={{ latitude: region.latitude, longitude: region.longitude }} title={"Seu Local"} />
                </MapView>

                <TouchableOpacity
                    style={styles.botaoVoltar}
                    onPress={() => router.push('../../agendamento/explorar')}
                >
                    <Text style={styles.textoVoltar}>Voltar</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={styles.button}
                    onPress={() => router.push('../agendamento/agendamentosrealizados')}
                >
                    <Text style={styles.buttonText}>Agendar</Text>
                </TouchableOpacity>

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
    map: {
        width: '90%',
        height: 200,
        marginVertical: 10,
    },
    titulo: {
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 20,
        color: '#000',
        textAlign: 'center'
    },
    logo: {
        width: '100%',
        height: 150,
        resizeMode: 'contain',
        marginBottom: 'auto'
    },
    volumeBrasil: {
        alignItems: 'flex-end',

    },
    processo: {
        margin: 30,
        flexDirection: 'row',
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
        marginRight: 80
    },
    iconStyle: {
        marginRight: 8,
    },
    texto: {
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 10,
        textAlign: 'center',
        color: '#000',

    },
    texto2: {
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 10,
        textAlign: 'justify',
        color: '#000',
    },
    textoProfissional: {
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 10,
        textAlign: 'center',
        color: '#000',
        marginTop: 20
    },
    textoLocal: {
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 10,
        textAlign: 'center',
        color: '#000',
        marginTop: 20
    },
    dataTouchable: {
        backgroundColor: '#E0BCF5',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 10,
        height: 70,
        flexDirection: 'row',
        padding: 10,
        marginBottom: 16,
        width: 350,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        elevation: 5,
    },
    dataText: {
        fontSize: 15,
        color: '#333',
        marginLeft: 10
    },
    horario: {
        backgroundColor: '#E0BCF5',
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 10,
        height: 70,
        paddingHorizontal: 10,
        marginBottom: 16,
        width: 350,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        elevation: 5,
    },
    picker: {
        flex: 1,
    },
    profissional: {
        height: 70,
        width: '80%',
        backgroundColor: '#E0BCF5',
        margin: 20,
        borderRadius: 10
    },
    local: {
        height: 70,
        width: '80%',
        backgroundColor: '#E0BCF5',
        margin: 20,
        borderRadius: 10
    },
    card: {
        
        backgroundColor: '#E0BCF5',
        borderRadius: 10,
        padding: 10,
        alignItems: 'center',
        marginVertical: 20,
        width: '85%',
        justifyContent: 'space-between',
        height: 'auto',
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
        flexDirection: 'row',
        marginTop: 5,
        
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
    },
    texto3: {
        color: '#000000',
        fontSize: 20,
        fontWeight: 'bold',
        margin:5,
        marginRight: 20,
        marginLeft: 10,
        textAlign: 'left',

    },
    button: {
        width: '80%',
        backgroundColor: '#CD03FF',
        borderRadius: 10,
        padding: 10,
        alignItems: 'center',
        height: 50,
        justifyContent: 'center',
        marginTop: 10,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: 20
    },
    buttonText: {
        color: '#000',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    buttonVoltar: {
        borderRadius: 10,
        backgroundColor: '#D0CDD0',
        fontSize: 18,
        textAlign: 'center',
        padding: 10,
        color: '#fff',
        fontWeight: 'bold',
        width: '80%',
        height: 50,
        marginTop: 10,
        marginLeft: 'auto',
        marginRight: 'auto',
    },
botaoVoltar: {
    backgroundColor: '#D0CDD0',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
    width: '80%',
    marginVertical: 10,
    alignSelf: 'center',
    },
    textoVoltar: {
        color: '#000',
        fontSize: 18,
        fontWeight: 'bold',
},
});