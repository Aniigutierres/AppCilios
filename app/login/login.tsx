import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, Alert, ScrollView } from "react-native";
import { Link, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { useUsuariosDatabase, UsuarioDatabase } from "../database/UseUsuariosDataBase";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Index() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [listaUsuario, setListaUsuario] = useState<UsuarioDatabase[]>([]);

    const { getAll } = useUsuariosDatabase();

    useEffect(() => {
        const loadUsers = async () => {
            try {
                const usuarios = await getAll();
                setListaUsuario(usuarios);
            } catch (error) {
                Alert.alert("Erro", "Falha ao carregar usuários.");
            }
        };
        loadUsers();
    }, [getAll]);

    const handleLogin = async () => {
        console.log('Email:', email);
        console.log('Password:', senha);
        console.log(listaUsuario);

        if (!email || !senha) {
            Alert.alert("Erro", "Por favor, preencha todos os campos.");
        }  
        
        const usuarioEncontrado = listaUsuario.find(usuario => usuario.email === email && usuario.senha === senha);

        if (usuarioEncontrado) {
            try {
                await AsyncStorage.setItem('usuarioLogadoId', usuarioEncontrado.id.toString());
                router.push('../../agendar/agendamento');
            } catch (error) {
                Alert.alert("Erro", "Falha ao armazenar informações do usuário.");
            }
        }
        
        else {
            Alert.alert("Erro", "Email ou senha incorretos!");
            
        }
    };

    

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View style={styles.container}>
                <Image source={require('../../Images/logo.png')} style={styles.logo} />
                <Text style={styles.titulo}>Login</Text>

                <View style={styles.inputContainer}>
                    <Text style={styles.texto}>Email</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Insira seu endereço de email"
                        keyboardType="email-address"
                        value={email}
                        onChangeText={setEmail}
                    />
                    <Text style={styles.texto}>Senha</Text>
                    <View style={styles.passwordContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="Insira sua senha"
                            secureTextEntry={true}
                            value={senha}
                            onChangeText={setSenha}
                        />
                    </View>
                </View>

                <TouchableOpacity 
                    style={styles.botaoEntrar}
                    onPress={handleLogin}
                >
                    <Text style={styles.textoEntrar}>Entrar</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => Alert.alert('Recuperação de Senha', 'Instruções para recuperar a senha foram enviadas para o seu email.')}>
                    <Text style={styles.forgotPasswordText}>Esqueci minha senha?</Text>
                </TouchableOpacity>

                <View style={styles.signUpContainer}>
                    <Text style={styles.signUpText}>Ainda não tem conta? </Text>
                    <Link href="/cadastro/cadastro" style={styles.signUpLink}>Faça seu cadastro!</Link>
                </View>

                <View style={styles.footer}>
                    <Text style={styles.footerText}>by Maria Fiori e Anielli</Text>
                </View>
            </View>
        </ScrollView>
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
        justifyContent: 'center',
    },
    titulo: {
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 20,
        color: '#000',
        textAlign: 'center',
    },
    inputContainer: {
        width: '90%',
        marginBottom: 20,
        alignSelf: 'center',
    },
    input: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
        backgroundColor: '#fff',
        width: '100%',
        marginBottom: 20,
    },
    texto: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 10,
    },
    botaoEntrar: {
        backgroundColor: '#CD03FF',
        borderRadius: 10,
        paddingVertical: 15,
        alignItems: 'center',
        width: '80%',
        marginVertical: 10,
        alignSelf: 'center',
    },
    textoEntrar: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
    forgotPasswordText: {
        fontSize: 16,
        color: '#000',
        fontWeight: 'bold',
        borderBottomWidth: 1,
        borderBottomColor: '#0B3B60',
        paddingBottom: 2,
        alignSelf: 'center',
        marginVertical: 20,
    },
    signUpContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 30,
    },
    signUpText: {
        fontSize: 16,
        color: '#808080',
    },
    signUpLink: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#CD03FF',
    },
    footer: {
        backgroundColor: '#DDA0DD',
        alignItems: 'center',
        paddingVertical: 20,
    },
    footerText: {
        fontSize: 14,
        color: '#000',
        marginBottom: 10,
    },
    passwordContainer: {
        width: '100%',
        marginBottom: 20,
        alignSelf: 'center',
    },
});