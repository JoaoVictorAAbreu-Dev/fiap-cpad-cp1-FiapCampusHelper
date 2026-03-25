import { Stack, useRouter, useSegments } from 'expo-router';
import { colors } from '../styles/theme';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState, createContext, useContext } from 'react';

// 1. Criamos um Contexto para compartilhar o estado de login entre as telas
export const AuthContext = createContext({});

export default function Layout() {
  const segments = useSegments();
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isReady, setIsReady] = useState(false);

  // 2. Garantimos que o roteador está pronto antes de tentar redirecionar
  useEffect(() => {
    const timer = setTimeout(() => setIsReady(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // 3. Lógica de proteção de rotas
  useEffect(() => {
    if (!isReady) return;

    const inAuthGroup = segments[0] === 'login';

    if (!isLoggedIn && !inAuthGroup) {
      // Se não estiver logado e não estiver na tela de login, vai para login
      router.replace('/login');
    } else if (isLoggedIn && inAuthGroup) {
      // Se logar, sai da tela de login e vai para a Home automaticamente
      router.replace('/');
    }
  }, [isLoggedIn, segments, isReady]);

  return (
    // 4. Envolvemos o app no Provider para que a tela de Login possa alterar o 'isLoggedIn'
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: colors.white,
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerShadowVisible: false,
        }}
      >
        <Stack.Screen 
          name="login" 
          options={{ 
            headerShown: false,
            title: 'Login',
          }} 
        />
        <Stack.Screen 
          name="index" 
          options={{ 
            title: 'FIAP Campus Helper',
          }} 
        />
        <Stack.Screen 
          name="agendamento" 
          options={{ 
            title: 'Agendamento de Labs',
            headerBackTitle: 'Voltar',
          }} 
        />
        <Stack.Screen 
          name="achados" 
          options={{ 
            title: 'Achados e Perdidos',
            headerBackTitle: 'Voltar',
          }} 
        />
        <Stack.Screen 
          name="salas" 
          options={{ 
            title: 'Salas Livres',
            headerBackTitle: 'Voltar',
          }} 
        />
      </Stack>
    </AuthContext.Provider>
  );
}
