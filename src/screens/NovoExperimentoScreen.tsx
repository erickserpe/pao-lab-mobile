import React, { useState } from 'react';
import { Text, StyleSheet, TextInput, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { COLORS } from '../constants/theme';
import { CategoriaPao, ExperimentoInput } from '../types/bread';
import { addExperimento } from '../services/db';

export function NovoExperimentoScreen() {
  const [nome, setNome] = useState('');
  const [categoria] = useState<CategoriaPao>('Sourdough');
  const [farinhaG, setFarinhaG] = useState('500');
  const [hidratacaoPct, setHidratacaoPct] = useState('70');
  const [fermentacaoHoras, setFermentacaoHoras] = useState('24');
  const [notaGeral, setNotaGeral] = useState('5');
  const [observacoes, setObservacoes] = useState('');

  const handleSalvar = async () => {
    const hidratacao = parseInt(hidratacaoPct, 10);

    if (isNaN(hidratacao) || hidratacao < 50 || hidratacao > 100) {
      Alert.alert('Erro de Validação', 'A hidratação deve estar entre 50% e 100%.');
      return;
    }

    if (!nome.trim()) {
      Alert.alert('Erro de Validação', 'O nome do experimento é obrigatório.');
      return;
    }

    const novoExp: ExperimentoInput = {
      nome,
      categoria,
      data: new Date().toISOString().split('T')[0],
      farinha_id: 1,
      farinha_g: parseInt(farinhaG, 10) || 500,
      hidratacao_pct: hidratacao,
      fermentacao_horas: parseFloat(fermentacaoHoras) || 1,
      inoculacao_levain_pct: 20,
      avaliacao: { geral: parseInt(notaGeral, 10) || 5, miolo: 5, crosta: 5 },
      observacoes,
      favorito: false,
    };

    try {
      await addExperimento(novoExp);
      Alert.alert('Sucesso', 'Experimento cadastrado no PaoLab!');
      setNome('');
      setObservacoes('');
    } catch (err) {
      Alert.alert('Erro', 'Não foi possível salvar o experimento.');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.label}>Nome da Fornada</Text>
      <TextInput style={styles.input} value={nome} onChangeText={setNome} placeholder="Ex: Pão de fermentação natural" />

      <Text style={styles.label}>Farinha (g)</Text>
      <TextInput style={styles.input} value={farinhaG} onChangeText={setFarinhaG} keyboardType="numeric" />

      <Text style={styles.label}>Hidratação (%) [50% - 100%]</Text>
      <TextInput style={styles.input} value={hidratacaoPct} onChangeText={setHidratacaoPct} keyboardType="numeric" />

      <Text style={styles.label}>Fermentação Total (Horas)</Text>
      <TextInput style={styles.input} value={fermentacaoHoras} onChangeText={setFermentacaoHoras} keyboardType="numeric" />

      <Text style={styles.label}>Nota Geral (1 a 5)</Text>
      <TextInput style={styles.input} value={notaGeral} onChangeText={setNotaGeral} keyboardType="numeric" />

      <Text style={styles.label}>Observações</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        value={observacoes}
        onChangeText={setObservacoes}
        multiline
        numberOfLines={3}
      />

      <TouchableOpacity style={styles.button} onPress={handleSalvar}>
        <Text style={styles.buttonText}>Registrar Experimento</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background, padding: 16 },
  label: { fontSize: 14, fontWeight: 'bold', color: COLORS.textPrimary, marginTop: 12, marginBottom: 4 },
  input: {
    backgroundColor: COLORS.cardBackground,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    color: COLORS.textPrimary,
  },
  textArea: { height: 80, textAlignVertical: 'top' },
  button: {
    backgroundColor: COLORS.buttonPrimary,
    borderRadius: 8,
    padding: 14,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  buttonText: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },
});
