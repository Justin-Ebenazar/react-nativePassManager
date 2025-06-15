import { View, ScrollView, Text, TouchableWithoutFeedback, TextInput, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useState } from "react";
import { Picker } from '@react-native-picker/picker';

const dummyTags = [
    { id: '1', name: 'All' },
    { id: '2', name: 'Work' },
    { id: '3', name: 'Finance' },
];

function Add() {
    const [appName, setAppName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");
    const [twoFA, setTwoFA] = useState("");
    const [selectedCategory, setSelectedCategory] = useState(dummyTags[0]);

    // Prepare tags: first "All", then "Other", then existing tags
    const pickerTags = [
        { id: 'all', name: 'All', color: '#e1c3eb' },
        { id: 'other', name: 'Other', color: '#c4c4c4' },
        ...dummyTags
    ];

    const [customCategory, setCustomCategory] = useState("");
    const [visible, setVisible] = useState(true);
    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} scrollEnabled={!visible}>
            <View style={styles.container}>
                <View style={styles.iconContainer}>
                    <TouchableOpacity style={styles.smallButton}>
                        <Image source={require('../../assets/images/passAppIcons/default.png')} style={{ width: '100%', height: '100%', borderRadius: 10 }} />
                    </TouchableOpacity>
                    <Text style={{ fontWeight: 'bold', marginTop: 5 }}>App Icon</Text>
                </View>
                <TouchableWithoutFeedback>
                    <View style={{
                        zIndex: 1, position: "absolute", top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,alignItems: "center",
                        elevate: 5, backgroundColor: "rgba(0,0,0,0.5)",justifyContent: "center"
                    }}>
                        <View style={styles.iconPicker}>
                            <TextInput style={styles.iconSearchInput} placeholder="Search icons..."/>
                            <View style={styles.iconBox}>

                            </View>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
                <Text style={styles.label}>App Name</Text>
                <TextInput style={styles.input} value={appName} onChangeText={setAppName} placeholder="Enter app name" />

                <Text style={styles.label}>Password</Text>
                <TextInput style={styles.input} value={password} onChangeText={setPassword} placeholder="Enter password" secureTextEntry />

                <Text style={styles.label}>Linked Email</Text>
                <TextInput style={styles.input} value={email} onChangeText={setEmail} placeholder="Enter linked email" />

                <Text style={styles.label}>Linked Mobile Number</Text>
                <TextInput style={styles.input} value={mobile} onChangeText={setMobile} placeholder="Enter mobile number" keyboardType="phone-pad" />

                <Text style={styles.label}>2FA Pass</Text>
                <TextInput style={styles.input} value={twoFA} onChangeText={setTwoFA} placeholder="Enter 2FA pass" />

                <Text style={styles.label}>Category</Text>
                <View style={{ width: '50%', borderWidth: 1, borderColor: '#ccc', borderRadius: 6, marginBottom: 8 }}>
                    <Picker
                        selectedValue={selectedCategory.id}
                        onValueChange={(itemValue) => {
                            const found = pickerTags.find(tag => tag.id === itemValue);
                            setSelectedCategory(found);
                        }}
                    >
                        {pickerTags.map(tag => (
                            <Picker.Item key={tag.id} label={tag.name} value={tag.id} />
                        ))}
                    </Picker>
                </View>
                {selectedCategory.id === 'other' && (
                    <TextInput
                        style={styles.input}
                        value={customCategory}
                        onChangeText={setCustomCategory}
                        placeholder="Enter custom category"
                    />
                )}

                <TouchableOpacity style={styles.saveButton}>
                    <Text style={styles.saveButtonText}>Save</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    iconContainer: {
        height: 100,
        alignItems: 'center',
        justifyContent: 'center',
    },
    overlay: {
        position: "absolute",
        zIndex: 2,
        height: 300,
        width: 100,
        elevate: 5
    },
    label: {
        fontWeight: 'bold',
        marginTop: 12,
        marginBottom: 4,
        color: '#444',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 6,
        padding: 8,
        marginBottom: 8,
    },
    smallButton: {
        backgroundColor: '#ffffff',
        borderRadius: 10,
        height: 80,
        width: 80
    },
    saveButton: {
        backgroundColor: '#ba47e0',
        paddingVertical: 12,
        borderRadius: 8,
        marginTop: 24,
        alignItems: 'center',
    },
    saveButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    iconPicker: {
        backgroundColor: "rgb(255, 253, 253)",
        height: 450,
        width: 300,
        alignSelf: "center",
        borderRadius: 15,
        borderColor: "rgba(207,207,207,1)",
        borderWidth: 1,
        elevate: 10,
        shadowColor: "rgba(0,0,0,1)",
        shadowOffset: { width: 3, height: 3 }
    },
    iconBox: {
        backgroundColor: "rgb(207, 207, 207)",
        height: 325,
        width: 275,
        marginTop: 10,
        alignSelf: "center",
        padding: 10,
        borderRadius: 10
    },
    iconSearchInput: {
        backgroundColor: "white",
        width: 250,
        alignSelf: "center",
        marginTop: 10,
        borderColor: "rgba(207,207,207,1)",
        borderWidth: 1,
        borderRadius: 20
    }
});

export default Add;