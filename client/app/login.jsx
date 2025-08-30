import { StyleSheet, Text, View, TextInput, KeyboardAvoidingView, Platform, Pressable, Alert, ScrollView } from 'react-native';
import { router } from 'expo-router';
import React, { useState } from 'react'

const login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })
    const [errors, setErrors] = useState({})
    const [isLoading, setIsLoading] = useState(false)

    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }))
        if (errors[field]) {
            setErrors(prev => ({
                ...prev,
                [field]: null
            }))
        }
    }

    const validateForm = () => {
        const newErrors = {}

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required'
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email'
        }

        if (!formData.password.trim()) {
            newErrors.password = 'Password is required'
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters'
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleLogin = async () => {
        if (!validateForm()) return

        setIsLoading(true)

        try {
            //login logic
        } catch (error) {
            Alert.alert('Error', 'Login failed. Please try again.')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
        >
            <ScrollView
                contentContainerStyle={styles.scrollContainer}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
                bounces={false}
            >
                <View style={styles.content}>
                    <Text style={styles.title}>Welcome Back</Text>
                    <Text style={styles.subtitle}>Sign in to your Buyya account</Text>

                    <View style={styles.form}>
                        <View style={styles.inputs}>
                            <Text style={styles.label}>Email</Text>
                            <TextInput
                                style={[styles.input, errors.email && styles.inputError]}
                                placeholder="Enter your email"
                                value={formData.email}
                                onChangeText={(value) => handleInputChange('email', value)}
                                keyboardType="email-address"
                                autoCapitalize="none"
                                autoCorrect={false}
                                placeholderTextColor="rgb(150, 150, 150)"
                            />
                            {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
                        </View>

                        <View style={styles.inputs}>
                            <Text style={styles.label}>Password</Text>
                            <TextInput
                                style={[styles.input, errors.password && styles.inputError]}
                                placeholder="Enter your password"
                                value={formData.password}
                                onChangeText={(value) => handleInputChange('password', value)}
                                secureTextEntry={true}
                                placeholderTextColor="rgb(150, 150, 150)"
                            />
                            {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
                        </View>
                    </View>

                    <Pressable
                        style={({ pressed }) => [
                            styles.submit,
                            pressed && styles.submitPressed,
                            isLoading && styles.submitDisabled
                        ]}
                        onPress={handleLogin}
                        disabled={isLoading}
                    >
                        <Text style={styles.submitText}>
                            {isLoading ? 'Signing in...' : 'Sign In'}
                        </Text>
                    </Pressable>

                    <Pressable
                        style={styles.registerLink}
                        onPress={() => router.push('/register')}
                    >
                        <Text style={styles.linkText}>
                            Don't have an account? Register
                        </Text>
                    </Pressable>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

export default login

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "rgb(248, 249, 250)",
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: "center",
        paddingVertical: 20,
    },
    content: {
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        minHeight: '100%',
    },
    title: {
        fontSize: 28,
        fontWeight: "900",
        color: "rgb(33, 37, 41)",
        marginBottom: 8,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        color: "rgb(108, 117, 125)",
        marginBottom: 40,
        textAlign: 'center',
    },
    form: {
        width: "100%",
        maxWidth: 320,
    },
    inputs: {
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: "600",
        marginBottom: 8,
        color: "rgb(33, 37, 41)",
    },
    input: {
        backgroundColor: "rgb(255, 255, 255)",
        height: 50,
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "rgb(206, 212, 218)",
        fontSize: 16,
        color: "rgb(33, 37, 41)",
        shadowColor: "rgb(0, 0, 0)",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    inputError: {
        borderColor: "rgb(220, 53, 69)",
    },
    errorText: {
        color: "rgb(220, 53, 69)",
        fontSize: 14,
        marginTop: 4,
        marginLeft: 4,
    },
    submit: {
        height: 50,
        width: "100%",
        maxWidth: 320,
        backgroundColor: "rgb(0, 123, 255)",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 12,
        marginTop: 30,
        shadowColor: "rgb(0, 123, 255)",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 6,
    },
    submitPressed: {
        backgroundColor: "rgb(0, 86, 179)",
        transform: [{ scale: 0.98 }],
    },
    submitDisabled: {
        backgroundColor: "rgb(204, 204, 204)",
        shadowOpacity: 0,
        elevation: 0,
    },
    submitText: {
        fontSize: 18,
        color: "white",
        fontWeight: "600",
    },
    registerLink: {
        marginTop: 24,
        paddingVertical: 12,
        alignItems: 'center',
    },
    linkText: {
        color: "rgb(0, 123, 255)",
        fontSize: 16,
        fontWeight: "500",
    }
})