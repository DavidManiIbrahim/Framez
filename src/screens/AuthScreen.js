import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { useAuth } from '../context/AuthContext';

export default function AuthScreen() {
  const { signIn, signUp } = useAuth();
  const { colors, dark } = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [mode, setMode] = useState('login');

  const onSubmit = () => {
    if (mode === 'login') signIn(email, password);
    else signUp(email, password, name);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>Framez</Text>
      {mode === 'signup' && (
        <TextInput placeholder="Name" value={name} onChangeText={setName} style={[styles.input, { color: colors.text, borderColor: dark ? '#444' : '#ddd' }]} placeholderTextColor={dark ? '#aaa' : '#888'} />
      )}
      <TextInput placeholder="Email" autoCapitalize="none" value={email} onChangeText={setEmail} style={[styles.input, { color: colors.text, borderColor: dark ? '#444' : '#ddd' }]} placeholderTextColor={dark ? '#aaa' : '#888'} />
      <TextInput placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} style={[styles.input, { color: colors.text, borderColor: dark ? '#444' : '#ddd' }]} placeholderTextColor={dark ? '#aaa' : '#888'} />
      <Button title={mode === 'login' ? 'Log In' : 'Sign Up'} onPress={onSubmit} />
      <View style={{ height: 12 }} />
      <Button
        title={mode === 'login' ? "Don't have an account? Sign Up" : 'Have an account? Log In'}
        onPress={() => setMode(mode === 'login' ? 'signup' : 'login')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, justifyContent: 'center' },
  title: { fontSize: 32, fontWeight: '600', textAlign: 'center', marginBottom: 24 },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 12,
  },
});
