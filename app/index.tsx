import { useEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { Stack, useRouter } from "expo-router";

export default function Index() {
    const router = useRouter();

    useEffect(() => {
        const timer = setTimeout(() => {
            router.push('./agendamento/explorar'); // Navega para a tela de Explorar
        }, 2000); 

        return () => clearTimeout(timer); // Limpeza do timer
    }, [router]);

    return (
        <View style={styles.container}>
            <View>
                <Image source={require('../Images/logo.png')} style={styles.logo} />
            </View>

            <View style={styles.content}>
                <Text style={styles.mainText}>Realce sua beleza com cílios perfeitos:</Text>
                <Image source={require('../Images/Borboleta.png')} style={styles.image} />
                <Text style={styles.mainText}>Transforme o olhar, eleve sua confiança!</Text>
            </View>

            <View style={styles.footer}>
                <Text style={styles.footerText}>By Maria Fiori e Anielli</Text>
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
        justifyContent: 'center',
    },
    mainText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000000',
        textAlign: 'center',
        marginBottom: 10,
    },
    image: {
        width: 260,
        height: 100,
        marginVertical: 20,
        resizeMode: 'contain',
    },
    footer: {
        backgroundColor: '#DDA0DD',
        alignItems: 'center',
        paddingVertical: 20,
    },
    footerText: {
        fontSize: 14,
        color: '#000000',
        marginBottom: 10,
    },
});
