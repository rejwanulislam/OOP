// ============================================================
// 📘 oopProblem.ts
// OOP Practice Problems (Basic → Advanced) with Solutions
// ============================================================

// ------------------------------------------------------------
// Problem 1: Class & Object (Basic)
// ------------------------------------------------------------
// একটি `Student` class বানাও যার property: name, roll
// একটি method থাকবে showInfo() যা student-এর নাম ও রোল প্রিন্ট করবে।

class Student {
  constructor(public name: string, public roll: number) {}

  showInfo() {
    console.log(`Name: ${this.name}, Roll: ${this.roll}`);
  }
}

const student1 = new Student("Rejwanul Islam", 101);
student1.showInfo();
// Output: Name: Rejwanul Islam, Roll: 101


// ------------------------------------------------------------
// Problem 2: Constructor + readonly (Basic)
// ------------------------------------------------------------
// একটি `InvoiceItem` class বানাও যার `invoiceId` readonly হবে
// (একবার সেট হবে, পরে change করা যাবে না), কিন্তু `quantity` change করা যাবে।

class InvoiceItem {
  readonly invoiceId: string;
  quantity: number;

  constructor(invoiceId: string, quantity: number) {
    this.invoiceId = invoiceId;
    this.quantity = quantity;
  }

  updateQuantity(newQuantity: number) {
    this.quantity = newQuantity;
  }
}

const invoice1 = new InvoiceItem("INV-2026-001", 5);
invoice1.updateQuantity(10);
console.log(invoice1);
// invoice1.invoiceId = "INV-999"; // ❌ Error: readonly property


// ------------------------------------------------------------
// Problem 3: Encapsulation (Intermediate)
// ------------------------------------------------------------
// একটি `BankAccount` class বানাও যেখানে balance `private` থাকবে।
// deposit() এবং withdraw() method দিয়ে balance manage হবে।
// Withdraw করার সময় balance-এর চেয়ে বেশি amount চাইলে error message দেখাবে।

class BankAccount {
  private balance: number;

  constructor(initialBalance: number) {
    this.balance = initialBalance;
  }

  deposit(amount: number) {
    this.balance += amount;
  }

  withdraw(amount: number) {
    if (amount > this.balance) {
      console.log("❌ Insufficient balance!");
      return;
    }
    this.balance -= amount;
  }

  getBalance() {
    return this.balance;
  }
}

const account1 = new BankAccount(5000);
account1.deposit(1500);
account1.withdraw(2000);
console.log(account1.getBalance()); // 4500
account1.withdraw(100000); // ❌ Insufficient balance!


// ------------------------------------------------------------
// Problem 4: Getter & Setter (Intermediate)
// ------------------------------------------------------------
// একটি `Temperature` class বানাও যেখানে celsius সেট করলে
// getter দিয়ে fahrenheit-এ convert করে দেখানো যাবে।
// Setter-এ validation থাকবে: -273.15 এর কম হলে error দেবে (absolute zero)।

class Temperature {
  private _celsius: number = 0;

  set celsius(value: number) {
    if (value < -273.15) {
      throw new Error("Temperature cannot be below absolute zero!");
    }
    this._celsius = value;
  }

  get celsius() {
    return this._celsius;
  }

  get fahrenheit() {
    return (this._celsius * 9) / 5 + 32;
  }
}

const temp = new Temperature();
temp.celsius = 25;
console.log(temp.celsius);    // 25
console.log(temp.fahrenheit); // 77


// ------------------------------------------------------------
// Problem 5: Inheritance (Intermediate)
// ------------------------------------------------------------
// একটি `Employee` base class বানাও (name, baseSalary)।
// `Manager` class সেটাকে extend করবে এবং নিজস্ব bonus property যোগ করবে।
// Manager-এর একটি method থাকবে যা total salary (base + bonus) হিসাব করবে।

class Employee {
  constructor(public name: string, protected baseSalary: number) {}

  getBaseSalary() {
    return this.baseSalary;
  }
}

class Manager extends Employee {
  constructor(name: string, baseSalary: number, private bonus: number) {
    super(name, baseSalary);
  }

  getTotalSalary() {
    return this.baseSalary + this.bonus;
  }
}

const manager1 = new Manager("Nishat", 60000, 15000);
console.log(manager1.getTotalSalary()); // 75000


// ------------------------------------------------------------
// Problem 6: Polymorphism (Intermediate)
// ------------------------------------------------------------
// একটি `Discount` base class বানাও যার একটি method applyDiscount(price).
// `FestivalDiscount` এবং `NewUserDiscount` — দুটো child class বানাও,
// প্রতিটাতে applyDiscount() ভিন্নভাবে override করা থাকবে।

class Discount {
  applyDiscount(price: number): number {
    return price; // কোনো discount নেই (default)
  }
}

class FestivalDiscount extends Discount {
  applyDiscount(price: number): number {
    return price - price * 0.2; // 20% ছাড়
  }
}

class NewUserDiscount extends Discount {
  applyDiscount(price: number): number {
    return price - 100; // ফ্ল্যাট ১০০ টাকা ছাড়
  }
}

const discounts: Discount[] = [
  new Discount(),
  new FestivalDiscount(),
  new NewUserDiscount(),
];

discounts.forEach((d) => console.log(d.applyDiscount(1000)));
// 1000
// 800
// 900


// ------------------------------------------------------------
// Problem 7: Abstraction (Advanced)
// ------------------------------------------------------------
// একটি abstract class `Report` বানাও যার abstract method generate().
// `SalesReport` এবং `InventoryReport` — দুটো class সেটা implement করবে।

abstract class Report {
  abstract generate(): string;

  printReport() {
    console.log(`📄 Report: ${this.generate()}`);
  }
}

class SalesReport extends Report {
  constructor(private totalSales: number) {
    super();
  }
  generate(): string {
    return `Total Sales: ৳${this.totalSales}`;
  }
}

class InventoryReport extends Report {
  constructor(private itemsInStock: number) {
    super();
  }
  generate(): string {
    return `Items in Stock: ${this.itemsInStock}`;
  }
}

const salesReport = new SalesReport(250000);
const inventoryReport = new InventoryReport(340);
salesReport.printReport();     // 📄 Report: Total Sales: ৳250000
inventoryReport.printReport(); // 📄 Report: Items in Stock: 340


// ------------------------------------------------------------
// Problem 8: Static Members (Advanced)
// ------------------------------------------------------------
// একটি `IdGenerator` class বানাও যা static counter ব্যবহার করে
// প্রতিটা নতুন object তৈরি হওয়ার সময় একটি ইউনিক, ক্রমবর্ধমান id দেয়।

class IdGenerator {
  private static nextId = 1;
  public readonly id: number;

  constructor() {
    this.id = IdGenerator.nextId++;
  }
}

const idGen1 = new IdGenerator();
const idGen2 = new IdGenerator();
const idGen3 = new IdGenerator();
console.log(idGen1.id, idGen2.id, idGen3.id); // 1 2 3


// ------------------------------------------------------------
// Problem 9: Generics with Class (Advanced)
// ------------------------------------------------------------
// একটি generic `Queue<T>` class বানাও যেখানে enqueue(), dequeue()
// এবং peek() method থাকবে, যা যেকোনো type-এর data নিতে পারবে।

class Queue<T> {
  private items: T[] = [];

  enqueue(item: T) {
    this.items.push(item);
  }

  dequeue(): T | undefined {
    return this.items.shift();
  }

  peek(): T | undefined {
    return this.items[0];
  }

  get size() {
    return this.items.length;
  }
}

const taskQueue = new Queue<string>();
taskQueue.enqueue("Design API");
taskQueue.enqueue("Write Tests");
taskQueue.enqueue("Deploy App");

console.log(taskQueue.peek());    // Design API
console.log(taskQueue.dequeue()); // Design API
console.log(taskQueue.size);      // 2


// ------------------------------------------------------------
// Problem 10: Interface + Multiple Classes (Advanced)
// ------------------------------------------------------------
// একটি `Payable` interface বানাও যার একটি method pay(amount).
// `BkashPayment` এবং `CardPayment` class সেটা implement করবে।
// একটি function বানাও processPayment(payable, amount) যা যেকোনো
// Payable object নিয়ে কাজ করতে পারবে (Polymorphism + Interface combined)।

interface Payable {
  pay(amount: number): void;
}

class BkashPayment implements Payable {
  pay(amount: number) {
    console.log(`Paid ৳${amount} via bKash ✅`);
  }
}

class CardPayment implements Payable {
  pay(amount: number) {
    console.log(`Paid ৳${amount} via Card ✅`);
  }
}

function processPayment(method: Payable, amount: number) {
  method.pay(amount);
}

processPayment(new BkashPayment(), 500); // Paid ৳500 via bKash ✅
processPayment(new CardPayment(), 1200); // Paid ৳1200 via Card ✅
