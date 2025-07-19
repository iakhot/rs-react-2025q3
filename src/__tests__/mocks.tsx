import type { Movie } from '../App';

export const DUMMY_ERROR = 'Simulated error in ChildComponent';
export const ErrorDummy = ({
  shouldThrow = false,
  message = DUMMY_ERROR,
}: {
  shouldThrow?: boolean;
  message?: string;
}) => {
  if (shouldThrow) {
    throw new Error(message);
  }
  return <div>Dummy is rendered</div>;
};

export const movieStub: Movie = {
  id: 123,
  name: 'Star Wars',
  description: 'A long time ago, in a galaxy far, far away...',
};

export const moviesList: Movie[] = [
  {
    id: 5619,
    name: 'Звёздные войны: Эпизод 3 - Месть ситхов',
    description:
      'Галактику терзает война клонов, Энакина — выбор между долгом и любовью. Лучший приквел о рождении легенды',
  },
  {
    id: 333,
    name: 'Звёздные войны: Эпизод 4 - Новая надежда',
    description:
      'Джедай и контрабандист помогают мятежнице бежать из плена. Начало эпической космической саги Джорджа Лукаса',
  },
  {
    id: 6695,
    name: 'Звёздные войны: Эпизод 1 – Скрытая угроза',
    description:
      'Мальчику с далекой планеты суждено изменить судьбу галактики. Зрелищное, но недооцененное начало великой саги',
  },
  {
    id: 844,
    name: 'Звёздные войны: Эпизод 2 – Атака клонов',
    description:
      'Роман Энакина и Падме в преддверии битвы андроидов, клонов и джедаев. Самая романтичная часть космической саги',
  },
];
