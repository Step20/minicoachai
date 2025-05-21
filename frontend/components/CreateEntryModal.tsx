import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';

export default function CreateEntryModal({ type = 'task', onCreate }) {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [coach, setCoach] = useState('');

  const handleSubmit = () => {
    const payload = { title, date, time };
    if (type === 'goal') payload.coach = coach;
    onCreate(payload);
  };

  return (
    <View style={styles.modal}>
      <Text style={styles.header}>Create New {type}</Text>
      <TextInput placeholder="Title" onChangeText={setTitle} style={styles.input} />
      <TextInput placeholder="Date (YYYY-MM-DD)" onChangeText={setDate} style={styles.input} />
      <TextInput placeholder="Time (HH:mm)" onChangeText={setTime} style={styles.input} />
      {type === 'goal' && (
        <TextInput placeholder="Coach name" onChangeText={setCoach} style={styles.input} />
      )}
      <Button title="Create" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  modal: { padding: 20, backgroundColor: '#222', borderRadius: 12 },
  header: { color: '#fff', fontSize: 18, marginBottom: 10 },
  input: {
    backgroundColor: '#333',
    color: '#fff',
    padding: 10,
    marginBottom: 10,
    borderRadius: 6,
  },
});