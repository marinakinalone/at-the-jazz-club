export interface SoundsUrlSchema {
  global: { [key: string]: string }
  memory: { [key: string]: string }
  rightSequence: { [key: string]: string }
}

export const soundsUrl = {
  global: {
    background: 'background.mp3',
    final: 'final.mp3',
  },
  memory: {
    1: '1.mp3',
    2: '2.mp3',
    3: '3.mp3',
    4: '4.mp3',
    5: '5.mp3',
    6: '6.mp3',
    7: '7.mp3',
    8: '8.mp3',
    9: '9.mp3',
    10: '10.mp3',
    11: '11.mp3',
    12: '12.mp3',
    13: '13.mp3',
  },
  rightSequence: {
    dreamer: 'dreamer.mp3',
    note_0: 'note_0.mp3',
    note_1: 'note_1.mp3',
    note_2: 'note_2.mp3',
    note_3: 'note_3.mp3',
    note_4: 'note_4.mp3',
    note_5: 'note_5.mp3',
    note_6: 'note_6.mp3',
    note_7: 'note_7.mp3',
    note_8: 'note_8.mp3',
    note_9: 'note_9.mp3',
  },
} as SoundsUrlSchema
