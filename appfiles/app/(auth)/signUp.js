// app/(auth)/signup.js
import { View, Alert, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { useState } from 'react';
import * as SQLite from 'expo-sqlite';
import CryptoJS from 'crypto-js';

function SignUpPage() {
    // const router = useRouter(); // Uncomment if using router for navigation after signup

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isProcessing, setIsProcessing] = useState(false); // To prevent multiple submissions

    const handleSignUp = (async () => {
        setIsProcessing(true); // Disable button during processing

        if (!username || !password || !confirmPassword) {
            Alert.alert("Missing Fields", "Please fill in all fields.");
            setIsProcessing(false);
            return;
        }

        if (password !== confirmPassword) {
            Alert.alert("Password Mismatch", "Passwords do not match. Please try again.");
            setIsProcessing(false);
            return;
        }

        const db = await SQLite.openDatabaseAsync('master.db');
        console.log(db);
        // setIsProcessing(false); 
        try {
            await db.runAsync("CREATE TABLE IF NOT EXISTS masterPass(username text PRIMARY KEY, hashedPass, salt TEXT);");
        }
        catch (error) {
            console.error("Error creating table:", error);
            Alert.alert("Database Error", "Failed to create or access the database.");
            setIsProcessing(false);
            return;
        }
        // await db.runAsync("delete from masterPass;");
        const usernames = await db.getAllAsync("SELECT * FROM masterPass where username=(? );", [username]);
        if (usernames.length > 0) {
            console.log("empty");
            Alert.alert("Sorry", "The username is already taken, try a different one");
        }
        else {
            const salt = Math.random().toString(36).substring(2, 15);
            const hashedPass = CryptoJS.SHA256(salt + password).toString(CryptoJS.enc.Hex);
            try {
                await db.runAsync(
                    "INSERT INTO masterPass (username, hashedPass, salt) VALUES (?, ?, ?);",
                    [username, hashedPass, salt]
                );
                console.log(`User '${username}' inserted successfully.`);
            } catch (error) {
                console.error(`Error inserting user '${username}':`, error);
            }
        }
        const tableValues = await db.getAllSync("Select * from masterPass");
        console.log(tableValues);
        await db.closeAsync();
        setIsProcessing(false);
    });

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.keyboardAvoidingView}
        >
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <View style={styles.container}>
                    <View style={styles.signUpBox}>
                        <Text style={styles.title}>Sign Up</Text>
                        <TextInput
                            onChangeText={setUsername}
                            value={username}
                            style={styles.input}
                            placeholder='Username'
                            placeholderTextColor="rgba(0,0,0,0.5)" // Adjusted for light background
                        />
                        <TextInput
                            onChangeText={setPassword}
                            value={password}
                            style={styles.input}
                            placeholder='Master Password'
                            placeholderTextColor="rgba(0,0,0,0.5)"
                            secureTextEntry={true}
                        />
                        <TextInput
                            onChangeText={setConfirmPassword}
                            value={confirmPassword}
                            style={styles.input}
                            placeholder='Confirm Master Password'
                            placeholderTextColor="rgba(0,0,0,0.5)"
                            secureTextEntry={true}
                        />
                        <TouchableOpacity
                            onPress={handleSignUp}
                            style={styles.signUpButton}
                            disabled={isProcessing} // Disable button while processing
                        >
                            <Text style={styles.buttonText}>
                                {isProcessing ? "Processing..." : "Sign Up"}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    keyboardAvoidingView: {
        flex: 1,
    },
    scrollViewContent: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        flex: 1,
        backgroundColor: "rgb(0, 139, 253)", // Your blue background
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        padding: 20,
    },
    signUpBox: {
        backgroundColor: "white",
        width: '80%',
        maxWidth: 400, // Max width for larger screens
        // height: '50%', // Removed fixed height to let content define height
        display: 'flex', // Redundant, View is flex by default
        flexDirection: 'column',
        justifyContent: 'flex-start', // Corrected from 'top'
        alignItems: 'center',
        borderRadius: 15,
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        borderColor: 'rgba(0, 0, 0,0.2)',
        borderWidth: 1,
        borderRadius: 10,
        width: '100%',
        marginTop: 15,
        backgroundColor: 'rgba(0,0,0,0.1)',
        padding: 10,
        color: '#333', // Ensure input text is visible on white background
        fontSize: 16,
    },
    signUpButton: {
        backgroundColor: 'rgb(74, 13, 102)',
        width: '60%',
        padding: 15,
        borderRadius: 10,
        marginTop: 20,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 16,
    },
});

export default SignUpPage;
