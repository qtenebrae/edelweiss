import { GATEWAY_HOST } from '@/constants';

export const movieRatings: { [key: number]: string } = {
	1: 'Ужасно',
	2: 'Очень плохо',
	3: 'Плохо',
	4: 'Посредственно',
	5: 'Так себе',
	6: 'Неплохо',
	7: 'Хорошо',
	8: 'Очень хорошо',
	9: 'Отлично',
	10: 'Шедевр',
};

export const statuses = [
	{ status: 'viewed', title: 'Просмотрено' },
	{ status: 'abandoned', title: 'Брошено' },
	{ status: 'deferred', title: 'Отложено' },
	{ status: 'planned', title: 'Запланировано' },
	{ status: 'reviewing', title: 'Пересматриваю' },
	{ status: 'looking', title: 'Смотрю' },
];

export const workers = [
	{
		name: 'Байрон Ховард',
		role: 'Режиссер',
		photo: `http://${GATEWAY_HOST}/uploads/hovard.png`,
	},
	{
		name: 'Байрон Ховард',
		role: 'Сценарист',
		photo: `http://${GATEWAY_HOST}/uploads/hovard.png`,
	},
	{
		name: 'Моника Лаго-Кэйтис',
		role: 'Продюсер',
		photo: `http://${GATEWAY_HOST}/uploads/monica.png`,
	},
	{
		name: 'Майкл Джаккино',
		role: 'Композитор',
		photo: `http://${GATEWAY_HOST}/uploads/michal.png`,
	},
];
