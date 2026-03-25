import React, { useState, useMemo } from 'react'; 
import { View, Text, FlatList, StyleSheet, Alert, ScrollView, TouchableOpacity } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { colors, globalStyles } from '../styles/theme';
import Card from '../components/Card';
import Button from '../components/Button';
import EmptyState from '../components/EmptyState';
import { Ionicons } from '@expo/vector-icons';

// 1. Nova estrutura de dados: em vez de 'available: boolean', usamos um array de 'reservas'
const initialLabsData = [
  { id: '1', name: 'Laboratório 101', type: 'Informática', capacity: 30, reservations: [] },
  { id: '2', name: 'Laboratório 202', type: 'Redes', capacity: 25, reservations: [] },
  { id: '3', name: 'Laboratório 303', type: 'Maker', capacity: 15, reservations: [] },
  { id: '4', name: 'Laboratório 404', type: 'Química', capacity: 20, reservations: [] },
];

const availableTimes = ['08:00', '10:00', '14:00', '16:00', '19:00'];

// Função auxiliar para gerar os próximos 7 dias
const generateNextDays = () => {
  const days = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date();
    date.setDate(date.getDate() + i);
    days.push({
      id: date.toISOString().split('T')[0], // Formato: YYYY-MM-DD
      display: `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}` // Formato: DD/MM
    });
  }
  return days;
};

export default function AgendamentoScreen() {
  const router = useRouter();
  const [labs, setLabs] = useState(initialLabsData);
  const nextDays = useMemo(() => generateNextDays(), []);
  
  // 2. Novos estados para gerenciar a seleção do usuário
  const [selectedDate, setSelectedDate] = useState(nextDays[0].id);
  const [selectedTime, setSelectedTime] = useState(availableTimes[0]);

  // 3. Função para verificar se o lab está disponível na data/hora selecionada
  const checkAvailability = (lab) => {
    // Se existe alguma reserva nesse lab que bate com o dia e hora selecionados, ele está indisponível
    const isBooked = lab.reservations.some(
      (res) => res.date === selectedDate && res.time === selectedTime
    );
    return !isBooked;
  };

  const handleReserve = (lab) => {
    Alert.alert(
      "Confirmar Reserva",
      `Reservar o ${lab.name} para o dia ${selectedDate.split('-').reverse().join('/')} às ${selectedTime}?`,
      [
        { text: "Cancelar", style: "cancel" },
        { 
          text: "Confirmar", 
          onPress: () => {
            // 4. Atualiza o estado adicionando a nova reserva ao laboratório escolhido
            setLabs(prevLabs => prevLabs.map(l => {
              if (l.id === lab.id) {
                return {
                  ...l,
                  reservations: [...l.reservations, { date: selectedDate, time: selectedTime }]
                };
              }
              return l;
            }));
            Alert.alert("Sucesso", "Reserva realizada com sucesso!");
          } 
        }
      ]
    );
  };

  const renderLabItem = ({ item }) => {
    const isAvailable = checkAvailability(item);

    return (
      <Card style={[styles.labCard, !isAvailable && styles.labCardDisabled]}>
        <View style={styles.labInfo}>
          <View>
            <Text style={styles.labName}>{item.name}</Text>
            <Text style={styles.labType}>{item.type} • {item.capacity} pessoas</Text>
          </View>
          <Ionicons 
            name={isAvailable ? "checkmark-circle" : "close-circle"} 
            size={24} 
            color={isAvailable ? colors.success : colors.error} 
          />
        </View>
        
        <Button 
          title={isAvailable ? "Reservar Agora" : "Indisponível neste horário"} 
          onPress={() => isAvailable && handleReserve(item)}
          type={isAvailable ? "primary" : "secondary"}
          style={!isAvailable && styles.disabledButton}
        />
      </Card>
    );
  };

  return (
    <View style={globalStyles.container}>
      <Stack.Screen options={{ title: 'Agendamento de Labs' }} />
      
      {/* Seção de Seleção de Data */}
      <View style={styles.filtersContainer}>
        <Text style={styles.filterTitle}>Escolha a Data:</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollView}>
          {nextDays.map((day) => (
            <TouchableOpacity 
              key={day.id} 
              style={[styles.chip, selectedDate === day.id && styles.chipSelected]}
              onPress={() => setSelectedDate(day.id)}
            >
              <Text style={[styles.chipText, selectedDate === day.id && styles.chipTextSelected]}>
                {day.display}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Seção de Seleção de Horário */}
        <Text style={styles.filterTitle}>Escolha o Horário:</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollView}>
          {availableTimes.map((time) => (
            <TouchableOpacity 
              key={time} 
              style={[styles.chip, selectedTime === time && styles.chipSelected]}
              onPress={() => setSelectedTime(time)}
            >
              <Text style={[styles.chipText, selectedTime === time && styles.chipTextSelected]}>
                {time}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <FlatList
        data={labs}
        keyExtractor={(item) => item.id}
        renderItem={renderLabItem}
        contentContainerStyle={globalStyles.content}
        ListEmptyComponent={<EmptyState message="Nenhum laboratório encontrado." />}
        ListHeaderComponent={<Text style={globalStyles.title}>Laboratórios</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  filtersContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
    backgroundColor: '#fff', // ou colors.background
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  filterTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333', // ou colors.text
  },
  scrollView: {
    marginBottom: 16,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f0f0f0', // ou colors.grayLight
    marginRight: 8,
  },
  chipSelected: {
    backgroundColor: '#ff006aff', // Troque pelo seu colors.primary
  },
  chipText: {
    fontSize: 14,
    color: '#333',
  },
  chipTextSelected: {
    color: '#fff',
    fontWeight: 'bold',
  },
  labCard: {
    borderLeftWidth: 5,
    borderLeftColor: '#ff006aff', // Troque pelo seu colors.primary
    marginBottom: 12,
  },
  labCardDisabled: {
    borderLeftColor: '#ccc', // ou colors.gray
    opacity: 0.8,
  },
  labInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  labName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333', // ou colors.secondary
  },
  labType: {
    fontSize: 14,
    color: '#666', // ou colors.gray
    marginTop: 2,
  },
  disabledButton: {
    opacity: 0.5,
  }
});