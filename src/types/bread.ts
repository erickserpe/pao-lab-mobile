export type CategoriaPao =
  | 'Sourdough'
  | 'Ciabatta'
  | 'Baguette'
  | 'Focaccia'
  | 'Brioche'
  | 'Outro';

export interface Farinha {
  id: number;
  nome: string;
  marca: string;
  proteina_pct: number;
  observacoes?: string;
}

export interface ClimaData {
  temperatura: number;
  umidade: number;
}

export interface AvaliacaoSensorial {
  geral: number;
  miolo: number;
  crosta: number;
}

export interface Experimento {
  id: number;
  nome: string;
  categoria: CategoriaPao;
  data: string;
  farinha_id: number;
  farinha_g: number;
  hidratacao_pct: number;
  fermentacao_horas: number;
  inoculacao_levain_pct: number;
  clima?: ClimaData | null;
  avaliacao: AvaliacaoSensorial;
  observacoes?: string;
  favorito: boolean;
}

// Formato usado ao criar um novo experimento (ainda sem id gerado pelo banco)
export type ExperimentoInput = Omit<Experimento, 'id'>;
