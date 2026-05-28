
type Props = {

    title: string;
    value: string;
    description: string;

}

export default function DashboardCard({
    title,
    value,
    description
}: Props) {

    return (

        <div
            className="
            bg-white
            rounded-2xl
            shadow-sm
            border
            border-zinc-200
            p-6
            "
        >

            <p className="text-zinc-500 text-sm mb-2">

                {title}

            </p>

            <h2 className="text-4xl font-bold mb-2">

                {value}

            </h2>

            <p className="text-zinc-500">

                {description}

            </p>

        </div>

    );

}
