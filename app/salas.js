import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { Stack } from 'expo-router';
import { colors, globalStyles } from '../styles/theme';
import Card from '../components/Card';
import EmptyState from '../components/EmptyState';
import { Ionicons } from '@expo/vector-icons';

const initialSalas = [
  { id: '1', room: 'Sala 301', floor: '3º Andar', status: 'livre', nextClass: '19:00' },
  { id: '2', room: 'Sala 302', floor: '3º Andar', status: 'ocupada', nextClass: 'Agora' },
  { id: '3', room: 'Sala 401', floor: '4º Andar', status: 'livre', nextClass: '20:30' },
  { id: '4', room: 'Sala 402', floor: '4º Andar', status: 'livre', nextClass: '18:30' },
  { id: '5', room: 'Sala 501', floor: '5º Andar', status: 'ocupada', nextClass: 'Agora' },
];

export default function SalasScreen() {
  const [salas, setSalas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulando carregamento de dados
    const timer = setTimeout(() => {
      setSalas(initialSalas);
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const renderSala = ({ item }) => (
    <Card style={styles.salaCard}>
      <View style={styles.salaHeader}>
        <View>
          <Text style={styles.salaName}>{item.room}</Text>
          <Text style={styles.salaFloor}>{item.floor}</Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: item.status === 'livre' ? colors.success : colors.error }]}>
          <Text style={styles.statusText}>{item.status.toUpperCase()}</Text>
        </View>
      </View>
      
      <View style={styles.salaFooter}>
        <Ionicons name="time-outline" size={16} color={colors.gray} />
        <Text style={styles.nextClassText}>
          {item.status === 'livre' ? `Livre até: ${item.nextClass}` : `Ocupada até: ${item.nextClass}`}
        </Text>
      </View>
    </Card>
  );

  if (loading) {
    return (
      <View style={[globalStyles.container, styles.centered]}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.loadingText}>Consultando disponibilidade...</Text>
      </View>
    );
  }

  return (
    <View style={globalStyles.container}>
      <Stack.Screen options={{ title: 'Salas Livres' }} />
      
      <FlatList
        data={salas}
        keyExtractor={(item) => item.id}
        renderItem={renderSala}
        contentContainerStyle={globalStyles.content}
        ListEmptyComponent={<EmptyState message="Nenhuma sala encontrada." />}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={globalStyles.title}>Disponibilidade de Salas</Text>
            <Text style={styles.lastUpdate}>Atualizado em tempo real</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    color: colors.gray,
    fontSize: 16,
  },
  header: {
    marginBottom: 16,
  },
  lastUpdate: {
    fontSize: 12,
    color: colors.gray,
    fontStyle: 'italic',
  },
  salaCard: {
    borderLeftWidth: 5,
    borderLeftColor: colors.primary,
  },
  salaHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  salaName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.secondary,
  },
  salaFloor: {
    fontSize: 14,
    color: colors.gray,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: colors.white,
    fontSize: 10,
    fontWeight: 'bold',
  },
  salaFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: colors.lightGray,
    paddingTop: 8,
  },
  nextClassText: {
    fontSize: 13,
    color: colors.gray,
    marginLeft: 6,
  }
});
