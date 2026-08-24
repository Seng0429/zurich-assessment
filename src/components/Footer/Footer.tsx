'use client'

import styles from './Footer.module.css'

interface FooterProps {
    children: React.ReactNode;
    color?: 'blue' | 'black';
}

const Footer = (props: FooterProps) => {
    const { children, color = 'blue' } = props;

    const colorMap = {
        blue: '#4285F4',
        black: '#2b2b2b'
    };

    return (
        <div 
            className={styles.pageFooterContainer} 
            style={{ backgroundColor: colorMap[color] }}
        >
            {children}
        </div>
    )
}

export default Footer