import { ScrollView, TouchableOpacity, Text, View } from "react-native";
import {useState} from 'react';

function CategoryTags({ tags, onTagPress }) {

    const [selectedTag,setSelectedTag]= useState('1');
    return (
        <View style={{height: 30}}>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{height: 30 }}
        decelerationRate="fast"
        overScrollMode="always">
            <View style={{ flexDirection: "row", alignItems: "flex-start" ,justifyContent:'flex-start',height: 20 }}>
                {tags.map((tag) => (
                    <TouchableOpacity
                        key={tag.id}
                        activeOpacity={1}
                        onPress={() =>{ setSelectedTag(tag.id);
                            onTagPress(tag);}}
                        style={{
                            backgroundColor: selectedTag===tag.id ?  'rgb(225, 195, 235)' : 'rgb(196, 196, 196)',
                            paddingVertical: 0,
                            paddingHorizontal: 12,
                            borderRadius: 10,
                            marginHorizontal: 6,
                            minWidth: 70,
                            height: 20, /* ✅ Fixed height to prevent expansion */
                            justifyContent: "center",
                            alignItems: "center"
                        }}>
                        <Text style={{ color: selectedTag===tag.id ? "rgb(186, 71, 224)" : 'rgb(128, 128, 128)', fontWeight: "bold" }}>{tag.name}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </ScrollView>
</View>
    );
}

export default CategoryTags;
