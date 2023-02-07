export {}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $czLyrics: (key: string) => string
  }
}
