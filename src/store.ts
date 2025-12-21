export type Step =
  | 'intro'
  | 'puzzle-activity'
  | 'puzzle-date'
  | 'puzzle-city'
  | 'final-place'
  | 'final-reveal'

export type ActivityOption = 'paint-ball' | 'restaurant' | 'new-york' | 'nothing'
export type CityOption = 'Londres' | 'Rovaniemi' | 'New York' | 'Paris'
export type PlaceOption = 'La Cuisine' | 'La Chambre' | 'La Cheminée' | 'Le Jardin'

export interface GameState {
  step: Step
  selectedEnigma?: string
  activityAnswer?: ActivityOption
  dateAnswer?: string
  cityAnswer?: CityOption
  placeAnswer?: PlaceOption
  success: {
    intro: boolean
    activity: boolean
    date: boolean
    city: boolean
    place: boolean
  }
}

import { reactive } from 'vue'

export const state: GameState = reactive({
  step: 'intro',
  success: { intro: false, activity: false, date: false, city: false, place: false },
})

export function goNext(current: Step) {
  const order: Step[] = ['intro', 'puzzle-activity', 'puzzle-date', 'puzzle-city', 'final-place', 'final-reveal']
  const i = order.indexOf(current)
  if (i >= 0 && i < order.length - 1) {
    state.step = order[i + 1]
  }
}
