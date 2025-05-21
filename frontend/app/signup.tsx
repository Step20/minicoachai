// app/signup.tsx
import { View, TextInput, Button, StyleSheet, Text } from "react-native";
export default function Signup() {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Signup</Text>
      <TextInput placeholder="Email" style={styles.input} />
      <TextInput placeholder="Password" secureTextEntry style={styles.input} />
      <Button title="Signup" onPress={() => {}} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, padding: 30, backgroundColor: "#111" },
  heading: { color: "#fff", fontSize: 20, marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: "#444",
    backgroundColor: "#222",
    padding: 10,
    borderRadius: 6,
    marginBottom: 10,
    color: "#fff",
  },
});
