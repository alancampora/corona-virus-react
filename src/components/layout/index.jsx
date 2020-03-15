import React from 'react';
import { Layout, PageHeader } from 'antd';
import { StyledContent } from './styled';
import 'antd/dist/antd.css';
const { Header, Content, Footer } = Layout;

const BaseLayout = ({ title, children }) => {
	return (
		<Layout className="layout" theme="light">
			<Header ghost={true} style={{ color: 'white', 'font-size': '1.2rem' }}>
				{title}
			</Header>
			<Content style={{ padding: '0 50px' }}>
				<StyledContent>{children}</StyledContent>
			</Content>
			<Footer style={{ textAlign: 'center' }}>
				Corona Virus Statistics ©2020 Created by Alan Campora
			</Footer>
		</Layout>
	);
};

export default BaseLayout;
