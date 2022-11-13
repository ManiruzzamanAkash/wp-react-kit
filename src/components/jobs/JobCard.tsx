type Props = {
    children: React.ReactNode;
    className?: React.CSSProperties['className'];
};

export default function JobCard({ children, className }: Props) {
    return (
        <div
            className={`bg-white rounded shadow-sm ml-0 md:ml-10 p-5 pt-3 mb-5 ${className}`}
        >
            {children}
        </div>
    );
}
