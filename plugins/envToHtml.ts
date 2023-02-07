export default function envToHtml(
  textToReplace = '<!--вставь в меня текст, братан-->',
  newText = ''
) {
  return {
    name: 'envToHtml',
    // @ts-ignore
    transformIndexHtml(html) {
      return html.replace(textToReplace, newText)
    },
  }
}
