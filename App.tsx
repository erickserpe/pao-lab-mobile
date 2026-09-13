import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View, StyleSheet, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { initDatabase } from './src/services/db';
import { COLORS } from './src/constants/theme';
import { TabNavigator } from './src/navigation/TabNavigator';

export default function App() {
  const [dbReady, setDbReady] = useState(false);
  const [erroDb, setErroDb] = useState<string | null>(null);

  useEffect(() => {
    initDatabase()
      .then(() => setDbReady(true))
      .catch((err) => {
        console.error('Erro detalhado do SQLite:', err);
        setErroDb(String(err));
        setDbReady(true);
      });
  }, []);

  if (!dbReady) {
    return (
      <View style={styles.container}>
        <ActivityIndicator color={COLORS.buttonPrimary} size="large" />
        <Text style={styles.text}>Preparando Laboratório...</Text>
      </View>
    );
  }

  if (erroDb) {
    return (
      <View style={styles.container}>
        <Text style={[styles.text, { color: 'red', fontWeight: 'bold' }]}>
          Ops! Erro no Banco de Dados:
        </Text>
        <Text style={styles.text}>{erroDb}</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <TabNavigator />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF8E8', justifyContent: 'center', alignItems: 'center', padding: 20 },
  text: { color: '#3B2416', marginTop: 12, textAlign: 'center' },
});
