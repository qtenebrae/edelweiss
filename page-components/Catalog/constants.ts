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
		id: 11,
		src: `http://${GATEWAY_HOST}/uploads/11.jpg`,
		title_rus: 'Бойцовский клуб',
		title_eng: 'Fight Club',
	},
	{
		id: 12,
		src: `http://${GATEWAY_HOST}/uploads/12.jfif`,
		title_rus: 'Игра престолов',
		title_eng: 'Game of Thrones',
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
	title: 'Брат 2',
	plot: 'Участвуя в программе на телевидении, Данила Багров встречает своих друзей по службе в Чечне. Одного из них внезапно убивают. Выясняется, что у того были неприятности из-за брата-хоккеиста в Америке. Данила должен разобрат...',
	genres: ['Боевик', 'Криминал'],
	director: 'Алексей Балабанов',
	agelimit: '18',
	rating: 8.22,
};

export const statuses = [
	{ status: 'viewed', title: 'Просмотрено' },
	{ status: 'abandoned', title: 'Брошено' },
	{ status: 'deferred', title: 'Отложено' },
	{ status: 'planned', title: 'Запланировано' },
	{ status: 'reviewing', title: 'Пересматриваю' },
	{ status: 'looking', title: 'Смотрю' },
];
