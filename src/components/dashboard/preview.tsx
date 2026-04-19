interface PreviewProps {
    url: string;
    refreshKey: number;
}

export default function Preview({ url, refreshKey }: PreviewProps) {
    return (
        <div className="flex justify-center items-center h-full">
            <div className="w-[320px] h-160 rounded-4xl overflow-hidden shadow-xl border border-surface-low bg-inverse-surface">
                <iframe
                    key={refreshKey}
                    src={url}
                    className="w-full h-full border-none"
                />
            </div>
        </div>
    );
}