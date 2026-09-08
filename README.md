# 🎯 Object-Oriented Programming (OOP) in TypeScript

> **Basic থেকে Advanced** — Real-world উদাহরণসহ সম্পূর্ণ গাইড

এই ডকুমেন্টেশনে TypeScript-এর Object-Oriented Programming (OOP)-এর সবগুলো core concept প্রফেশনাল, real-world উদাহরণসহ ব্যাখ্যা করা হয়েছে — যাতে Basic থেকে Advanced লেভেল পর্যন্ত পুরো ব্যাপারটা একদম ক্লিয়ার হয়ে যায়।

---

## 📚 Table of Contents

1. [OOP কী এবং কেন দরকার](#1-oop-কী-এবং-কেন-দরকার)
2. [OOP-এর চারটি Pillar](#2-oop-এর-চারটি-pillar)
3. [Class এবং Object](#3-class-এবং-object)
4. [Constructor](#4-constructor)
5. [Properties এবং `readonly`](#5-properties-এবং-readonly)
6. [Methods](#6-methods)
7. [Encapsulation (Data Hiding)](#7-encapsulation-data-hiding)
8. [Getter এবং Setter](#8-getter-এবং-setter)
9. [Access Modifiers (`public`, `private`, `protected`)](#9-access-modifiers-public-private-protected)
10. [Inheritance](#10-inheritance)
11. [Polymorphism](#11-polymorphism)
12. [Abstraction (Abstract Class)](#12-abstraction-abstract-class)
13. [Interface vs Class](#13-interface-vs-class)
14. [Static Members](#14-static-members)
15. [Generics with Classes](#15-generics-with-classes)
16. [Best Practices](#16-best-practices)
17. [Summary Cheat Sheet](#17-summary-cheat-sheet)

---

## 1. OOP কী এবং কেন দরকার

**OOP (Object-Oriented Programming)** হলো এমন একটি programming paradigm, যেখানে কোড লেখা হয় **object** কে কেন্দ্র করে। বাস্তব জগতের entity (যেমন: `Employee`, `BankAccount`, `Product`) কে কোডে model করার একটা পদ্ধতি এটা।

### কেন OOP দরকার?
- ✅ কোড **reusable** হয় (একবার blueprint লিখে বারবার object বানানো যায়)
- ✅ কোড **organized** ও **maintainable** হয়
- ✅ বাস্তব জগতের সাথে সহজে **relate** করা যায়
- ✅ Data **secure** রাখা যায় (Encapsulation-এর মাধ্যমে)
- ✅ বড় প্রজেক্টে **scalability** বাড়ে

---

## 2. OOP-এর চারটি Pillar

| Pillar | সংক্ষেপে ব্যাখ্যা |
|---|---|
| **Encapsulation** | Data এবং সেই data manipulate করার method একসাথে বেঁধে রাখা, বাইরের থেকে সরাসরি access আটকানো |
| **Inheritance** | এক class-এর property/method আরেক class inherit (উত্তরাধিকার) করতে পারা |
| **Polymorphism** | একই method নাম, কিন্তু ভিন্ন class-এ ভিন্ন behavior |
| **Abstraction** | জটিল implementation লুকিয়ে শুধু প্রয়োজনীয় অংশ প্রকাশ করা |

---

## 3. Class এবং Object

**Class** হলো একটি blueprint বা টেমপ্লেট। **Object** হলো সেই class থেকে তৈরি হওয়া বাস্তব instance।

```typescript
class Employee {
  fullName: string;
  designation: string;

  constructor(fullName: string, designation: string) {
    this.fullName = fullName;
    this.designation = designation;
  }

  introduce() {
    console.log(`Hi, I'm ${this.fullName}, working as a ${this.designation}.`);
  }
}

const emp1 = new Employee("Rejwanul Islam", "Full-Stack Developer");
emp1.introduce();
// Output: Hi, I'm Rejwanul Islam, working as a Full-Stack Developer.
```

- `class Employee` → এটা blueprint
- `new Employee(...)` → এটা object তৈরি করলো (instantiation)
- `emp1` → এখন একটা object, যার নিজস্ব data আছে

> 💡 একই class থেকে একাধিক object বানানো যায়, প্রতিটার data সম্পূর্ণ আলাদা থাকবে।

---

## 4. Constructor

`constructor` হলো একটি special method, যেটা object তৈরির সময় **স্বয়ংক্রিয়ভাবে** একবার call হয়। এখানে object-এর initial state সেট করা হয়।

```typescript
class Product {
  name: string;
  price: number;

  constructor(name: string, price: number) {
    this.name = name;
    this.price = price;
  }
}

const laptop = new Product("MacBook Air M3", 145000);
console.log(laptop);
// Product { name: 'MacBook Air M3', price: 145000 }
```

- Constructor-এর ভিতরে `this` মানে হলো — যে object টা এখন তৈরি হচ্ছে, সেটাকেই বোঝায়
- Constructor ছাড়া default value না দিলে TypeScript error দেবে

---

## 5. Properties এবং `readonly`

`readonly` keyword দিয়ে property-কে শুধু **একবার** (constructor-এ) সেট করা যায়, পরে সেটা আর পরিবর্তন করা যায় না।

```typescript
class UserAccount {
  username: string;
  readonly accountId: string; // ✅ একবার সেট হবে, পরে change হবে না

  constructor(username: string, accountId: string) {
    this.username = username;
    this.accountId = accountId;
  }

  changeUsername(newUsername: string) {
    this.username = newUsername; // ✅ এটা কাজ করবে
  }
}

const account = new UserAccount("rejwanul212", "ACC-10293");
account.changeUsername("rejwanul.islam");

account.accountId = "ACC-99999";
// ❌ Error: Cannot assign to 'accountId' because it is a read-only property
```

> 📌 `readonly` ব্যবহার করা হয় যখন তুমি চাও কোনো value object তৈরি হওয়ার পর আর change না হোক — যেমন: `id`, `createdAt`, `accountId`।

---

## 6. Methods

Class-এর ভিতরে থাকা function-কে বলে **method**। এটা object-এর behavior define করে।

```typescript
class ShoppingCart {
  private items: string[] = [];

  addItem(item: string) {
    this.items.push(item);
    console.log(`${item} added to cart.`);
  }

  showItems() {
    console.log("Cart items:", this.items);
  }
}

const cart = new ShoppingCart();
cart.addItem("Wireless Mouse");
cart.addItem("Mechanical Keyboard");
cart.showItems();
// Cart items: [ 'Wireless Mouse', 'Mechanical Keyboard' ]
```

---

## 7. Encapsulation (Data Hiding)

**Encapsulation** মানে হলো object-এর ভেতরের sensitive data-কে বাইরের থেকে সরাসরি access/modify করতে না দিয়ে, শুধুমাত্র নির্দিষ্ট method-এর মাধ্যমে control করা।

### উদাহরণ: Bank Account

```typescript
class BankAccount {
  private balance: number; // 🔒 বাইরে থেকে সরাসরি access করা যাবে না

  constructor(initialBalance: number) {
    this.balance = initialBalance;
  }

  deposit(amount: number) {
    this.balance += amount;
    console.log(`Deposited ৳${amount}. New balance: ৳${this.balance}`);
  }

  withdraw(amount: number) {
    if (amount > this.balance) {
      console.log("Insufficient balance!");
      return;
    }
    this.balance -= amount;
    console.log(`Withdrew ৳${amount}. New balance: ৳${this.balance}`);
  }

  checkBalance() {
    console.log(`Current balance: ৳${this.balance}`);
  }
}

const myAccount = new BankAccount(55655);
myAccount.deposit(2000);   // Deposited ৳2000. New balance: ৳57655
myAccount.withdraw(1000);  // Withdrew ৳1000. New balance: ৳56655

console.log(myAccount.balance);
// ❌ Error: Property 'balance' is private and only accessible within class 'BankAccount'
```

### কেন Encapsulation দরকার?
- কেউ যদি সরাসরি `myAccount.balance = -999999` লিখে balance পরিবর্তন করতে পারতো, data **corrupt** হয়ে যেত
- `private` রেখে শুধু `deposit()` / `withdraw()` method দিয়ে balance পরিবর্তনের নিয়ম বেঁধে দেওয়া হয়েছে — এটাই আসল security

### JavaScript Private Fields (`#`)

TypeScript-এ `private` শুধু compile-time-এ check হয়, কিন্তু `#` দিয়ে declare করলে সেটা **runtime**-এও সত্যিকারের private হয়ে যায়।

```typescript
class AtmMachine {
  cardHolderName: string = "Rejwanul Islam";

  withdrawAmount(amount: number) {
    this.#verifyPin();
    console.log(`Dispensing ৳${amount}...`);
  }

  #verifyPin() { // 🔒 সত্যিকারের private method
    console.log("PIN verified ✅");
  }
}

const atm = new AtmMachine();
atm.withdrawAmount(1000);
// PIN verified ✅
// Dispensing ৳1000...

atm.#verifyPin();
// ❌ Error: Property '#verifyPin' is not accessible outside class 'AtmMachine'
```

| | `private` (TypeScript) | `#` (JavaScript native) |
|---|---|---|
| Check হয় কখন | শুধু compile-time | Compile-time + Runtime |
| আসল security | না (compiled JS-এ access করা যায়) | হ্যাঁ (সত্যিকারের hidden) |

---

## 8. Getter এবং Setter

`get` এবং `set` হলো special method যেগুলো **property-এর মতো ব্যবহার করা যায়** (function-এর মতো `()` লাগে না), কিন্তু ভেতরে আসলে logic থাকে।

```typescript
class UserProfile {
  private _fullName: string;

  constructor(fullName: string) {
    this._fullName = fullName;
  }

  set fullName(newName: string) {
    if (newName.trim().length === 0) {
      throw new Error("Name cannot be empty!");
    }
    this._fullName = newName;
  }

  get fullName() {
    return this._fullName.toUpperCase();
  }
}

const profile = new UserProfile("rejwanul212");
profile.fullName = "Rejwanul Islam"; // 👈 () ছাড়াই assign
console.log(profile.fullName);       // 👈 () ছাড়াই read → REJWANUL ISLAM
```

### কেন Getter/Setter দরকার?
- Setter-এর ভিতরে **validation logic** বসানো যায় (যেমন খালি নাম আটকানো)
- Getter দিয়ে **computed value** রিটার্ন করা যায় (যেমন uppercase করে দেখানো)

> ⚠️ **ভালো practice**: Getter/Setter ব্যবহার করলে আসল property সাধারণত `private` এবং সামনে `_` দিয়ে রাখা হয় (যেমন `_fullName`), যাতে getter/setter-এর নামের সাথে conflict না হয়।

---

## 9. Access Modifiers (`public`, `private`, `protected`)

| Modifier | কোথা থেকে access করা যায় | Default? |
|---|---|---|
| `public` | সব জায়গা থেকে (class-এর বাইরেও) | ✅ হ্যাঁ, না লিখলেও এটাই ধরে নেয় |
| `private` | শুধু নিজ class-এর ভিতরে | ❌ |
| `protected` | নিজ class + child (subclass) class-এর ভিতরে | ❌ |

```typescript
class Vehicle {
  public brand: string = "Toyota";       // যেকোনো জায়গা থেকে access
  private engineSerial: string = "X92J"; // শুধু এই class-এর ভিতরে
  protected fuelType: string = "Petrol"; // এই class + child class-এ

  revealEngineSerial() {
    console.log(this.engineSerial); // ✅ ঠিক আছে, ভিতরেই আছি
  }
}

class Car extends Vehicle {
  showFuelType() {
    console.log(this.fuelType); // ✅ protected তাই child class access করতে পারে
    // console.log(this.engineSerial); // ❌ Error, private
  }
}
```

---

## 10. Inheritance

**Inheritance** মানে হলো একটা class (child/subclass) আরেকটা class (parent/base class) থেকে property ও method **উত্তরাধিকার সূত্রে** পেয়ে যাওয়া। `extends` keyword দিয়ে এটা করা হয়।

```typescript
class Animal {
  constructor(public name: string) {}

  eat() {
    console.log(`${this.name} is eating.`);
  }

  sleep() {
    console.log(`${this.name} is sleeping.`);
  }
}

class Dog extends Animal {
  bark() {
    console.log(`${this.name} says: Woof woof!`);
  }
}

const myDog = new Dog("Tommy");
myDog.eat();   // ✅ Parent class-এর method, inherited হয়ে এসেছে (Tommy is eating.)
myDog.bark();  // ✅ নিজের class-এর method (Tommy says: Woof woof!)
```

- `Dog` হলো **child class**, `Animal` হলো **parent class**
- `Dog`-এর object দিয়ে `Animal`-এর সব method-ও access করা যাচ্ছে

### `super` keyword

Child class-এর constructor থেকে parent class-এর constructor কল করতে `super()` লাগে।

```typescript
class Person {
  constructor(public name: string) {}
}

class Student extends Person {
  constructor(name: string, public rollNumber: number) {
    super(name); // 👈 Parent constructor call
  }
}

const student1 = new Student("Rejwanul Islam", 101);
console.log(student1.name, student1.rollNumber);
// Rejwanul Islam 101
```

---

## 11. Polymorphism

**Polymorphism** মানে "বহুরূপ" — একই নামের method, কিন্তু ভিন্ন class-এ ভিন্ন behavior। এটা মূলত **Method Overriding**-এর মাধ্যমে হয়।

```typescript
class PaymentMethod {
  pay(amount: number) {
    console.log(`Paying ৳${amount} using a generic method.`);
  }
}

class BkashPayment extends PaymentMethod {
  pay(amount: number) {
    console.log(`Paying ৳${amount} via bKash.`);
  }
}

class CardPayment extends PaymentMethod {
  pay(amount: number) {
    console.log(`Paying ৳${amount} via Credit Card.`);
  }
}

const paymentMethods: PaymentMethod[] = [
  new BkashPayment(),
  new CardPayment(),
  new PaymentMethod(),
];

paymentMethods.forEach((method) => method.pay(500));
// Paying ৳500 via bKash.
// Paying ৳500 via Credit Card.
// Paying ৳500 using a generic method.
```

> 💡 লক্ষ্য করো — একই `pay()` method কল করা হচ্ছে, কিন্তু object ভেদে output আলাদা আসছে। এটাই polymorphism-এর শক্তি।

---

## 12. Abstraction (Abstract Class)

**Abstraction** মানে implementation-এর জটিলতা লুকিয়ে রেখে, শুধু প্রয়োজনীয় structure প্রকাশ করা। TypeScript-এ `abstract` keyword দিয়ে abstract class বানানো যায়।

```typescript
abstract class Shape {
  abstract calculateArea(): number; // শুধু signature, body নেই

  describe() {
    console.log(`Area is: ${this.calculateArea().toFixed(2)}`);
  }
}

class Circle extends Shape {
  constructor(private radius: number) {
    super();
  }
  calculateArea(): number {
    return Math.PI * this.radius * this.radius;
  }
}

class Rectangle extends Shape {
  constructor(private width: number, private height: number) {
    super();
  }
  calculateArea(): number {
    return this.width * this.height;
  }
}

const circle = new Circle(5);
circle.describe(); // Area is: 78.54

const rectangle = new Rectangle(10, 4);
rectangle.describe(); // Area is: 40.00

// const shape = new Shape();
// ❌ Error: Cannot create an instance of an abstract class
```

### নিয়ম:
- Abstract class থেকে সরাসরি `new` দিয়ে object বানানো যায় না
- Abstract method-এর body থাকে না, শুধু signature থাকে
- যে child class extend করবে, তাকে অবশ্যই সব abstract method implement করতে হবে

---

## 13. Interface vs Class

`interface` দিয়েও abstraction করা যায়, কিন্তু interface-এ কোনো implementation থাকে না — শুধু shape/structure define করা হয়।

```typescript
interface Notifiable {
  recipient: string;
  send(message: string): void;
}

class EmailNotification implements Notifiable {
  constructor(public recipient: string) {}

  send(message: string) {
    console.log(`📧 Sending email to ${this.recipient}: "${message}"`);
  }
}

class SmsNotification implements Notifiable {
  constructor(public recipient: string) {}

  send(message: string) {
    console.log(`📱 Sending SMS to ${this.recipient}: "${message}"`);
  }
}

const notifications: Notifiable[] = [
  new EmailNotification("rejwanul@example.com"),
  new SmsNotification("+8801XXXXXXXXX"),
];

notifications.forEach((n) => n.send("Your order has been shipped!"));
```

| | `interface` | `abstract class` |
|---|---|---|
| Implementation | না, শুধু structure | হ্যাঁ, partial implementation থাকতে পারে |
| Multiple inherit | একসাথে একাধিক `implements` করা যায় | একটাই `extends` করা যায় |
| Object বানানো | যায় না | যায় না (কিন্তু child class দিয়ে যায়) |
| Constructor | থাকে না | থাকতে পারে |

---

## 14. Static Members

`static` keyword দিয়ে declare করা property/method **class-এর সাথে বাঁধা থাকে, কোনো নির্দিষ্ট object-এর সাথে না**। object না বানিয়েই সরাসরি class-এর নাম দিয়ে access করা যায়।

```typescript
class MathUtils {
  static readonly PI = 3.1416;

  static square(num: number) {
    return num * num;
  }

  static circleArea(radius: number) {
    return this.PI * this.square(radius);
  }
}

console.log(MathUtils.PI);              // 3.1416
console.log(MathUtils.square(5));       // 25
console.log(MathUtils.circleArea(5));   // 78.54

// object বানানোর দরকারই নেই!
```

### Static দিয়ে counter রাখার উদাহরণ:

```typescript
class Employee {
  static totalEmployees = 0;

  constructor(public name: string) {
    Employee.totalEmployees++;
  }
}

new Employee("Nishat");
new Employee("Rejwanul");

console.log(Employee.totalEmployees); // 2
```

---

## 15. Generics with Classes

**Generics** দিয়ে class-কে **type-flexible** বানানো যায় — একই class দিয়ে ভিন্ন ভিন্ন type-এর data handle করা যায়, type safety বজায় রেখে।

```typescript
class Storage<T> {
  private items: T[] = [];

  add(item: T) {
    this.items.push(item);
  }

  getAll(): T[] {
    return this.items;
  }
}

const numberStorage = new Storage<number>();
numberStorage.add(10);
numberStorage.add(20);
console.log(numberStorage.getAll()); // [10, 20]

const nameStorage = new Storage<string>();
nameStorage.add("Rejwanul");
nameStorage.add("Nishat");
console.log(nameStorage.getAll()); // ['Rejwanul', 'Nishat']
```

এখানে `<T>` একটা placeholder type — object বানানোর সময় `T` আসল type (`number`, `string` ইত্যাদি) দিয়ে replace হয়ে যাচ্ছে।

---

## 16. Best Practices

- ✅ Sensitive data সবসময় `private` বা `#` দিয়ে রাখো, দরকার হলে getter/setter ব্যবহার করো
- ✅ যেসব value পরিবর্তন হওয়া উচিত না (`id`, `createdAt`), সেগুলো `readonly` রাখো
- ✅ Inheritance ব্যবহার করার আগে চিন্তা করো — সত্যিই কি "is-a" সম্পর্ক আছে? (Dog is an Animal ✅)
- ✅ বেশি জটিল হয়ে গেলে Inheritance-এর বদলে **Composition** (class-এর ভিতরে আরেকটা class-এর object রাখা) বিবেচনা করো
- ✅ Interface দিয়ে contract define করো, তারপর class দিয়ে implement করো — এতে কোড loosely-coupled থাকে
- ✅ Class, property, method-এর নাম দেওয়ার সময় camelCase (method/variable) ও PascalCase (class) মেনে চলো, যেমন `BankAccount`, `calculateArea`
- ✅ Constructor-এ খুব বেশি logic না রেখে আলাদা method-এ ভাগ করো

---

## 17. Summary Cheat Sheet

| Concept | Keyword | এক লাইনে মানে |
|---|---|---|
| Class | `class` | Object বানানোর blueprint |
| Object | `new` | Class-এর বাস্তব instance |
| Constructor | `constructor()` | Object তৈরির সময় automatic call হয় |
| Readonly | `readonly` | একবার সেট হলে আর change হয় না |
| Encapsulation | `private`, `#` | Data হাইড করে রাখা |
| Getter/Setter | `get`, `set` | Property-এর মতো method কল করা |
| Inheritance | `extends`, `super` | Parent class-এর বৈশিষ্ট্য পাওয়া |
| Polymorphism | Method Override | একই নাম, ভিন্ন behavior |
| Abstraction | `abstract` | Structure দেখানো, implementation লুকানো |
| Interface | `interface`, `implements` | শুধু shape/contract define করা |
| Static | `static` | Class-লেভেল property/method |
| Generics | `<T>` | Type-flexible, reusable class |

---

**Happy Coding! 🚀**
