import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import { COLORS } from '../constants/theme';
import { fetchClimaAtual } from '../services/weather';
import { getExperimentos } from '../services/db';
import { ClimaData, Experimento } from '../types/bread';
import { Ionicons } from '@expo/vector-icons';

export function PainelScreen() {
  const [clima, setClima] = useState<ClimaData | null>(null);
  const [experimentos, setExperimentos] = useState<Experimento[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const carregarDados = async () => {
    setRefreshing(true);
    const climaData = await fetchClimaAtual();
    const expsData = await getExperimentos();
    setClima(climaData);
    setExperimentos(expsData);
    setRefreshing(false);
  };

  useEffect(() => {
    carregarDados();
  }, []);

  const totalProjetos = experimentos.length;
  const notaMedia =
    totalProjetos > 0
      ? (
          experimentos.reduce((acc, e) => acc + e.avaliacao.geral, 0) / totalProjetos
        ).toFixed(1)
      : '0.0';

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={carregarDados} />
      }
    >
      <View style={styles.weatherCard}>
        <View style={styles.weatherHeader}>
          <Ionicons name="partly-sunny-outline" size={20} color="#FFF" />
          <Text style={styles.weatherTitle}>Ambiente Atual</Text>
        </View>

        {clima ? (
          <View style={styles.weatherContent}>
            <Text style={styles.weatherTemp}>{clima.temperatura}°C</Text>
            <Text style={styles.weatherHum}>Umidade: {clima.umidade}%</Text>
          </View>
        ) : (
          <Text style={styles.weatherFallback}>Dados climáticos indisponíveis</Text>
        )}
      </View>

      <Text style={styles.sectionTitle}>Estatísticas do Laboratório</Text>
      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{totalProjetos}</Text>
          <Text style={styles.statLabel}>Fornadas</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{notaMedia} ★</Text>
          <Text style={styles.statLabel}>Média Geral</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background, padding: 16 },
  weatherCard: { backgroundColor: COLORS.weather, borderRadius: 12, padding: 16, marginBottom: 20 },
  weatherHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 },
  weatherTitle: { color: '#FFF', fontWeight: 'bold', fontSize: 16 },
  weatherContent: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline' },
  weatherTemp: { color: '#FFF', fontSize: 32, fontWeight: 'bold' },
  weatherHum: { color: '#E0F2F1', fontSize: 14 },
  weatherFallback: { color: '#E0F2F1', fontStyle: 'italic' },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: COLORS.textPrimary, marginBottom: 12 },
  statsRow: { flexDirection: 'row', gap: 12 },
  statCard: {
    flex: 1,
    backgroundColor: COLORS.cardBackground,
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
  },
  statNumber: { fontSize: 24, fontWeight: 'bold', color: COLORS.buttonPrimary },
  statLabel: { fontSize: 12, color: COLORS.accentSecondary, marginTop: 4 },
});
