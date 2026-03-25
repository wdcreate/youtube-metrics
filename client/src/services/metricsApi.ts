import type { MetricsPayload } from '../types/metrics'
const API_URL = import.meta.env.VITE_API_URL

export const sendMetrics = async (payload: MetricsPayload): Promise<void> => {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 5000)

  try {
    await fetch(`${API_URL}/metrics`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: controller.signal,
    })
  } catch (error) {
    console.warn('[metrics] Failed to send:', error)
  } finally {
    clearTimeout(timeout)
  }
}
