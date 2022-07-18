type InputType = 'text' | 'checkbox' | 'number';
type NameType<Name, Type extends InputType> = { name: Name; type: Type };
type MyInput<Name, Type extends InputType> = HTMLInputElement & NameType<Name, Type>;

function createInput<Name extends string, Type extends InputType>(config: NameType<Name, Type>) {
    const input = document.createElement('input');
    input.name = config.name;
    input.type = config.type;
    return input as MyInput<Name, Type>;
}

function myChangeListener<Name, Type extends InputType>(
    input: MyInput<Name, Type>,
    cb: (args: Event & { target: NameType<Name, Type> & HTMLInputElement }) => void,
) {
    input.addEventListener('change', event => {
        // 因为我们是在原来的版本上加强，所以 as any 无法避免，但是好消息是这段代码只用写一遍
        cb(event as any);
    });
}

interface ReservationState {
    isGoing: boolean;
    num: string;
}
const state: ReservationState = {
    num: '123',
    isGoing: false,
};
type StateType = TypeForInput<ReservationState>;

type TypeForInput<T> = { [k in keyof T]: { name: k; type: T[k] extends boolean ? 'checkbox' : Exclude<InputType, 'checkbox'> } }[keyof T];

function handler(event: Event & { target: StateType & HTMLInputElement }) {
    const target = event.target;
    const type = target.type;
    if (type === 'checkbox') {
        const name = target.name;
        state[name] = target.checked;
    } else {
        const name = target.name;
        state[name] = target.value;
    }
}

const inputBool = createInput({
    name: 'isGoing',
    type: 'checkbox',
});
myChangeListener(inputBool, handler);

const inputNumber = createInput({
    name: 'num',
    type: 'number',
});
myChangeListener(inputNumber, handler);

const nameError = createInput({
    name: 'hello',
    type: 'checkbox',
});

// myChangeListener(nameError, handler); // Error

const typeError = createInput({
    name: 'isGoing',
    type: 'number',
});

// myChangeListener(typeError, handler); // Error

document.body.appendChild(inputNumber);
