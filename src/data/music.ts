import type { Track, MusicPractice } from '@/types'

export const tracks: Track[] = [
  {
    title: 'Morning Light',
    category: 'Composition',
    soundcloudUrl:
      'https://w.soundcloud.com/player/?url=https%3A%2F%2Fapi.soundcloud.com%2Ftracks%2F2272593767&secret_token=s-KqyLeQYUjYz&color=%23E5A823&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false&visual=false&buying=false&sharing=false&download=false',
  },
  {
    title: "I'll Find a Way",
    category: 'Composition',
    soundcloudUrl:
      'https://w.soundcloud.com/player/?url=https%3A%2F%2Fapi.soundcloud.com%2Ftracks%2F2272592135&secret_token=s-yUDLmiAkGtC&color=%23E5A823&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false&visual=false&buying=false&sharing=false&download=false',
  },
]

export const practices: MusicPractice[] = [
  { icon: '🎹', title: 'Piano' },
  { icon: '🎸', title: 'Ukulélé' },
  { icon: '🎤', title: 'Chant' },
  { icon: '🎧', title: 'MAO' },
]
