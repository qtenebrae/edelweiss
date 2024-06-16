import { GATEWAY_HOST } from '@/constants';

export const movies = [
	{
		id: 1,
		src: `http://${GATEWAY_HOST}/uploads/1.jpg`,
		title_rus: '1+1',
		title_eng: 'Intouchables',
	},
	{
		id: 2,
		src: `http://${GATEWAY_HOST}/uploads/2.jfif`,
		title_rus: 'Джентльмены',
		title_eng: 'The Gentlemen',
	},
	{
		id: 3,
		src: `http://${GATEWAY_HOST}/uploads/3.jfif`,
		title_rus: 'Волк с Уолл-стрит',
		title_eng: 'The Wolf of Wall Street',
	},
	{
		id: 4,
		src: `http://${GATEWAY_HOST}/uploads/4.jpg`,
		title_rus: 'Брат',
		title_eng: 'Brother',
	},
	{
		id: 5,
		src: `http://${GATEWAY_HOST}/uploads/5.jfif`,
		title_rus: 'Гнев человеческий',
		title_eng: 'Wrath of Man',
	},
	{
		id: 6,
		src: `http://${GATEWAY_HOST}/uploads/6.jfif`,
		title_rus: 'Один дома',
		title_eng: 'Home Alone',
	},
	{
		id: 7,
		src: `http://${GATEWAY_HOST}/uploads/7.jfif`,
		title_rus: 'Достать ножи ',
		title_eng: 'Knives Out',
	},
];

export const movies1 = [
	{
		id: 7,
		src: `http://${GATEWAY_HOST}/uploads/7.jfif`,
		title_rus: 'Достать ножи ',
		title_eng: 'Knives Out',
	},
	{
		id: 8,
		src: `http://${GATEWAY_HOST}/uploads/8.jpg`,
		title_rus: 'Аватар',
		title_eng: 'Avatar',
	},
	{
		id: 9,
		src: `http://${GATEWAY_HOST}/uploads/9.jpg`,
		title_rus: 'Зеленая книга',
		title_eng: 'Green Book',
	},
	{
		id: 10,
		src: `http://${GATEWAY_HOST}/uploads/10.jfif`,
		title_rus: 'Брат 2',
		title_eng: 'Brother 2',
	},

	{
		id: 13,
		src: `http://${GATEWAY_HOST}/uploads/13.jfif`,
		title_rus: 'Зверополис',
		title_eng: 'Zootopia',
	},
	{
		id: 14,
		src: `http://${GATEWAY_HOST}/uploads/14.jpg`,
		title_rus: 'Побег из Шоушенка',
		title_eng: 'The Shawshank Redemption',
	},
	{
		id: 15,
		src: `http://${GATEWAY_HOST}/uploads/15.jfif`,
		title_rus: 'Остров проклятых',
		title_eng: 'Shutter Island',
	},
];

export const movie = {
	title: 'Унесённые призраками',
	plot: 'Тихиро с мамой и папой переезжает в новый дом. Заблудившись по дороге, они оказываются встранном пустынном городе, где их ждет великолепный...',
	genres: ['Аниме', 'Мультфильм', 'Приключения'],
	director: 'Хаяо Миядзаки',
	agelimit: '12',
	rating: 8.52,
};

export const statuses = [
	{ status: 'viewed', title: 'Просмотрено' },
	{ status: 'abandoned', title: 'Брошено' },
	{ status: 'deferred', title: 'Отложено' },
	{ status: 'planned', title: 'Запланировано' },
	{ status: 'reviewing', title: 'Пересматриваю' },
	{ status: 'looking', title: 'Смотрю' },
];

export const genres = [
	{ id: 1, title: '#Комедия' },
	{ id: 2, title: '#Детектив' },
	{ id: 3, title: '#Фантастика' },
	{ id: 4, title: '#Боевик' },
	{ id: 5, title: '#Драма' },
	{ id: 6, title: '#Мистика' },
	{ id: 7, title: '#Ужасы' },
	{ id: 8, title: '#Романтика' },
	{ id: 9, title: '#Приключения' },
	{ id: 10, title: '#Триллер' },
];

export const genres2 = [
	{ id: 11, title: '#Фэнтези' },
	{ id: 12, title: '#Мелодрама' },
	{ id: 13, title: '#Криминал' },
	{ id: 14, title: '#Исторический' },
	{ id: 15, title: '#Научная фантастика' },
	{ id: 16, title: '#Вестерн' },
	{ id: 17, title: '#Биография' },
	{ id: 18, title: '#Военный' },
	{ id: 19, title: '#Музыкальный' },
	{ id: 20, title: '#Семейный' },
];
