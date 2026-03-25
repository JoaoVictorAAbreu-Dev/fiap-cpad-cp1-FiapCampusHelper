import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { colors, globalStyles } from '../styles/theme';
import Card from '../components/Card';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen() {
  const router = useRouter();

  const menuItems = [
    { 
      id: '1', 
      title: 'Agendamento de Labs', 
      icon: 'calendar', 
      route: '/agendamento',
      description: 'Reserve laboratórios para suas aulas ou projetos.'
    },
    { 
      id: '2', 
      title: 'Achados e Perdidos', 
      icon: 'search', 
      route: '/achados',
      description: 'Encontrou algo ou perdeu um item? Registre aqui.'
    },
    { 
      id: '3', 
      title: 'Salas Livres', 
      icon: 'business', 
      route: '/salas',
      description: 'Consulte quais salas estão disponíveis agora.'
    },
  ];

  return (
    <ScrollView style={globalStyles.container}>
      <Stack.Screen options={{ title: 'FIAP Campus Helper', headerTitleAlign: 'center' }} />
      
      <View style={styles.hero}>
        <View style={styles.heroContent}>
          <Text style={styles.welcomeText}>Olá, Aluno!</Text>
          <Text style={styles.heroTitle}>O que você precisa hoje?</Text>
        </View>
      </View>

      <View style={globalStyles.content}>
        <Text style={globalStyles.subtitle}>Serviços Disponíveis</Text>
        
        {menuItems.map((item) => (
          <Card key={item.id} onPress={() => router.push(item.route)} style={styles.menuCard}>
            <View style={styles.menuIconContainer}>
              <Ionicons name={item.icon} size={32} color={colors.primary} />
            </View>
            <View style={styles.menuTextContainer}>
              <Text style={styles.menuTitle}>{item.title}</Text>
              <Text style={styles.menuDescription}>{item.description}</Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color={colors.lightGray} />
          </Card>
        ))}

        <View style={styles.footer}>
          <Text style={styles.footerText}>FIAP - Checkpoint 1</Text>
          <Text style={styles.footerSubtext}>Desenvolvimento de Apps Cross-Platform</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  hero: {
    backgroundColor: colors.primary,
    paddingVertical: 40,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    marginBottom: 20,
  },
  heroContent: {
    alignItems: 'flex-start',
  },
  welcomeText: {
    color: colors.white,
    fontSize: 16,
    opacity: 0.9,
  },
  heroTitle: {
    color: colors.white,
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 8,
  },
  menuCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  menuIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FFF0F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  menuTextContainer: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.secondary,
  },
  menuDescription: {
    fontSize: 13,
    color: colors.gray,
    marginTop: 4,
  },
  footer: {
    marginTop: 40,
    alignItems: 'center',
    paddingBottom: 20,
  },
  footerText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.secondary,
  },
  footerSubtext: {
    fontSize: 12,
    color: colors.gray,
    marginTop: 4,
  }
});
