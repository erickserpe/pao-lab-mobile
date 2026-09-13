import { ClimaData } from '../types/bread';

export async function fetchClimaAtual(
  lat: number = -25.87,
  lon: number = -50.38
): Promise<ClimaData | null> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&hourly=relativehumidity_2m`,
      { signal: controller.signal }
    );
    clearTimeout(timeoutId);

    if (!response.ok) return null;

    const data = await response.json();
    return {
      temperatura: Math.round(data.current_weather.temperature),
      umidade: data.hourly?.relativehumidity_2m?.[0] ?? 60,
    };
  } catch (error) {
    console.warn('Serviço de clima indisponível:', error);
    return null;
  }
}
