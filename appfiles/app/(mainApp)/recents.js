import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function Recents(){
    return (
        <View style={styles.container}>
            <Text style={styles.text}>This is the Recents page</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
    },
});

export default Recents;