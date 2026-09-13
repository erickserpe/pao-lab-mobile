import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { COLORS } from '../constants/theme';
import { Experimento } from '../types/bread';
import { getExperimentos, toggleFavorito } from '../services/db';
import { Ionicons } from '@expo/vector-icons';

export function LaboratorioScreen() {
  const [experimentos, setExperimentos] = useState<Experimento[]>([]);

  const carregarHistorico = async () => {
    const dados = await getExperimentos();
    setExperimentos(dados);
  };

  useFocusEffect(
    useCallback(() => {
      carregarHistorico();
    }, [])
  );

  const handleFavorito = async (item: Experimento) => {
    await toggleFavorito(item.id, item.favorito);
    carregarHistorico();
  };

  return (
    <View style={styles.container}>
      {experimentos.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Nenhum experimento registrado ainda.</Text>
        </View>
      ) : (
        <FlatList
          data={experimentos}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <Text style={styles.cardCategory}>{item.categoria}</Text>
                <TouchableOpacity onPress={() => handleFavorito(item)}>
                  <Ionicons
                    name={item.favorito ? 'star' : 'star-outline'}
                    size={22}
                    color={COLORS.starRating}
                  />
                </TouchableOpacity>
              </View>
              <Text style={styles.cardTitle}>{item.nome}</Text>
              <Text style={styles.cardDetails}>
                Hidratação: {item.hidratacao_pct}% | Fermentação: {item.fermentacao_horas}h
              </Text>
              <Text style={styles.cardRating}>Nota: {item.avaliacao.geral} ★</Text>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background, padding: 16 },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyText: { color: COLORS.accentSecondary, fontSize: 16 },
  card: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  cardCategory: { fontSize: 12, fontWeight: 'bold', color: COLORS.accentSecondary, textTransform: 'uppercase' },
  cardTitle: { fontSize: 18, fontWeight: 'bold', color: COLORS.textPrimary, marginVertical: 4 },
  cardDetails: { fontSize: 14, color: COLORS.textPrimary },
  cardRating: { fontSize: 14, fontWeight: 'bold', color: COLORS.starRating, marginTop: 6 },
});
