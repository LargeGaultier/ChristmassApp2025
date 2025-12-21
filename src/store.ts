export type Step =
  | 'intro'
  | 'puzzle-activity'
  | 'puzzle-date'
  | 'puzzle-city'
  | 'final-reveal'

export type ActivityOption = 'paint-ball' | 'restaurant' | 'new-york' | 'nothing'
export type CityOption = 'Londres' | 'Rovaniemi' | 'New York' | 'Paris'

export interface GameState {
  step: Step
  selectedEnigma?: string
  activityAnswer?: ActivityOption
  dateAnswer?: string
  cityAnswer?: CityOption
  success: {
    intro: boolean
    activity: boolean
    date: boolean
    city: boolean
  }
}

import { reactive } from 'vue'

export const state: GameState = reactive({
  step: 'intro',
  success: { intro: false, activity: false, date: false, city: false },
})

export function goNext(current: Step) {
  const order: Step[] = ['intro', 'puzzle-activity', 'puzzle-date', 'puzzle-city', 'final-reveal']
  const i = order.indexOf(current)
  if (i >= 0 && i < order.length - 1) {
    state.step = order[i + 1]
  }
}
