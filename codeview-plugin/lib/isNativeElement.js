// JSX konvencija: mala slova = DOM tag (div, button...), veliko slovo = komponenta
module.exports = function isNativeElement(name) {
  return /^[a-z]/.test(name);
};
