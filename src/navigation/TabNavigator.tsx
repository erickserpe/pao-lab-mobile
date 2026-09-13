import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/theme';

import { PainelScreen } from '../screens/PainelScreen';
import { NovoExperimentoScreen } from '../screens/NovoExperimentoScreen';
import { LaboratorioScreen } from '../screens/LaboratorioScreen';

const Tab = createBottomTabNavigator();

export function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerStyle: { backgroundColor: COLORS.background },
        headerTintColor: COLORS.textPrimary,
        headerTitleStyle: { fontWeight: 'bold' },
        tabBarActiveTintColor: COLORS.buttonPrimary,
        tabBarInactiveTintColor: COLORS.accentSecondary,
        tabBarStyle: { backgroundColor: COLORS.cardBackground, borderTopColor: COLORS.border },
        tabBarIcon: ({ color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = 'ellipse';

          if (route.name === 'Painel') iconName = 'analytics-outline';
          else if (route.name === 'NovoPao') iconName = 'add-circle-outline';
          else if (route.name === 'Laboratorio') iconName = 'journal-outline';

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Painel" component={PainelScreen} options={{ title: 'Painel' }} />
      <Tab.Screen name="NovoPao" component={NovoExperimentoScreen} options={{ title: 'Novo Pão' }} />
      <Tab.Screen name="Laboratorio" component={LaboratorioScreen} options={{ title: 'Laboratório' }} />
    </Tab.Navigator>
  );
}
