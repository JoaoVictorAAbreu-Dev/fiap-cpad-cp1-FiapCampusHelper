import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, Modal, Alert } from 'react-native';
import { Stack } from 'expo-router';
import { colors, globalStyles } from '../styles/theme';
import Card from '../components/Card';
import Button from '../components/Button';
import Input from '../components/Input';
import EmptyState from '../components/EmptyState';
import { Ionicons } from '@expo/vector-icons';

const initialItems = [
  { id: '1', item: 'Chave de Carro', location: 'Pátio Central', date: '20/03/2024', status: 'perdido' },
  { id: '2', item: 'Caderno Espiral', location: 'Biblioteca', date: '18/03/2024', status: 'achado' },
  { id: '3', item: 'Garrafa Térmica', location: 'Lab 101', date: '21/03/2024', status: 'achado' },
];

export default function AchadosScreen() {
  const [items, setItems] = useState(initialItems);
  const [modalVisible, setModalVisible] = useState(false);
  const [newItem, setNewItem] = useState({ item: '', location: '', date: new Date().toLocaleDateString('pt-BR') });

  const handleAddItem = () => {
    if (!newItem.item || !newItem.location) {
      Alert.alert("Erro", "Por favor, preencha todos os campos.");
      return;
    }

    const itemToAdd = {
      id: Math.random().toString(),
      ...newItem,
      status: 'perdido'
    };

    setItems([itemToAdd, ...items]);
    setNewItem({ item: '', location: '', date: new Date().toLocaleDateString('pt-BR') });
    setModalVisible(false);
    Alert.alert("Sucesso", "Item registrado com sucesso!");
  };

  const handleDeleteItem = (id) => {
    Alert.alert(
      "Remover Item",
      "Tem certeza que deseja remover este registro?",
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Remover", onPress: () => setItems(items.filter(i => i.id !== id)), style: "destructive" }
      ]
    );
  };

  const renderItem = ({ item }) => (
    <Card style={styles.itemCard}>
      <View style={styles.itemHeader}>
        <Text style={styles.itemName}>{item.item}</Text>
        <View style={[styles.badge, { backgroundColor: item.status === 'achado' ? colors.success : colors.error }]}>
          <Text style={styles.badgeText}>{item.status.toUpperCase()}</Text>
        </View>
      </View>
      <Text style={styles.itemDetail}><Ionicons name="location-outline" /> {item.location}</Text>
      <Text style={styles.itemDetail}><Ionicons name="calendar-outline" /> {item.date}</Text>
      
      <Button 
        title="Remover Registro" 
        onPress={() => handleDeleteItem(item.id)}
        type="secondary"
        style={styles.deleteButton}
      />
    </Card>
  );

  return (
    <View style={globalStyles.container}>
      <Stack.Screen options={{ title: 'Achados e Perdidos' }} />
      
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={globalStyles.content}
        ListEmptyComponent={<EmptyState message="Nenhum item registrado." icon="search-outline" />}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={globalStyles.title}>Itens Registrados</Text>
            <Button title="Novo Registro" onPress={() => setModalVisible(true)} />
          </View>
        }
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Registrar Item Perdido</Text>
            
            <Input 
              label="O que você perdeu?" 
              placeholder="Ex: Carteira, Celular..." 
              value={newItem.item}
              onChangeText={(text) => setNewItem({...newItem, item: text})}
            />
            
            <Input 
              label="Onde foi visto pela última vez?" 
              placeholder="Ex: Sala 402, Cantina..." 
              value={newItem.location}
              onChangeText={(text) => setNewItem({...newItem, location: text})}
            />

            <View style={styles.modalButtons}>
              <Button title="Cancelar" onPress={() => setModalVisible(false)} type="secondary" style={{ flex: 1, marginRight: 8 }} />
              <Button title="Salvar" onPress={handleAddItem} style={{ flex: 1 }} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    marginBottom: 16,
  },
  itemCard: {
    borderLeftWidth: 5,
    borderLeftColor: colors.secondary,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.secondary,
  },
  itemDetail: {
    fontSize: 14,
    color: colors.gray,
    marginBottom: 4,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  badgeText: {
    color: colors.white,
    fontSize: 10,
    fontWeight: 'bold',
  },
  deleteButton: {
    marginTop: 12,
    paddingVertical: 8,
    borderColor: colors.error,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 24,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: colors.primary,
  },
  modalButtons: {
    flexDirection: 'row',
    marginTop: 16,
  }
});
