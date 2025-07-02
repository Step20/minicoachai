import React from "react";
import { View, Text, StyleSheet, ScrollView, Platform } from "react-native";
import HeaderTopBack from "@/components/HeaderTopBack";

export default function TermsScreen() {
  return (
    <ScrollView
      style={[
        styles.container,
        { paddingTop: Platform.OS === "ios" ? 60 : 30 },
      ]}
    >
      <HeaderTopBack title="Terms of Service" screen={"/settings"} />

      <View style={styles.content}>
        <Text style={styles.title}>Terms of Service</Text>
        <Text style={styles.text}>
          📜 Terms of Service (Terms of Use){"\n"}
          Effective Date: June 3, 2025{"\n\n"}
          Welcome to MiniCoachAI! These Terms of Service (“Terms”) govern your
          use of the MiniCoachAI app and services (collectively, the “Service”)
          provided by AVONStudiosAI. By using MiniCoachAI, you agree to these
          Terms. If you do not agree, please do not use the app.{"\n\n"}
          1. Use of Service{"\n"}
          MiniCoachAI provides users with tools for task tracking, goal
          management, and AI-based motivational nudges. You agree to use the app
          only for lawful purposes and in compliance with all applicable laws.
          {"\n\n"}
          2. Account Registration{"\n"}
          To use MiniCoachAI, you may be required to create an account using
          your email and password. You are responsible for maintaining the
          confidentiality of your credentials and for all activities under your
          account.{"\n\n"}
          3. AI and Notifications{"\n"}
          MiniCoachAI uses AI to deliver coaching-style nudges. These messages
          are generated automatically and are not intended to replace
          professional advice. Notifications may be scheduled and customized by
          the user.{"\n\n"}
          4. Subscriptions and Payments{"\n"}
          (Optional) Some features may be offered through paid subscriptions.
          Pricing and payment terms will be clearly disclosed. You may cancel
          your subscription anytime through your app store account settings.
          {"\n\n"}
          5. User Content{"\n"}
          You retain ownership of any content you input (e.g., goals, tasks). We
          do not sell your data. However, we may use anonymized analytics to
          improve our app.{"\n\n"}
          6. Termination{"\n"}
          We reserve the right to suspend or terminate accounts that violate
          these Terms or are involved in fraudulent or abusive behavior.{"\n\n"}
          7. Limitation of Liability{"\n"}
          MiniCoachAI is provided “as is” without warranties. We are not liable
          for any indirect or consequential damages related to your use of the
          Service.{"\n\n"}
          8. Changes to Terms{"\n"}
          We may update these Terms occasionally. We’ll notify users via the app
          or email. Continued use after changes means you accept the new Terms.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F0F0F",
    padding: 16,
  },
  content: {
    marginBottom: 60,
  },
  title: {
    fontSize: 24,
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 16,
  },
  text: {
    color: "#ccc",
    fontSize: 16,
    marginBottom: 12,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#333",
  },
  footerText: {
    color: "#94D78A",
    fontSize: 16,
    marginLeft: 8,
  },
});
