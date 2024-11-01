import { View, Text, StyleSheet, Image, ScrollView, Alert } from "react-native";

export default function Perfil() {

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View style={styles.container}>
                <Image source={require('../../Images/perfil.png')} style={styles.img} />
                <View style={styles.card}>
                        <View style={styles.cardContent}>
               <Text style={styles.texto3}>Valentina Lima Ferrão</Text>
                <Text style={styles.texto3}>Valen.Lima343@gmail.com</Text>
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