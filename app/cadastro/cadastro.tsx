import { View, Text, StyleSheet, Image, TextInput, ScrollView, TouchableOpacity, Alert } from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";
import { useUsuariosDatabase, UsuarioDatabase, } from "../database/UseUsuariosDataBase"; // Ajuste o caminho para onde você salvou o arquivo

export default function Cadastro() {
    const router = useRouter();
    const [usuarios, setUsuarios] = useState<UsuarioDatabase[]>([])
    const usuariosControle = useUsuariosDatabase();
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [telefone, setTelefone] = useState("");

    const handleCadastrar = () => {
        if (!nome || !email || !senha || !telefone) {
            Alert.alert("Erro", "Por favor, preencha todos os campos.");
        } 
        const usuarioNovo: Omit<UsuarioDatabase, "id"> = {
        nome: nome,
        email: email,
        senha: senha,
        telefone: telefone,

    };

    console.log(
        "Nome:", nome,
        "Email:", email,
        "Senha:", senha,
        "Telefone", telefone,
    );
    
    usuariosControle.create(usuarioNovo);
    Alert.alert("Cadastro Realizado!", "seu cadastro foi realizado com sucesso!!");
    router.push('../../login/login');
    };

   

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View style={styles.container}>
                <Image source={require('../../Images/logo.png')} style={styles.logo} />
                <View style={styles.inputContainer}>
                    <Text style={styles.titulo}>Cadastrar</Text>
                </View>

                <View style={styles.inputContainer2}>
                    <Text style={styles.texto}>Nome</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Digite seu nome completo"
                        value={nome}
                        onChangeText={setNome}
                    />
                    <Text style={styles.texto}>Email</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Insira seu endereço de email"
                        keyboardType="email-address"
                        value={email}
                        onChangeText={setEmail}
                    />
                    <Text style={styles.texto}>Crie uma Senha</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Insira sua senha"
                        secureTextEntry={true}
                        value={senha}
                        onChangeText={setSenha}
                    />
                    <Text style={styles.texto}>Telefone</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Insira seu número de telefone"
                        keyboardType="phone-pad"
                        value={telefone}
                        onChangeText={setTelefone}
                    />
                </View>

                <TouchableOpacity 
                    style={styles.buttonVoltar}
                    onPress={() => router.push('../login/login')}
                >
                    <Text style={styles.buttonText}>Voltar</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={handleCadastrar}>
                    <Text style={styles.buttonText}>Cadastrar</Text>
                </TouchableOpacity>

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
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F9DEFF',
    },
    titulo: {
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 20,
        color: '#000',
        textAlign: 'center'
    },
    inputContainer2: {
        width: '80%',
        alignItems: 'flex-start', // Alterado para 'center'
    },
    inputContainer: {
        width: '80%',
        alignItems: 'center', // Alterado para 'center'
    },
    input: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 1,
        padding: 10,
        marginBottom: 20,
        borderRadius: 10,
        width: '100%',
        backgroundColor: '#fff'
    },
    texto: {
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 10,
        textAlign: 'left',
        color: '#000',
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
    logo: {
        width: '100%', // Ajuste conforme o tamanho do seu logotipo
        height: 150, // Ajuste conforme o tamanho do seu logotipo
        resizeMode: 'contain',
        marginBottom: 'auto'
    },
    footer: {
        backgroundColor: '#DDA0DD',
        alignItems: 'center',
        paddingVertical: 20,
        width: '100%',
        marginTop: 50
    },
    footerText: {
        fontSize: 14,
        color: '#000',
    },
});