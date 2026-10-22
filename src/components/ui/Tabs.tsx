import clsx from 'clsx'

interface TabItem<T> {
    value: T;
    label: string;
}

interface TabsProps<T> {
    items: TabItem<T>[];
    value: T;
    onChange: (value: T) => void;
}

export default function Tabs<T>({ items, value, onChange }: TabsProps<T>) {
    return (
        <div className='flex relative z-10'>
            {items.map((item) => {
                const isActive = item.value === value

                return (
                    <button
                        type="button"
                        aria-selected={isActive}
                        onClick={() => onChange(item.value)}
                        className={clsx(
                            'rounded-t-2xl px-10 py-3 text-xs font-bold uppercase transition cursor-pointer',
                            isActive ? 'bg-[#FEFEFE] text-brand text-amber-600' : 'bg-[#FAFBFD] text-black hover:text-brand'
                        )} >
                        {item.label}
                    </button>
                )
            })}
        </div >
    )
}
