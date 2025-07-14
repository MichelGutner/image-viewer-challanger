export * from './pictures';
declare global {
    interface String {
      toPTBrString(): string;
    }
  }
  
  String.prototype.toPTBrString = function () {
    return new Date(this.toString()).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };
  
  export {};
  