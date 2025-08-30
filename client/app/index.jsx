import { router } from 'expo-router'
import { Pressable, Text, StyleSheet, View } from 'react-native'

const Home = () => {
    const handleLoginPress = () => {
        router.push("/login")
    }

    const handleRegisterPress = () => {
        router.push("/register")
    }

    const handleShopPress = () => {
        router.push("/products")
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Welcome to Buyya</Text>
                <Text style={styles.subtitle}>Your favorite e-commerce destination</Text>
            </View>

            <View style={styles.buttonContainer}>
                <Pressable
                    style={({ pressed }) => [
                        styles.primaryButton,
                        pressed && styles.primaryButtonPressed
                    ]}
                    onPress={handleShopPress}
                >
                    <Text style={styles.primaryButtonText}>Start Shopping</Text>
                </Pressable>

                <View style={styles.secondaryButtonRow}>
                    <Pressable
                        style={({ pressed }) => [
                            styles.secondaryButton,
                            pressed && styles.secondaryButtonPressed
                        ]}
                        onPress={handleLoginPress}
                    >
                        <Text style={styles.secondaryButtonText}>Login</Text>
                    </Pressable>

                    <Pressable
                        style={({ pressed }) => [
                            styles.outlineButton,
                            pressed && styles.outlineButtonPressed
                        ]}
                        onPress={handleRegisterPress}
                    >
                        <Text style={styles.outlineButtonText}>Register</Text>
                    </Pressable>
                </View>
            </View>

            <View style={styles.featuresContainer}>
                <View style={styles.featureCard}>
                    <Text style={styles.featureTitle}>🛍️ Easy Shopping</Text>
                    <Text style={styles.featureText}>Browse thousands of products</Text>
                </View>
                <View style={styles.featureCard}>
                    <Text style={styles.featureTitle}>🚚 Fast Delivery</Text>
                    <Text style={styles.featureText}>Quick and reliable shipping</Text>
                </View>
            </View>
        </View>
    )
}

export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "rgb(248, 249, 250)",
        paddingHorizontal: 20,
        paddingVertical: 40,
    },
    header: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 40,
    },
    title: {
        fontSize: 32,
        fontWeight: "900",
        color: "rgb(33, 37, 41)",
        textAlign: "center",
        marginBottom: 12,
    },
    subtitle: {
        fontSize: 16,
        color: "rgb(108, 117, 125)",
        textAlign: "center",
        fontWeight: "400",
    },
    buttonContainer: {
        gap: 20,
        marginBottom: 40,
    },
    primaryButton: {
        backgroundColor: "rgb(0, 123, 255)",
        paddingVertical: 16,
        paddingHorizontal: 32,
        borderRadius: 12,
        alignItems: "center",
        shadowColor: "rgb(0, 123, 255)",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 6,
    },
    primaryButtonPressed: {
        backgroundColor: "rgb(0, 86, 179)",
        transform: [{ scale: 0.98 }],
    },
    primaryButtonText: {
        color: "rgb(255, 255, 255)",
        fontSize: 18,
        fontWeight: "600",
        letterSpacing: 0.5,
    },
    secondaryButtonRow: {
        flexDirection: "row",
        gap: 12,
    },
    secondaryButton: {
        flex: 1,
        backgroundColor: "rgb(40, 167, 69)",
        paddingVertical: 14,
        paddingHorizontal: 24,
        borderRadius: 10,
        alignItems: "center",
        shadowColor: "rgb(40, 167, 69)",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3,
    },
    secondaryButtonPressed: {
        backgroundColor: "rgb(30, 126, 52)",
        transform: [{ scale: 0.98 }],
    },
    secondaryButtonText: {
        color: "rgb(255, 255, 255)",
        fontSize: 16,
        fontWeight: "600",
    },
    outlineButton: {
        flex: 1,
        backgroundColor: "rgb(255, 255, 255)",
        borderWidth: 2,
        borderColor: "rgb(0, 123, 255)",
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 10,
        alignItems: "center",
        shadowColor: "rgb(0, 0, 0)",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    outlineButtonPressed: {
        backgroundColor: "rgb(248, 249, 250)",
        borderColor: "rgb(0, 86, 179)",
        transform: [{ scale: 0.98 }],
    },
    outlineButtonText: {
        color: "rgb(0, 123, 255)",
        fontSize: 16,
        fontWeight: "600",
    },
    featuresContainer: {
        flexDirection: "row",
        gap: 12,
        justifyContent: "space-between",
    },
    featureCard: {
        flex: 1,
        backgroundColor: "rgb(255, 255, 255)",
        padding: 20,
        borderRadius: 12,
        alignItems: "center",
        shadowColor: "rgb(0, 0, 0)",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        borderWidth: 1,
        borderColor: "rgb(233, 236, 239)",
    },
    featureTitle: {
        fontSize: 16,
        fontWeight: "700",
        color: "rgb(73, 80, 87)",
        marginBottom: 8,
        textAlign: "center",
    },
    featureText: {
        fontSize: 14,
        color: "rgb(108, 117, 125)",
        textAlign: "center",
        lineHeight: 20,
    },
})



