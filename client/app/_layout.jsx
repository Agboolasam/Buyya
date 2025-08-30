import { StyleSheet, Text, View } from 'react-native'
import { Stack } from "expo-router";



const RootLayout = () => {
    return (

        <Stack screenOptions={{ headerShown: true }} >
            <Stack.Screen name='index' options={{ headerShown: false }} />
            <Stack.Screen name='login' options={{ headerShown: false }} />
            <Stack.Screen name='register' options={{ headerShown: false }} />


        </Stack>


    )
}

export default RootLayout

const styles = StyleSheet.create({})