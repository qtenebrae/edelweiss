import {
	Table,
	TableHeader,
	TableColumn,
	TableBody,
	TableRow,
	TableCell,
	Tooltip,
	Pagination,
	Button,
	Input,
	Image,
	CalendarDate,
	DatePicker,
	Select,
	SelectItem,
	Chip,
} from '@nextui-org/react';
import { CalendarIcon, DeleteIcon, EditIcon, GATEWAY_HOST } from '@/constants';
import { useState, useMemo, useCallback, FormEvent, ChangeEvent, useEffect } from 'react';
import { parseDate, getLocalTimeZone } from '@internationalized/date';
import { PersonProps } from './Person.props';
import { IPerson, ISex } from '@/interfaces';
import { toast } from 'react-toastify';
import style from './Person.module.css';
import moment from 'moment';
import axios from 'axios';
import cn from 'classnames';

const columns = [
	{ name: 'Id', uid: 'id' },
	{ name: 'Фото', uid: 'photo' },
	{ name: 'Имя', uid: 'firstname' },
	{ name: 'Фамилия', uid: 'lastname' },
	{ name: 'Отчество', uid: 'middlename' },
	{ name: 'Дата рождения', uid: 'birthday' },
	{ name: 'Дата смерти', uid: 'dateOfDeath' },
	{ name: 'Пол', uid: 'sex' },
	{ name: 'Действия', uid: 'actions' },
];

export const Person = ({ persons, setPersons }: PersonProps) => {
	const [sexs, setSexs] = useState<ISex[]>([]);

	const [photo, setPhoto] = useState<File | null>(null);
	const [photoPreview, setPhotoPreview] = useState<string | null>(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const [sexs] = await Promise.all([axios.get(`http://${GATEWAY_HOST}/catalog/sex/findAll`)]);
				setSexs(sexs.data);
			} catch {
				//
			}
		};
		fetchData();
	}, []);

	const [firstname, setFirstname] = useState<string>();
	const [lastname, setLastname] = useState<string>();
	const [middlename, setMiddlename] = useState<string>();
	const [birthday, setBirthday] = useState<CalendarDate>(parseDate('2001-01-01'));
	const [dateOfDeath, setDateOfDeath] = useState<CalendarDate>();
	const [sexId, setSexId] = useState<string>();

	const handleSelectionSex = (e: ChangeEvent<HTMLSelectElement>) => {
		setSexId(e.target.value);
	};

	const createPerson = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		event.stopPropagation();

		let filename = '';

		if (photo) {
			const formData = new FormData();
			formData.append('photo', photo);

			try {
				const response = await axios.post(
					`http://${GATEWAY_HOST}/catalog/person/uploadPhoto`,
					formData,
					{
						headers: {
							'Content-Type': 'multipart/form-data',
						},
					},
				);

				filename = response.data.filename;
			} catch (error) {
				//
			}
		}

		const data = {
			firstname,
			lastname,
			middlename,
			birthday: birthday.toDate(getLocalTimeZone()),
			sexId: Number(sexId),
			photoUrl: filename,
		};

		if (dateOfDeath) {
			Object.assign(data, { dateOfDeath: dateOfDeath.toDate(getLocalTimeZone()) });
		}

		try {
			await axios.post(`http://${GATEWAY_HOST}/catalog/person/create`, data);
			const response = await axios.get(`http://${GATEWAY_HOST}/catalog/person/findAll`);
			setPersons(response.data);

			toast.success('Добавлено!');
		} catch {
			toast.error('Ошибка добавления!');
		}
	};

	const deletePerson = async (id: number) => {
		try {
			await axios.delete(`http://${GATEWAY_HOST}/catalog/person/delete`, { data: { id } });
			const countries = await axios.get(`http://${GATEWAY_HOST}/catalog/person/findAll`);
			setPersons(countries.data);

			toast.success('Успешное удаление!');
		} catch {
			toast.error('Ошибка удаления!');
		}
	};

	const handlePhotoChange = (event: ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) {
			setPhoto(file);
			setPhotoPreview(URL.createObjectURL(file));
		}
	};

	const renderCell = useCallback((person: IPerson, columnKey) => {
		const cellValue = person[columnKey];

		switch (columnKey) {
			case 'sex':
				if (person.sexId == 1) {
					return 'Мужской';
				} else {
					return 'Женский';
				}

			case 'birthday':
				return (
					<span className="font-normal ml-[5px] text-default-500">{`${moment(
						person.birthday,
					).format('DD/MM/YYYY')}`}</span>
				);
			case 'dateOfDeath':
				return (
					<span className="font-normal ml-[5px] text-default-500">{`${moment(
						person.dateOfDeath,
					).format('DD/MM/YYYY')}`}</span>
				);
			case 'photo':
				return (
					<Image
						className="object-cover w-[60px] h-[90px]"
						src={
							person.photoUrl.length == 0
								? `http://${GATEWAY_HOST}/uploads/${person.photoUrl}`
								: `http://${GATEWAY_HOST}/uploads/404.jpg`
						}
					/>
				);
			case 'actions':
				return (
					<div className="relative flex items-center gap-2">
						<Tooltip content="Редактировать">
							<span className="text-lg text-default-400 cursor-pointer active:opacity-50">
								<EditIcon />
							</span>
						</Tooltip>
						<Tooltip content="Удалить">
							<span
								className="text-lg text-danger cursor-pointer active:opacity-50"
								onClick={() => deletePerson(person.id)}
							>
								<DeleteIcon />
							</span>
						</Tooltip>
					</div>
				);
			default:
				return cellValue;
		}
	}, []);

	const [page, setPage] = useState(1);
	const rowsPerPage = 5;

	const pages = Math.ceil(persons.length / rowsPerPage);

	const items = useMemo<IPerson[]>(() => {
		const start = (page - 1) * rowsPerPage;
		const end = start + rowsPerPage;

		return persons.slice(start, end);
	}, [page, persons]);

	return (
		<div className="w-full grid gap-[10px]">
			<form
				action="POST"
				onSubmit={createPerson}
				className={cn(style.form, 'w-full grid gap-[10px]')}
			>
				<div className={style.left}>
					<div>
						<label htmlFor="photo">
							<Image
								className="object-cover w-[200px] h-[300px]"
								classNames={{ wrapper: 'w-[200px] h-[300px]' }}
								src={photoPreview ? photoPreview : `http://${GATEWAY_HOST}/uploads/404.jpg`}
							/>
						</label>

						<label htmlFor="photo">
							<Chip className="w-[200px] mt-[10px] max-w-full text-default-900 bg-gradient-to-tr from-secondary-200 to-primary-100 shadow-lg">
								Добавить файл
							</Chip>
						</label>

						<input
							id="photo"
							type="file"
							accept="image/*"
							onChange={handlePhotoChange}
							className="hidden"
						/>
					</div>
				</div>

				<Input
					type="text"
					label="Фамилия"
					value={lastname}
					onValueChange={setLastname}
					className={style.right}
					isRequired
				></Input>

				<Input
					type="text"
					label="Имя"
					value={firstname}
					onValueChange={setFirstname}
					className={style.right}
					isRequired
				></Input>

				<Input
					type="text"
					label="Отчество"
					value={middlename}
					onValueChange={setMiddlename}
					className={style.right}
					isRequired
				></Input>

				<DatePicker
					label="Дата рождения"
					startContent={
						<CalendarIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
					}
					value={birthday}
					onChange={setBirthday}
					className={style.right}
					isRequired
				/>

				<DatePicker
					label="Дата смерти"
					startContent={
						<CalendarIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
					}
					value={dateOfDeath}
					onChange={setDateOfDeath}
					className={style.right}
				/>

				<Select label="Пол" selectedKeys={sexId} onChange={handleSelectionSex} isRequired>
					{sexs.map((item) => (
						<SelectItem key={item.id}>{item.title}</SelectItem>
					))}
				</Select>

				<Button className={cn(style.button, 'w-full')} type="submit">
					Добавить
				</Button>
			</form>

			<Table
				bottomContent={
					<div className="flex w-full justify-center">
						<Pagination
							isCompact
							showControls
							showShadow
							color="secondary"
							page={page}
							total={pages}
							onChange={(page) => setPage(page)}
						/>
					</div>
				}
				classNames={{
					wrapper: 'min-h-[222px]',
				}}
			>
				<TableHeader columns={columns}>
					{(column) => (
						<TableColumn key={column.uid} align={column.uid === 'actions' ? 'center' : 'start'}>
							{column.name}
						</TableColumn>
					)}
				</TableHeader>
				<TableBody items={items}>
					{(item) => (
						<TableRow key={item.id}>
							{(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
						</TableRow>
					)}
				</TableBody>
			</Table>
		</div>
	);
};
