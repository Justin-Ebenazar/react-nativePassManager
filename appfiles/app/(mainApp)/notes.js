import React, { Component } from 'react';
import { View, Text,TextInput, StyleSheet } from 'react-native';

function Notes() {
    return (
        <View style={styles.container}>
            <TextInput placeholder="Search..." style={styles.searchBar} placeholderTextColor='rgba(0,0,0,0.5)'></TextInput>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
     searchBar: {
        marginTop: 20,
        width: '80%',
        height: 40,
        borderRadius: 50,
        paddingHorizontal: 15,
        marginBottom: 20,
        backgroundColor: 'rgba(255,255,255,0.5)',
        color: 'rgba(0,0,0,0.5)',
        fontSize: 16,
        fontWeight: "bold",
        elevation: 5,

    },
});

export default Notes;