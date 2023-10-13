function getTestData() {
    const p1 = new Pacient(
        'Иван',
        'Иванович',
        25
    );
    p1.medicines = [
        new Medicines('Парацетомол', '1 таблетка'),
        new Medicines('Анальгин', '2 таблетки'),
    ];
    p1.doctors = [
        new Doctor('Алексей', 'Федукин', 'Терапевт', '20 лет'),
        new Doctor('Ольга', 'Дерно', 'Хирург', '10 лет')
    ];
    p1.analyzes = [
        new Analyze('Кровь', 'плохо'),
        new Analyze('Моча', 'плохо'),
        new Analyze('Кал', 'плохо'),
        new Analyze('Лёгкие', 'плохо')
    ];

    const p2 = new Pacient(
        'Нона',
        'Тиного',
        28
    );
    p2.medicines = [
        new Medicines('Парацетомол', '2 таблетки'),
        new Medicines('Настойка ромашки', '2 пакетика'),
    ];
    p2.doctors = [
        new Doctor('Максим', 'Максимов', 'Терапевт', '15 лет'),
        new Doctor('Лариса', 'Зазина', 'Анестезиолог', '6 лет')
    ];
    p2.analyzes = [
        new Analyze('Кровь', 'плохо'),
        new Analyze('Моча', 'хорошо'),
        new Analyze('Кал', 'плохо'),
        new Analyze('Лёгкие', 'хорошо')
    ];

    const p3 = new Pacient(
        'Гоша',
        'Кузенко',
        35
    );
    p3.medicines = [
        new Medicines('Парацетомол', '5 таблеток'),
        new Medicines('Ибупрфоен', '30 мг'),
    ];
    p3.doctors = [
        new Doctor('Николай', 'Матросов', 'Терапевт', '15 лет'),
        new Doctor('Ефим', 'Федькин', 'Зубной', '8 лет'),
        new Doctor('Вениамин', 'Шаляпин', 'Хирург', '8 лет')
    ];
    p3.analyzes = [
        new Analyze('Кровь', 'хорошо'),
        new Analyze('Моча', 'хорошо'),
        new Analyze('Кал', 'хорошо'),
        new Analyze('Лёгкие', 'хорошо')
    ];

    return [p1, p2, p3];
}

function getNewpacient() {
    const p1 = new Pacient(
        'Иван-new',
        'Иванович-new',
        45
    );
    p1.medicines = [
        new Medicines('Парацетомол', '1 таблетка'),
    ];
    p1.doctors = [
        new Doctor('Алексей', 'Федукин', 'Терапевт', '20 лет'),
    ];
    p1.analyzes = [
        new Analyze('Кровь', 'нет'),
        new Analyze('Моча', 'нет'),
        new Analyze('Кал', 'нет'),
        new Analyze('Лёгкие', 'нет')
    ];

    return p1;
}