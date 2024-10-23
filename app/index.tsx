
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, Alert } from "react-native";


export default function Index() {

    return (
      
            <Text style={styles.titulo}>Faça login em sua conta</Text>

    );
}

const styles = StyleSheet.create({
    titulo: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
    },
});
