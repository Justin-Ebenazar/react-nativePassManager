import { View, Text, TouchableOpacity, Animated } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRef, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AsidePane({ closePane }) {
    const slideAnim = useRef(new Animated.Value(-250)).current;

    useEffect(() => {
        Animated.timing(slideAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: false,
        }).start();
    }, []);

    return (
        // <SafeAreaView style={{ flex: 1 }}>  {/* ✅ Ensures safe area padding */}
            <Animated.View style={{
                position: "absolute",
                left: slideAnim,
                width: 250,
                height: "100%",
                backgroundColor: "#2B035C",
                padding: 15,
                elevation: 5,
                bottom: 45,
            }}>
                <TouchableOpacity onPress={closePane} style={{ position: "absolute", top: 10, right: 10 }}>
                    <Ionicons name="close" size={24} color="white" />
                </TouchableOpacity>
                <Text style={{ color: "white", fontSize: 18 }}>Aside Pane Content</Text>
            </Animated.View>

    );
}
