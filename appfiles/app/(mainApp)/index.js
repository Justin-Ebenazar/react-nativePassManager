import { FontAwesome } from "@expo/vector-icons";
import { useState } from 'react';
import { FlatList, Image, Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import CategoryTags from "../_components/categoryTags";
function Home() {
    const [colorInd, setColorInd] = useState("rgb(214, 214, 214)");

    const passwordData = [
        {
            id: '1',
            name: 'Instagram',
            image: require('../../assets/images/passAppIcons/Instagram.png'),
            color: "rgb(255, 255, 255)"
        },
        {
            id: '2',
            name: 'Facebook',
            image: require('../../assets/images/passAppIcons/Facebook.png'),
            color: "rgb(255, 255, 255)"
        },
        {
            id: '3',
            name: 'Twitteashbno',
            image: require('../../assets/images/passAppIcons/Twitter.png'),
            color: "rgb(255, 255, 255)"
        },
        {
            id: '4',
            name: 'reddit',
            image: require('../../assets/images/passAppIcons/Twitter.png'),
            color: "rgb(255, 255, 255)"
        },
        {
            id: '5',
            name: 'Twittesagarr',
            image: require('../../assets/images/passAppIcons/Twitter.png'),
            color: "rgb(255, 255, 255)"
        },
        {
            id: '7',
            name: 'Twittersfaga',
            image: require('../../assets/images/passAppIcons/Twitter.png'),
            color: "rgb(255, 255, 255)"
        },
        {
            id: '6',
            name: 'Twitterasgar',
            image: require('../../assets/images/passAppIcons/Twitter.png'),
            color: "rgb(255, 255, 255)"
        },
        {
            id: '8',
            name: 'oakh ov',
            image: require('../../assets/images/passAppIcons/Twitter.png'),
            color: "rgb(255, 255, 255)"
        },
        {
            id: '9',
            name: 'avoon',
            image: require('../../assets/images/passAppIcons/Twitter.png'),
            color: "rgb(255, 255, 255)"
        },
        {
            id: '10',
            name: 'oagr',
            image: require('../../assets/images/passAppIcons/Twitter.png'),
            color: "rgb(255, 255, 255)"
        },
        {
            id: '11',
            name: 'jahola',
            image: require('../../assets/images/passAppIcons/Twitter.png'),
            color: "rgb(255, 255, 255)"
        },
        {
            id: '12',
            name: 'aosfg',
            image: require('../../assets/images/passAppIcons/Twitter.png'),
            color: "rgb(255, 255, 255)"
        },
    ];

    const categories = [
        { id: '1', name: 'All'},
        { id: '2', name: 'Social Media'},
        { id: '3', name: 'Shopping'},
        { id: '4', name: 'Banking'},
        { id: '5', name: 'Entertainment'},
    ]

    const renderPasswordBlock = ({ item }) => (
        <View style={[style.passwordBlock, { backgroundColor: item.color }]}>
            <View >
                <Image source={item.image} style={{ width: 40, height: 40 }} />
            </View>
            <View style={{ marginLeft: 20, display: 'flex', flexDirection: 'column' }}>
                <Text style={style.text}>{item.name}</Text>
                <Text style={{ fontSize: 12, color: 'rgba(0,0,0,0.5)' }}>Last updated : 22/7/2025</Text>
            </View>
            <TouchableOpacity style={{ marginRight: 10, marginLeft: 'auto' }} onPress={Keyboard.dismiss}>
                <FontAwesome name="star" size={21} color={colorInd} onPress={() => {
                    if (colorInd === "rgb(214, 214, 214)") {
                        setColorInd("orange");
                    } else {
                        setColorInd("rgb(214, 214, 214)");
                    }
                }} />
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={style.container}>
            <TextInput placeholder="Search..." style={style.searchBar} placeholderTextColor='rgba(0,0,0,0.5)'></TextInput>
            <CategoryTags tags={categories} onTagPress={(tag) => console.log(tag.name)} />
            <FlatList
                style={style.scroller}
                data={passwordData}
                renderItem={renderPasswordBlock}
                keyExtractor={item => item.id}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ alignItems: 'center' }}
                scrollEventThrottle={5}
                overScrollMode="always" 
                decelerationRate="fast" 
                removeClippedSubviews={true} 
            />
        </View>
    );
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#EDEAE0',
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
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
    passwordBlock: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 20,
        width: '85%',
        height: 70,
        padding: 10,
        backgroundColor: 'rgb(255, 255, 255)',
        borderRadius: 10,
        elevation: 10,
        borderColor: '#dadada',
        borderWidth: 1,
        // shadowColor: 'rgba(103, 45, 189, 1)',
        shadowRadius: 6
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
    },
    scroller: {
        flex: 1,
        width: '100%',
        backgroundColor: '#EDEAE0',
    }
});

export default Home;