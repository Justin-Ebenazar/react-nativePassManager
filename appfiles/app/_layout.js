import { Stack } from "expo-router";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { View} from "react-native";
import CustomHeader from "./_components/CustomHeader";
import AsidePane from "./_components/SidePane"; 
import { useState } from "react";

export default function Layout() {
    const [isPaneOpen, setIsPaneOpen] = useState(false);

    return (
        <SafeAreaProvider>
            <SafeAreaView style={{ flex: 1 }}>
                {/* Custom Header with Menu Button */}
                <CustomHeader onMenuPress={() => setIsPaneOpen(true)} />

                {/* Stack for Screens */}
                <View style={{ flex: 1 }}>
                    <Stack >
                        <Stack.Screen name="(mainApp)" options={{headerShown: false}}/>
                    </Stack>
                </View>

                {/* Custom Aside Pane */}
                {isPaneOpen && <AsidePane closePane={() => setIsPaneOpen(false)} />}
            </SafeAreaView>
        </SafeAreaProvider>
    );
}

