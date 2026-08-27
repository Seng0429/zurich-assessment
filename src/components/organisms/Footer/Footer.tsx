'use client'

interface FooterProps {
    children: React.ReactNode;
    color?: 'blue' | 'black';
}

const colorMap = {
    blue: 'bg-[#4285F4]',
    black: 'bg-[#2b2b2b]',
};

const Footer = (props: FooterProps) => {
    const { children, color = 'blue' } = props;

    return (
        <div
            className={`flex flex-col items-center justify-center w-full min-h-[70px] sm:min-h-[80px] box-border px-4 sm:px-[clamp(16px,4vw,48px)] py-4 text-center text-white ${colorMap[color]}`}
        >
            {children}
        </div>
    )
}

export default Footer