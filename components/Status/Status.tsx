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
import { StatusProps } from './Status.props';
import { IStatus } from '@/interfaces';
import axios from 'axios';
import { toast } from 'react-toastify';

const columns = [
	{ name: 'Id', uid: 'id' },
	{ name: 'Название', uid: 'title' },
	{ name: 'Действия', uid: 'actions' },
];

export const Status = ({ statuses, setStatuses }: StatusProps) => {
	const [status, setStatus] = useState<string>();

	const createStatus = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		event.stopPropagation();
		try {
			await axios.post(`http://${GATEWAY_HOST}/catalog/status/create`, { title: status });
			const statuses = await axios.get(`http://${GATEWAY_HOST}/catalog/status/findAll`);
			setStatuses(statuses.data);

			toast.success('Добавлено!');
		} catch {
			toast.error('Ошибка добавления!');
		}
	};

	const deleteStatus = async (id: number) => {
		try {
			await axios.delete(`http://${GATEWAY_HOST}/catalog/status/delete`, { data: { id } });
			const statuses = await axios.get(`http://${GATEWAY_HOST}/catalog/status/findAll`);
			setStatuses(statuses.data);

			toast.success('Успешное удаление!');
		} catch {
			toast.error('Ошибка удаления!');
		}
	};

	const renderCell = useCallback((status: IStatus, columnKey) => {
		const cellValue = status[columnKey];

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
								onClick={() => deleteStatus(status.id)}
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

	const pages = Math.ceil(statuses.length / rowsPerPage);

	const items = useMemo<IStatus[]>(() => {
		const start = (page - 1) * rowsPerPage;
		const end = start + rowsPerPage;

		return statuses.slice(start, end);
	}, [page, statuses]);

	return (
		<div className="w-full grid gap-[10px]">
			<form action="POST" onSubmit={createStatus} className="w-full grid gap-[10px]">
				<Input
					type="text"
					label="Название типа"
					value={status}
					onValueChange={setStatus}
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
