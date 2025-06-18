import { View, Modal, ScrollView, Text, TextInput, Image, TouchableOpacity, StyleSheet, FlatList,TouchableWithoutFeedback } from "react-native";
import { useState } from "react";
import { Picker } from '@react-native-picker/picker';
import { FontAwesome } from "@expo/vector-icons";
import { KeyboardAvoidingView, Platform } from "react-native";

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

    const pickerTags = [
        { id: 'all', name: 'All', color: '#e1c3eb' },
        { id: 'other', name: 'Other', color: '#c4c4c4' },
        ...dummyTags
    ];

    const [customCategory, setCustomCategory] = useState("");
    const [visible, setVisible] = useState(true);

    // Dummy icon data for the FlatList within the modal
    const dummyIcons = Array.from({ length: 50 }, (_, i) => ({ id: `icon_${i}`, name: `Icon ${i + 1}` }));

    return (
        <>
            {/* The main content of your Add screen, outside the modal */}
            <ScrollView contentContainerStyle={{ flexGrow: 1 }} scrollEnabled={!visible}>
                <View style={styles.container}>
                    <View style={styles.iconContainer}>
                        <TouchableOpacity
                            style={[styles.smallButton, {
                                backgroundColor: '#e3f0ff',
                                borderRadius: 12
                            }]}
                            onPress={() => setVisible(true)}
                        >
                            {/* Assuming you have this image path correctly configured */}
                            <Image source={require('../../assets/images/passAppIcons/default.png')} style={{ width: '100%', height: '100%', borderRadius: 10 }} />
                        </TouchableOpacity>
                        <Text style={{ fontWeight: 'bold', marginTop: 5 }}>App Icon</Text>
                    </View>

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

                    <TouchableOpacity style={{
                        backgroundColor: '#ba47e0',
                        paddingVertical: 12,
                        borderRadius: 12,
                        marginTop: 24,
                        alignItems: 'center',
                        alignSelf: "center",
                        width: "70%"
                    }}>
                        <Text style={[styles.saveButtonText, { color: 'white' }]}>Save</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>

            {/* The Modal for icon selection */}
            <Modal
                visible={visible}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setVisible(false)}
            >
                {/* Outer touchable closes the modal */}
                <TouchableWithoutFeedback onPress={() => setVisible(false)}>
                    <View style={styles.modalOverlay}>
                        {/* Inner touchable prevents closing when interacting with modal content */}
                        <TouchableWithoutFeedback onPress={() => { /* Do nothing to prevent closing */ }}>
                            <KeyboardAvoidingView
                                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                                style={styles.keyboardAvoidingModalView} // Apply KAV directly to modal content
                            >
                                <View style={styles.iconPicker}>
                                    <TextInput style={styles.iconSearchInput} placeholder="Search icons..." />
                                    <View style={styles.iconBox}>
                                        {/* This is the FlatList that needs to scroll */}
                                        <FlatList
                                            data={dummyIcons} // Using dummyIcons for demonstration
                                            keyExtractor={item => item.id}
                                            numColumns={4} // Example: arrange icons in 4 columns
                                            columnWrapperStyle={styles.row} // For multi-column spacing
                                            renderItem={({ item }) => (
                                                <TouchableOpacity style={styles.iconItem}>
                                                    <FontAwesome name="folder" size={30} color="#555" /> {/* Example icon */}
                                                    <Text style={styles.iconText}>{item.name}</Text>
                                                </TouchableOpacity>
                                            )}
                                            // Ensure scrolling indicators are always shown if content overflows
                                            showsVerticalScrollIndicator={true}
                                            // overScrollMode="always" // overScrollMode is Android-specific
                                            contentContainerStyle={styles.flatListContent}
                                        />
                                    </View>

                                    <View style={styles.modalActionButtons}>
                                        <TouchableOpacity
                                            style={styles.cancelButton}
                                            onPress={() => setVisible(false)}
                                        >
                                            <Text style={styles.cancelButtonText}>Cancel</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={styles.saveButton}
                                            onPress={() => { /* Handle saving icon selection */ setVisible(false); }}
                                        >
                                            <Text style={styles.saveButtonText}>Save</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </KeyboardAvoidingView>
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </>
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
    // Styles for the Modal and its content
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
        alignItems: "center"
    },
    keyboardAvoidingModalView: {
        width: '100%', // Take full width within the modal overlay
        alignItems: 'center', // Center content horizontally
    },
    iconPicker: {
        backgroundColor: "rgb(255, 253, 253)",
        height: 450, // Fixed height for the modal content box
        width: 300,
        borderRadius: 15,
        borderColor: "rgba(207,207,207,1)",
        borderWidth: 1,
        elevation: 10,
        shadowColor: "rgba(0,0,0,1)",
        shadowOffset: { width: 3, height: 3 },
        // IMPORTANT: Make this a flex container in column direction
        flexDirection: 'column',
        justifyContent: 'space-between', // Distribute space
        paddingBottom: 15, // Add padding at bottom for buttons
    },
    iconSearchInput: {
        backgroundColor: "white",
        width: 250,
        alignSelf: "center",
        marginTop: 15, // Adjusted margin
        marginBottom: 10, // Added margin below input
        borderColor: "rgba(207,207,207,1)",
        borderWidth: 1,
        borderRadius: 20,
        paddingHorizontal: 15, // Added padding for text
        paddingVertical: 8,
    },
    iconBox: {
        // This View needs to take up available space for FlatList to scroll
        flex: 1, // IMPORTANT: Allows iconBox to expand and give height to FlatList
        backgroundColor: "rgb(207, 207, 207)",
        width: 275,
        alignSelf: "center",
        padding: 10,
        borderRadius: 10,
        // Added overflow hidden to prevent children from spilling
        overflow: 'hidden',
    },
    flatListContent: {
        // Optional: Add padding inside the FlatList content if needed
        paddingBottom: 10,
    },
    row: {
        // Used for numColumns to ensure spacing between items
        justifyContent: 'space-around',
        marginBottom: 10, // Space between rows
    },
    iconItem: {
        width: 60, // Fixed width for each icon item
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5,
        borderRadius: 8,
        backgroundColor: '#f8f8f8',
        margin: 4, // Small margin around each item
    },
    iconText: {
        fontSize: 10,
        marginTop: 5,
        textAlign: 'center',
    },
    modalActionButtons: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 25,
        marginTop: 12,
    },
    cancelButton: {
        width: "30%",
        borderRadius: 15,
        borderColor: "rgb(255, 87, 87)",
        borderWidth: 2,
        backgroundColor: "rgb(255, 208, 208)",
        paddingVertical: 5,
        alignSelf: "center",
    },
    cancelButtonText: {
        padding: 5,
        alignSelf: "center",
        color: 'rgb(255, 87, 87)', // Make text color match border for consistency
        fontWeight: 'bold',
    },
    saveButton: {
        width: "30%",
        borderRadius: 15,
        borderColor: "#2196f3",
        borderWidth: 2,
        backgroundColor: "#e3f0ff",
        paddingVertical: 5,
        alignSelf: "center",
    },
    saveButtonText: {
        padding: 5,
        alignSelf: "center",
        color: '#2196f3', // Make text color match border for consistency
        fontWeight: 'bold',
    },
});

export default Add;