export enum TRANSACTION_TYPE {
  RECIVE = 'RECIVE',
  SEND = 'SEND',
}
export class Transaction {
  private static list: Transaction[] = []
  static id: number = 0
  public id: number
  public date: Date

  constructor(
    public amount: number,
    public from_id: number,
    public to_id: number,
  ) {
    this.id = Number(Transaction.id++)
    this.date = new Date()
  }

  static create(
    amount: number,
    from_id: number,
    to_id: number,
  ): Transaction {
    const transaction = new Transaction(
      amount,
      from_id,
      to_id,
    )

    this.list.unshift(transaction)

    return transaction
  }

  static getByID(id: number): Transaction | null {
    const t = this.list.find((v) => v.id == id)

    return t || null
  }

  static getTransactions(id: number): Transaction[] {
    return this.list.filter(
      (v) => v.from_id === id || v.to_id === id,
    )
  }
}
