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
} from '@nextui-org/react';
import { DeleteIcon, EditIcon, GATEWAY_HOST } from '@/constants';
import { useState, useMemo, useCallback, FormEvent } from 'react';
import { ProfessionProps } from './Profession.props';
import { IProfession } from '@/interfaces';
import axios from 'axios';
import { toast } from 'react-toastify';

const columns = [
	{ name: 'Id', uid: 'id' },
	{ name: 'Название', uid: 'title' },
	{ name: 'Действия', uid: 'actions' },
];

export const Profession = ({ professions, setProfessions }: ProfessionProps) => {
	const [profession, setProfession] = useState<string>();

	const createProfession = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		event.stopPropagation();
		try {
			await axios.post(`http://${GATEWAY_HOST}/catalog/profession/create`, { title: profession });
			const countries = await axios.get(`http://${GATEWAY_HOST}/catalog/profession/findAll`);
			setProfessions(countries.data);

			toast.success('Добавлено!');
		} catch {
			toast.error('Ошибка добавления!');
		}
	};

	const deleteProfession = async (id: number) => {
		try {
			await axios.delete(`http://${GATEWAY_HOST}/catalog/profession/delete`, { data: { id } });
			const countries = await axios.get(`http://${GATEWAY_HOST}/catalog/profession/findAll`);
			setProfessions(countries.data);

			toast.success('Успешное удаление!');
		} catch {
			toast.error('Ошибка удаления!');
		}
	};

	const renderCell = useCallback((profession: IProfession, columnKey) => {
		const cellValue = profession[columnKey];

		switch (columnKey) {
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
								onClick={() => deleteProfession(profession.id)}
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

	const pages = Math.ceil(professions.length / rowsPerPage);

	const items = useMemo<IProfession[]>(() => {
		const start = (page - 1) * rowsPerPage;
		const end = start + rowsPerPage;

		return professions.slice(start, end);
	}, [page, professions]);

	return (
		<div className="w-full grid gap-[10px]">
			<form action="POST" onSubmit={createProfession} className="w-full grid gap-[10px]">
				<Input
					type="text"
					label="Название профессии"
					value={profession}
					onValueChange={setProfession}
					isRequired
				></Input>
				<Button className="w-full" type="submit">
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
