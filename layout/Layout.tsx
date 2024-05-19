import { FunctionComponent } from 'react';
import { LayoutProps } from './Layout.props';
import styles from './Layout.module.css';
import { Header } from './Header/Header';
import { Footer } from './Footer/Footer';

// Определение компонента Layout, который принимает дочерние элементы в качестве свойств
const Layout = ({ children }: LayoutProps): JSX.Element => {
	return (
		<div className={styles.wrapper}>
			<Header className={styles.header} />
			<div className={styles.body}>{children}</div>
			<Footer className={styles.footer} />
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
