export default async function postRun({ result = '', context = {} }) {
  const timestamp = new Date().toISOString();
  const { projectName, ticker } = context;

  const footerLines = [
    '',
    '---',
    `Forge v1.0 run finished at ${timestamp}.`,
    projectName ? `Project: ${projectName}${ticker ? ` (${ticker})` : ''}` : '',
    'Remember to archive artefacts in `outputs/` and review the run log before going live.'
  ].filter(Boolean);

  return `${result}${footerLines.join('\n')}\n`;
}

