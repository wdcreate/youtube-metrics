import type { MetricsPayload } from '../types/metrics'

export const sendMetrics = async (payload: MetricsPayload): Promise<void> => {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 5000)

  try {
    await fetch('/metrics', {
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
