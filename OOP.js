class AccountBook {
  constructor(name, author) {
    this.name = name;
    this.author = author;
    this.list = [];
    this.total = 0;
    AccountBook.instances.push(this);
  }

  deposit(comment, amount) {
    if (this.total + amount < 0) {
      throw new Error(`Not enough balance for ${this.name}`);
    }
    this.total += amount;
    this.list.push({
      comment,
      amount
    });
  }

  print() {
    let result = `===${this.name} by ${this.author}===\n`;
    this.list.forEach(item => {
      result += `${item.amount < 0 ? "출금" : "입금"}\t${item.comment}\t${
        item.amount
      }원\n`;
    });
    result += `===${this.total}===\n`;
    console.log(result);
  }

  static printAll() {
    AccountBook.instances.forEach(item => item.print());
  }
}

AccountBook.instances = [];

const ac1 = new AccountBook("장부1", "임한울");
ac1.deposit("월급", 400);
ac1.deposit("집세", -150);
const ac2 = new AccountBook("장부2", "김철수");
ac2.deposit("월급", 200);

ac2.print();
AccountBook.printAll();
