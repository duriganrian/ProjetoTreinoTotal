/**
 * Classe Pessoa representa uma entidade genérica de pessoa com atributos como nome, CPF, data de nascimento,
 * celular, endereço, email e senha. Fornece métodos para acessar e modificar esses atributos.
 */
export class Pessoa {
    private nome: string; // Nome da pessoa
    private cpf: string; // CPF da pessoa
    private data_nascimento: Date; // Data de nascimento da pessoa
    private celular: string; // Celular da pessoa
    private endereco: string; // Endereço da pessoa
    private email: string; // Email da pessoa
  
    /**
     * Construtor da classe Pessoa.
     * @param _nome Nome da pessoa
     * @param _cpf CPF da pessoa
     * @param _data_nascimento Data de nascimento da pessoa
     * @param _celular Celular da pessoa
     * @param _endereco Endereço da pessoa
     * @param _email Email da pessoa
     */
    constructor(_nome: string, _cpf: string, _data_nascimento: Date, _celular: string, _endereco: string, _email: string) {
      this.nome = _nome;
      this.cpf = _cpf;
      this.data_nascimento = _data_nascimento;
      this.celular = _celular;
      this.endereco = _endereco;
      this.email = _email;
    }
  
    // Getters
  
    /**
     * Retorna o nome da pessoa.
     * @returns Nome da pessoa
     */
    getNome(): string {
      return this.nome;
    }
  
    /**
     * Retorna o CPF da pessoa.
     * @returns CPF da pessoa
     */
    getCpf(): string {
      return this.cpf;
    }
  
    /**
     * Retorna a data de nascimento da pessoa.
     * @returns Data de nascimento da pessoa
     */
    getDataNascimento(): Date {
      return this.data_nascimento;
    }
  
    /**
     * Retorna o celular da pessoa.
     * @returns Celular da pessoa
     */
    getCelular(): string {
      return this.celular;
    }
  
    /**
     * Retorna o endereço da pessoa.
     * @returns Endereço da pessoa
     */
    getEndereco(): string {
      return this.endereco;
    }
  
    /**
     * Retorna o email da pessoa.
     * @returns Email da pessoa
     */
    getEmail(): string {
      return this.email;
    }
  
    // Setters
  
    /**
     * Define o nome da pessoa.
     * @param nome Nome da pessoa
     */
    setNome(nome: string): void {
      this.nome = nome;
    }
  
    /**
     * Define o CPF da pessoa.
     * @param cpf CPF da pessoa
     */
    setCpf(cpf: string): void {
      this.cpf = cpf;
    }
  
    /**
     * Define a data de nascimento da pessoa.
     * @param data_nascimento Data de nascimento da pessoa
     */
    setDataNascimento(data_nascimento: Date): void {
      this.data_nascimento = data_nascimento;
    }
  
    /**
     * Define o celular da pessoa.
     * @param celular Telefone da pessoa
     */
    setCelular(celular: string): void {
      this.celular = celular;
    }
  
    /**
     * Define o endereço da pessoa.
     * @param endereco Endereço da pessoa
     */
    setEndereco(endereco: string): void {
      this.endereco = endereco;
    }
  
    /**
     * Define o email da pessoa.
     * @param email Email da pessoa
     */
    setEmail(email: string): void {
      this.email = email;
    }
  }