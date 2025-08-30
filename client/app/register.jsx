import { StyleSheet, Text, View, TextInput, KeyboardAvoidingView, Platform, Pressable, Alert, ScrollView } from 'react-native';
import { router } from 'expo-router';
import React, { useState } from 'react'

const register = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: ''
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

        if (!formData.fullName.trim()) {
            newErrors.fullName = 'Full name is required'
        }

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

        if (!formData.confirmPassword.trim()) {
            newErrors.confirmPassword = 'Please confirm your password'
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match'
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleRegister = async () => {
        if (!validateForm()) return

        setIsLoading(true)

        try {
            //register logic
        } catch (error) {
            Alert.alert('Error', 'Registration failed. Please try again.')
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
                    <Text style={styles.title}>Create Account</Text>
                    <Text style={styles.subtitle}>Join Buyya today</Text>

                    <View style={styles.form}>
                        <View style={styles.inputs}>
                            <Text style={styles.label}>Full Name</Text>
                            <TextInput
                                style={[styles.input, errors.fullName && styles.inputError]}
                                placeholder="Enter your full name"
                                value={formData.fullName}
                                onChangeText={(value) => handleInputChange('fullName', value)}
                                autoCapitalize="words"
                                placeholderTextColor="rgb(150, 150, 150)"
                            />
                            {errors.fullName && <Text style={styles.errorText}>{errors.fullName}</Text>}
                        </View>

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
                                placeholder="Create a password"
                                value={formData.password}
                                onChangeText={(value) => handleInputChange('password', value)}
                                secureTextEntry={true}
                                placeholderTextColor="rgb(150, 150, 150)"
                            />
                            {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
                        </View>

                        <View style={styles.inputs}>
                            <Text style={styles.label}>Confirm Password</Text>
                            <TextInput
                                style={[styles.input, errors.confirmPassword && styles.inputError]}
                                placeholder="Confirm your password"
                                value={formData.confirmPassword}
                                onChangeText={(value) => handleInputChange('confirmPassword', value)}
                                secureTextEntry={true}
                                placeholderTextColor="rgb(150, 150, 150)"
                            />
                            {errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword}</Text>}
                        </View>
                    </View>

                    <Pressable
                        style={({ pressed }) => [
                            styles.submit,
                            pressed && styles.submitPressed,
                            isLoading && styles.submitDisabled
                        ]}
                        onPress={handleRegister}
                        disabled={isLoading}
                    >
                        <Text style={styles.submitText}>
                            {isLoading ? 'Creating Account...' : 'Create Account'}
                        </Text>
                    </Pressable>

                    <Pressable
                        style={styles.loginLink}
                        onPress={() => router.push('/login')}
                    >
                        <Text style={styles.linkText}>
                            Already have an account? Sign in
                        </Text>
                    </Pressable>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

export default register

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
        backgroundColor: "rgb(40, 167, 69)",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 12,
        marginTop: 30,
        shadowColor: "rgb(40, 167, 69)",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 6,
    },
    submitPressed: {
        backgroundColor: "rgb(30, 126, 52)",
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
    loginLink: {
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