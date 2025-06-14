import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

function Notes() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>This is the Recents Tab</Text>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold'
    }
});

export default Notes;