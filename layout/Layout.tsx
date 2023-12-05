import { FunctionComponent } from 'react';
import { LayoutProps } from './Layout.props';
import styles from './Layout.module.css';

// Определение компонента Layout, который принимает дочерние элементы в качестве свойств
const Layout = ({ children }: LayoutProps): JSX.Element => {
	return (
		<div className={styles.wrapper}>
			<div className={styles.body}>{children}</div>
		</div>
	);
};

// Функция высшего порядка, которая оборачивает переданный компонент в компонент Layout
export const withLayout = <T extends Record<string, unknown>>(Component: FunctionComponent<T>) => {
	return function withLayoutComponent(props: T): JSX.Element {
		return (
			// Обертка переданного компонента в компонент Layout
			<Layout>
				<Component {...props} />
			</Layout>
		);
	};
};
