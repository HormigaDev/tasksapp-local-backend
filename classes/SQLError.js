class SQLError extends Error {
  constructor(message){
    super(message);
    this.name = 'SQLError';
  }
}

module.exports = SQLError;