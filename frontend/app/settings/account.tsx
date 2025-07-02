import HeaderTopBack from "@/components/HeaderTopBack";
import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from "react-native";

export default function AccountSettingsScreen() {
  return (
    <View
      style={[
        styles.container,
        { paddingTop: Platform.OS === "ios" ? 60 : 30 },
      ]}
    >
      <HeaderTopBack title="Account" screen={"/settings"} />

      {/* Profile Picture */}
      <TouchableOpacity style={styles.row}>
        <Text style={styles.label}>Profile Picture</Text>
        <Text style={styles.action}>Change</Text>
      </TouchableOpacity>

      {/* Full Name */}
      <TouchableOpacity style={styles.row}>
        <Text style={styles.label}>Full Name</Text>
        <Text style={styles.action}>Edit</Text>
      </TouchableOpacity>

      {/* Email */}
      <View style={styles.row}>
        <Text style={styles.label}>Email</Text>
        <Text style={styles.value}>user@example.com</Text>
      </View>

      {/* Password */}
      <TouchableOpacity style={styles.row}>
        <Text style={styles.label}>Password</Text>
        <Text style={styles.action}>Change</Text>
      </TouchableOpacity>

      {/* Delete Account */}
      <TouchableOpacity style={styles.deleteRow}>
        <Text style={styles.deleteText}>Delete My Account</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  heading: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  label: { fontSize: 16, color: "#444" },
  value: { fontSize: 16, color: "#999" },
  action: { fontSize: 16, color: "#FFB2E3" },
  deleteRow: {
    marginTop: 30,
    paddingVertical: 12,
  },
  deleteText: {
    color: "red",
    fontSize: 16,
    textAlign: "center",
  },
});
