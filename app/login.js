import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { Stack } from 'expo-router';
import { colors } from '../styles/theme';
import Input from '../components/Input';
import Button from '../components/Button';
import { AuthContext } from './_layout'; // Importamos o contexto do layout

export default function LoginScreen() {
  const [rm, setRm] = useState('');
  const [password, setPassword] = useState('');
  const { setIsLoggedIn } = useContext(AuthContext); // Pegamos a função de login do contexto

  const handleLogin = () => {
    if (!rm || !password) {
      Alert.alert('Erro', 'Por favor, preencha o RM e a Senha.');
      return;
    }
    
    // Simulação de login: Se preenchido, ele loga e o _layout.js faz o redirecionamento
    // Você pode adicionar uma validação real aqui se desejar
    setIsLoggedIn(true); 
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <Stack.Screen options={{ headerShown: false }} />
      
      <View style={styles.logoContainer}>
        <View style={styles.logoPlaceholder}>
          <Text style={styles.logoText}>FIAP</Text>
        </View>
        <Text style={styles.welcomeText}>Bem-vindo ao Campus Helper</Text>
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.loginTitle}>Acesse sua conta</Text>
        
        <Input 
          label="RM" 
          placeholder="Digite seu RM" 
          value={rm}
          onChangeText={setRm}
          keyboardType="numeric"
        />
        
        <Input 
          label="Senha" 
          placeholder="Digite sua senha" 
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
        />

        <Button 
          title="Entrar" 
          onPress={handleLogin} 
          style={styles.loginButton}
        />
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Desenvolvido para CP1 - FIAP</Text>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    padding: 20,
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  logoText: {
    color: colors.white,
    fontSize: 32,
    fontWeight: 'bold',
  },
  welcomeText: {
    fontSize: 18,
    color: colors.secondary,
    fontWeight: '600',
  },
  formContainer: {
    width: '100%',
  },
  loginTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.secondary,
    marginBottom: 24,
    textAlign: 'center',
  },
  loginButton: {
    marginTop: 10,
    height: 50,
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  footerText: {
    color: colors.gray,
    fontSize: 12,
  }
});
