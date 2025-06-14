import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function CustomHeader({ onMenuPress }) {
    return (
        <View style={{
            height: 60,
            backgroundColor: "rgb(205, 145, 225)",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
            paddingHorizontal: 15,
        }}>
            <TouchableOpacity onPress={onMenuPress}>
                <Ionicons name="menu" size={24} color="black" />
            </TouchableOpacity>
            <Text style={{ fontSize: 21, color: "white", fontWeight: "bold", marginLeft: 21 }}>Jortress</Text>
        </View>
    );
}
