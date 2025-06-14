// app/(auth)/_layout.js
import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
      <Stack>
        <Stack.Screen
          name="index" // This matches app/(auth)/login.js
          options={{
            headerShown: false, // Hide header for the login screen, as per your design
            title: "Login", // You can set a default title for the stack
          }}
        />
        <Stack.Screen
          name="signUp"
          options={{ headerShown: false, title: "Sign Up" }}
        />
      </Stack>

  );
}