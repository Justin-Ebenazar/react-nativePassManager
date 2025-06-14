// app/(app)/(tabs)/_layout.js
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons'; // For tab icons
import { TouchableOpacity } from 'react-native';

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: 'rgb(255, 255, 255)', // Color of active tab icon/label
                tabBarInactiveTintColor: 'rgb(152, 92, 172)',  // Color of inactive tab icon/label
                tabBarPressColor: 'rgba(0, 0, 0, 0)', // Color when pressing the tab
                tabBarPressOpacity: 0.2, // Opacity when pressing the tab
                tabBarStyle: {
                    backgroundColor: 'rgb(205, 145, 225)', // Background color of the tab bar
                    height: 50,
                    elevate: 5,
                },
                tabBarButton: (props) => (
                    <TouchableOpacity {...props} activeOpacity={1} />
                ),
                headerShown: false, // Hide header by default for tabs (if your tabs are inside a drawer/stack that has a header)
            }}
        >
            {/* Home Tab */}
            <Tabs.Screen
                name="index" // This matches app/(app)/(tabs)/_index.js
                options={{
                    title: 'Home',
                    // Hide the tab name (label) completely
                    tabBarShowLabel: false,
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="home" color={color} size={size} />
                    ),
                }}
            />

            <Tabs.Screen
                name="favourites" // This matches app/(app)/(tabs)/favourites.js
                options={{
                    title: 'Favorites',
                    tabBarShowLabel: false,
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="star" color={color} size={size} />
                    ),
                }}
            />
            <Tabs.Screen
                name="add" // This matches app/(app)/(tabs)/favourites.js
                options={{
                    title: 'Add new',
                    tabBarShowLabel: false,
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="add" color={color} size={size} />
                    ),
                }}
            />
            <Tabs.Screen
                name="recents" // This matches app/(app)/(tabs)/favourites.js
                options={{
                    title: 'Recents',
                    tabBarShowLabel: false,
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="time" color={color} size={size} />
                    ),
                }}
            />
            <Tabs.Screen
                name="notes" // This matches app/(app)/(tabs)/favourites.js
                options={{
                    title: 'Notes',
                    tabBarShowLabel: false,
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="document-text" color={color} size={size} />
                    ),
                }}
            />
        </Tabs>
    );
}