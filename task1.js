function Account(iban, owner, balance) {
  this.iban = iban;
  this.owner = owner;
  this.balance = balance;
  
  this.deposit = function(amount) {
    if (amount > 0) {
      this.balance += amount;
    } else {
      console.log(`Недопустимое значение для ввода: ${amount}`);
    }
  };

  this.withdraw = function(amount) {
    if (this.balance >= amount) {
        this.balance -= amount;
    } else {
      console.log(`Недостаточно средств на счете ${this.iban}`);
    }
  };

  this.getBalance = function() {
    return (`Ваш баланс: ${this.balance.toFixed(2)}`);
  };
}

const acc1 = new Account("ISR78234327", "John", 1000);
const acc2 = new Account("GE372523242", "Rose", 500);

acc1.deposit(300);       
acc2.withdraw(700);

const accounts = [acc1, acc2];
console.log(accounts);


console.log('-----------------------');
// b

function transfer(from, to, amount) {
  if (from.balance >= amount) {
    from.withdraw(amount);
    to.deposit(amount);
  } else {
    console.log(`Перевод невозможен: недостаточно средств на счете ${from.iban}`);
  }
}

transfer(acc1, acc2, 2300);
console.log(`John, ${acc1.getBalance()}; Rose, ${acc2.getBalance()}`);

transfer(acc1, acc2, 300);
console.log(`John, ${acc1.getBalance()}; Rose, ${acc2.getBalance()}`);

console.log('-----------------------');
// c

function transfer(from, to, amount) {
  const transaction = {
    acc1: from,
    acc2: to,
    amount: amount
  };

  if (from.balance >= amount) {
    from.withdraw(amount);
    to.deposit(amount);

    transaction.transInfo = function() {
      console.log(`Успешный перевод: ${this.amount} с ${this.acc1.iban} на ${this.acc2.iban}`);
    };
  } else {
    transaction.error = "Недостаточно средств на счете списания";
    
    transaction.transInfo = function() {
      console.log(`Ошибка транзакции (${this.error}): не удалось перевести ${this.amount} с ${this.acc1.iban}`);
    };
  }

  return transaction;
}


const result1 = transfer(acc1, acc2, 100); 
result1.transInfo();
console.log(result1); 

console.log('-----------------------');

const result2 = transfer(acc2, acc1, 5000); 
result2.transInfo();
console.log(result2); 

