type CardProps = {
  title: string;
  description: string;
};

export default function DashboardCard({
  title,
  description,
}: CardProps) {

  return (

    <div className="border rounded-xl p-6 hover:shadow-lg cursor-pointer">

      <h2 className="font-bold text-xl">
        {title}
      </h2>

      <p className="mt-2 text-gray-400">
        {description}
      </p>

    </div>

  );

}