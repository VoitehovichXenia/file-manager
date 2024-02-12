export const dequoteUserInput = (input) => {
  let processedInput = input;
  if (processedInput.startsWith('\'') && processedInput.endsWith('\'')) {
    processedInput = processedInput.slice(1, processedInput.length - 1)
  }
  return processedInput
}