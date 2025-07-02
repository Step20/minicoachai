import React from "react";
import { View, Text, StyleSheet, ScrollView, Platform } from "react-native";
import HeaderTopBack from "@/components/HeaderTopBack";

export default function PrivacyPolicyScreen() {
  return (
    <ScrollView
      style={[
        styles.container,
        { paddingTop: Platform.OS === "ios" ? 60 : 30 },
      ]}
    >
      <HeaderTopBack title="Terms of Service" screen={"/settings"} />

      <Text style={styles.text}>
        🔒 Privacy Policy{"\n"}
        Effective Date: June 3, 2025{"\n\n"}
        At MiniCoachAI, your privacy is important to us. This Privacy Policy
        explains how we collect, use, and protect your personal information.
        {"\n\n"}
        1. Information We Collect{"\n"}
        Account Info: Email and authentication credentials via Firebase Auth.
        {"\n"}
        Usage Data: Goals, tasks, reminders, and in-app actions.{"\n"}
        Device Info: Device model, OS version, and app interaction logs.{"\n\n"}
        2. How We Use Your Information{"\n"}
        We use your information to:{"\n"}• Provide core app features like goal
        tracking and task management.{"\n"}• Deliver AI-based coaching messages
        and reminders.{"\n"}• Improve app functionality and personalize the
        experience.{"\n"}• Ensure account security and prevent abuse.{"\n\n"}
        3. Third-Party Services{"\n"}
        We use:{"\n"}• Firebase for authentication and database.{"\n"}• Expo for
        app delivery and updates.{"\n"}
        We do not share your personal data with advertisers or data brokers.
        {"\n\n"}
        4. Data Storage & Security{"\n"}
        Your data is stored securely using Firebase services. We implement
        industry-standard security practices to protect your data from
        unauthorized access or disclosure.{"\n\n"}
        5. Your Rights{"\n"}
        You may:{"\n"}• Access or delete your account data.{"\n"}• Revoke
        permissions and notifications.{"\n"}• Contact us to exercise your rights
        under applicable privacy laws (e.g., GDPR, CCPA).{"\n\n"}
        6. Children's Privacy{"\n"}
        MiniCoachAI is not intended for children under 13. We do not knowingly
        collect personal data from minors.{"\n\n"}
        7. Changes to This Policy{"\n"}
        We may update this policy as needed. We’ll notify users of significant
        changes via the app.{"\n\n"}
        8. Contact Us{"\n"}
        For any questions, concerns, or data requests, contact us at:{"\n\n"}
        📧 support@minicoachai.com{"\n"}
        🌐 www.minicoachai.com
      </Text>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F0F0F",
    padding: 16,
  },
  text: {
    color: "#ccc",
    fontSize: 16,
    lineHeight: 20,
    marginBottom: 60,
  },
});
