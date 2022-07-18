/**
 * 类型如何定义？
 * 看 9.FormsType.ts
 */
// const inputNumber = document.createElement('input');
// inputNumber.type = 'number';

// const inputCheckbox = document.createElement('input');
// inputNumber.type = 'checkbox';

// type ReservationState = {
//     isGoing: boolean;
//     numberOfGuests: string;
// }

// type AAA = keyof ReservationState;
// const state: ReservationState  = {
//     isGoing: true,
//     numberOfGuests: '2',
// };

// function aaa<T extends AAA>(name: T, value: ReservationState[T]) {
//     state[name] = value;
// }

// function handler(event: Event) {
//     if (event.target instanceof HTMLInputElement) {
//         const target = event.target;
//         const value = target.type === 'checkbox' ? target.checked : target.value;
//         const name = target.name;

//         state[name] = value;
//     }
// }
// inputNumber.addEventListener('change', handler)
// inputCheckbox.addEventListener('change', handler)
