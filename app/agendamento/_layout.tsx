import { Tabs } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import { StyleSheet } from "react-native";

export default function Layout() {
    return (
        <Tabs screenOptions={{
            tabBarStyle: styles.tabBar,
        }}>
            <Tabs.Screen 
                name='explorar' 
                options={{
                    title: '', // Nome do ícone vazio
                    headerShown: false,
                    tabBarIcon: ({ focused, size, color }) => {
                        return <FontAwesome name="search" size={32} color='black' />;
                    }
                }} 
            />
            <Tabs.Screen 
                name='agendamentosrealizados' 
                options={{
                    title: '', // Nome do ícone vazio
                    headerShown: false,
                    tabBarIcon: ({ focused, size, color }) => {
                        return <FontAwesome name="calendar" size={30} color='black' />;
                    }
                }} 
            />
            <Tabs.Screen 
                name='perfil' 
                options={{
                    title: '', // Nome do ícone vazio
                    headerShown: false,
                    tabBarIcon: ({ focused, size, color }) => {
                        return <FontAwesome name="user" size={32} color='black' />;
                    }
                }} 
            />
        </Tabs>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "FFFFFF"
    },
    tabBar: {
        backgroundColor: '#D99DEB',
        height: 70,
    },
});