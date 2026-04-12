import type { Track, MusicPractice } from '@/types'

export const tracks: Track[] = [
  {
    title: 'Morning Light',
    soundcloudUrl:
      'https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/cerveaux-laura/morning-light/s-KqyLeQYUjYz&color=%236b7fe8&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false',
  },
  {
    title: "I'll Find a Way",
    soundcloudUrl:
      'https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/cerveaux-laura/ill-find-a-way/s-yUDLmiAkGtC&color=%236b7fe8&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false',
  },
]

export const practices: MusicPractice[] = [
  { icon: '🎹', title: 'Piano' },
  { icon: '🎸', title: 'Ukulélé' },
  { icon: '🎤', title: 'Chant' },
  { icon: '🎧', title: 'MAO' },
]
