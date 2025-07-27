import type { ApiMovie, ApiResult, Movie } from '../App';

export const DUMMY_ERROR = 'Simulated error in ChildComponent';
export const TOKEN_REGEX = new RegExp(/^([A-Z0-9-]{7,8}){4}$/);
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

export const detailsApiMock = {
  id: 333,
  alternativeName: 'Star Wars',
  type: 'movie',
  name: 'Звёздные войны: Эпизод 4 – Новая надежда',
  description:
    'Татуин. Планета-пустыня. Уже постаревший рыцарь Джедай Оби Ван Кеноби спасает молодого Люка Скайуокера, когда тот пытается отыскать пропавшего дроида. С этого момента Люк осознает свое истинное назначение: он один из рыцарей Джедай. В то время как гражданская война охватила галактику, а войска повстанцев ведут бои против сил злого Императора, к Люку и Оби Вану присоединяется отчаянный пилот-наемник Хан Соло, и в сопровождении двух дроидов, R2D2 и C-3PO, этот необычный отряд отправляется на поиски предводителя повстанцев – принцессы Леи. Героям предстоит отчаянная схватка с устрашающим Дартом Вейдером – правой рукой Императора и его секретным оружием – «Звездой Смерти».',
  slogan: 'Coming to your galaxy this summer.  (Teaser poster)',
  year: 1977,
  budget: {
    value: 11000000,
    currency: '$',
  },
  poster: {
    url: 'https://image.openmoviedb.com/kinopoisk-images/1600647/9bdc6690-de82-4a8c-a114-aa3a353bc1da/600x900',
    previewUrl:
      'https://image.openmoviedb.com/kinopoisk-images/1600647/9bdc6690-de82-4a8c-a114-aa3a353bc1da/300x450',
  },
  rating: {
    kp: 8.11,
    imdb: 8.6,
    filmCritics: 9.1,
    russianFilmCritics: 0,
    await: null,
  },
  genres: [
    {
      name: 'фантастика',
    },
    {
      name: 'боевик',
    },
    {
      name: 'фэнтези',
    },
    {
      name: 'приключения',
    },
  ],
  movieLength: 121,
};

export const moviesMock: ApiResult = {
  docs: moviesList,
  total: 100,
  limit: 20,
  page: 1,
  pages: 5,
};

export function mockResponse(data: ApiMovie[] | Movie[]): ApiResult {
  return {
    docs: data,
    total: 0,
    pages: 0,
    limit: 0,
    page: 0,

    // data: { docs: data, total: 0, pages: 0, limit: 0, page: 0 },
    // status: 200,
    // statusText: 'OK',
    // headers: {},
    // config: { headers: {} } as InternalAxiosRequestConfig<null>,
  };
}
