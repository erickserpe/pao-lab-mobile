import * as SQLite from 'expo-sqlite';
import { Experimento, ExperimentoInput } from '../types/bread';

const db = SQLite.openDatabaseSync('paolab.db');

// Formato bruto de uma linha retornada pelo SQLite (antes do parse dos campos JSON)
interface ExperimentoRow {
  id: number;
  nome: string;
  categoria: string;
  data: string;
  farinha_id: number;
  farinha_g: number;
  hidratacao_pct: number;
  fermentacao_horas: number;
  inoculacao_levain_pct: number;
  clima_json: string | null;
  avaliacao_json: string;
  observacoes: string | null;
  favorito: number;
}

export const initDatabase = async (): Promise<void> => {
  await db.execAsync(`
    PRAGMA journal_mode = WAL;

    CREATE TABLE IF NOT EXISTS farinhas (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      marca TEXT NOT NULL,
      proteina_pct REAL NOT NULL,
      observacoes TEXT
    );

    CREATE TABLE IF NOT EXISTS experimentos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      categoria TEXT NOT NULL,
      data TEXT NOT NULL,
      farinha_id INTEGER NOT NULL,
      farinha_g INTEGER NOT NULL,
      hidratacao_pct INTEGER NOT NULL,
      fermentacao_horas REAL NOT NULL,
      inoculacao_levain_pct REAL NOT NULL,
      clima_json TEXT,
      avaliacao_json TEXT NOT NULL,
      observacoes TEXT,
      favorito INTEGER NOT NULL DEFAULT 0,
      FOREIGN KEY (farinha_id) REFERENCES farinhas (id)
    );
  `);
};

export const getExperimentos = async (): Promise<Experimento[]> => {
  const rows = await db.getAllAsync<ExperimentoRow>(
    'SELECT * FROM experimentos ORDER BY id DESC;'
  );

  return rows.map((row) => ({
    id: row.id,
    nome: row.nome,
    categoria: row.categoria as Experimento['categoria'],
    data: row.data,
    farinha_id: row.farinha_id,
    farinha_g: row.farinha_g,
    hidratacao_pct: row.hidratacao_pct,
    fermentacao_horas: row.fermentacao_horas,
    inoculacao_levain_pct: row.inoculacao_levain_pct,
    clima: row.clima_json ? JSON.parse(row.clima_json) : null,
    avaliacao: JSON.parse(row.avaliacao_json),
    observacoes: row.observacoes ?? undefined,
    favorito: Boolean(row.favorito),
  }));
};

export const addExperimento = async (exp: ExperimentoInput): Promise<number> => {
  const result = await db.runAsync(
    `INSERT INTO experimentos (
      nome, categoria, data, farinha_id, farinha_g, hidratacao_pct,
      fermentacao_horas, inoculacao_levain_pct, clima_json, avaliacao_json,
      observacoes, favorito
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
    [
      exp.nome,
      exp.categoria,
      exp.data,
      exp.farinha_id,
      exp.farinha_g,
      exp.hidratacao_pct,
      exp.fermentacao_horas,
      exp.inoculacao_levain_pct,
      exp.clima ? JSON.stringify(exp.clima) : null,
      JSON.stringify(exp.avaliacao),
      exp.observacoes || '',
      exp.favorito ? 1 : 0,
    ]
  );
  return result.lastInsertRowId;
};

export const toggleFavorito = async (id: number, atual: boolean): Promise<void> => {
  await db.runAsync('UPDATE experimentos SET favorito = ? WHERE id = ?;', [
    atual ? 0 : 1,
    id,
  ]);
};

export default db;
