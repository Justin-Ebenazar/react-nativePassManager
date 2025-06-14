import { View, TouchableOpacity, Text, TextInput, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { Link } from 'expo-router';
import { useState } from 'react';
import * as SQLite from 'expo-sqlite';
import CryptoJS from 'crypto-js';
import { useRouter } from 'expo-router';

function Login() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (async () => {
        const db = await SQLite.openDatabaseAsync('master.db');
        const matchingUser= await db.getAllAsync("select * from masterPass where username= (?)", [username]);
        console.log(123);
        if(matchingUser.length === 0) {
            Alert.alert("User not found", "Please check your username and try again.");
            return;
        }
        // else if(1==1){
        //     console.log("User found, checking password");
        // }
        else if(matchingUser[0].hashedPass !== CryptoJS.SHA256(matchingUser[0].salt + password).toString(CryptoJS.enc.Hex)) {
            Alert.alert("Incorrect Password", "Please check your password and try again.");
            return;
        }
        else{
            console.log("Login successful");
            const router = useRouter();
            router.replace('(mainApp)');
        }
        console.log(456);
        await db.closeAsync();
        console.log(matchingUser);
    });

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1 }}
        >
            <ScrollView contentContainerStyle={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <View style={style.mainContainer}>
                    <View style={style.formContainer}>
                        <Text style={{ color: 'rgb(74, 13, 102)', fontSize: 40, fontWeight: 'bold' }}>Login</Text>
                        <TextInput onChangeText={setUsername}
                            value={username}
                            style={style.inputBox} placeholder='Username'></TextInput>
                        <TextInput onChangeText={setPassword} value={password} style={style.inputBox} placeholder='Password' secureTextEntry={true}></TextInput>

                        <TouchableOpacity style={style.loginButton} onPress={handleLogin}>
                            <Text style={{ color: 'white', fontWeight: 'bold' }}>Login</Text>
                        </TouchableOpacity>

                        <Link href={"signUp"} asChild>
                            <TouchableOpacity>
                                <Text style={{ color: 'purple', fontWeight: 'bold', marginTop: 10 }}>Sign Up</Text>
                            </TouchableOpacity>
                        </Link>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );

}

const style = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: "rgb(203, 0, 253)",
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
    },

    formContainer: {
        backgroundColor: "white",
        width: '80%',
        // height: '50%', 
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'top',
        alignItems: 'center',
        borderRadius: 10,
        padding: 20,
    },

    inputBox: {
        borderColor: 'rgba(0, 0, 0,0.2)',
        borderWidth: 1,
        borderRadius: 10,
        width: '100%',
        marginTop: 45,
        backgroundColor: 'rgba(0,0,0,0.1)'
    },

    loginButton: {
        backgroundColor: 'rgb(74, 13, 102)',
        width: '60%',
        height: 50,
        borderRadius: 10,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
});

export default Login;